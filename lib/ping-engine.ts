import { prisma } from './db'
import { 
  logPingSent, 
  logTeamPingExpanded,
  logAutomationTriggered 
} from './events'
import { sendFCMNotification } from './notifications'
import { triggerN8NWebhook } from './sync/n8n'
import { sendSlackMessage } from './sync/slack'

export type PingParams = {
  targetType: 'person' | 'team'
  targetId: string
  message?: string
  sendSlack?: boolean
  triggerAutomation?: boolean
}

export async function sendPing(params: PingParams) {
  try {
    // Create ping record
    const ping = await prisma.ping.create({
      data: {
        targetType: params.targetType,
        targetId: params.targetId,
        message: params.message,
        status: 'sent'
      }
    })

    let parentEventId: string | undefined

    if (params.targetType === 'person') {
      // Ping individual user
      const user = await prisma.user.findUnique({
        where: { id: params.targetId }
      })

      if (!user) {
        throw new Error(`User not found: ${params.targetId}`)
      }

      // Log the ping event
      const event = await logPingSent({
        userId: user.id,
        pingId: ping.id,
        message: params.message || `Ping sent to ${user.name}`,
        metadata: { pingId: ping.id }
      })

      parentEventId = event.id

      // Update user's last ping time
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          lastPingAt: new Date(),
          lastMessageAt: params.message ? new Date() : undefined
        }
      })

      // Send FCM notification
      if (user.email) {
        await sendFCMNotification({
          userId: user.id,
          title: 'Ping Received',
          body: params.message || 'You have been pinged',
          data: { pingId: ping.id, type: 'ping' }
        }).then(() => {
          prisma.ping.update({
            where: { id: ping.id },
            data: { fcmSent: true }
          })
        })
      }

      // Send Slack notification if enabled and user has Slack channel
      if (params.sendSlack && user.slackChannelId) {
        await sendSlackMessage({
          channelId: user.slackChannelId,
          text: params.message || 'Ping received',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Ping Received*\n${params.message || 'You have been pinged by the system.'}`
              }
            }
          ]
        }).then(() => {
          prisma.ping.update({
            where: { id: ping.id },
            data: { slackSent: true }
          })
        })
      }

      // Trigger n8n automation if enabled
      if (params.triggerAutomation) {
        await triggerN8NWebhook({
          eventType: 'ping_sent',
          source: 'APP',
          timestamp: new Date().toISOString(),
          targetType: 'person',
          targetId: user.id,
          message: params.message,
          metadata: { pingId: ping.id, userId: user.id }
        }).then(() => {
          prisma.ping.update({
            where: { id: ping.id },
            data: { n8nTriggered: true }
          })
        })
      }

    } else if (params.targetType === 'team') {
      // Ping team - expand to individual users
      const team = await prisma.team.findUnique({
        where: { id: params.targetId },
        include: {
          users: true
        }
      })

      if (!team) {
        throw new Error(`Team not found: ${params.targetId}`)
      }

      // Log parent team ping event
      const parentEvent = await logPingSent({
        teamId: team.id,
        pingId: ping.id,
        message: params.message || `Team ping sent to ${team.name}`,
        metadata: { 
          pingId: ping.id,
          teamId: team.id,
          userCount: team.users.length 
        }
      })

      parentEventId = parentEvent.id

      // Update ping with team relation
      await prisma.ping.update({
        where: { id: ping.id },
        data: { teamId: team.id }
      })

      // Expand to individual user pings
      const userPingPromises = team.users.map(async (user) => {
        // Create child ping for each user
        const userPing = await prisma.ping.create({
          data: {
            targetType: 'person',
            targetId: user.id,
            message: params.message,
            status: 'sent',
            teamId: team.id
          }
        })

        // Log child event
        await logTeamPingExpanded({
          parentEventId: parentEvent.id,
          teamId: team.id,
          userId: user.id,
          pingId: userPing.id,
          message: params.message || `Ping from team ${team.name}`
        })

        // Update user's last ping time
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            lastPingAt: new Date(),
            lastMessageAt: params.message ? new Date() : undefined
          }
        })

        // Send FCM notification
        if (user.email) {
          await sendFCMNotification({
            userId: user.id,
            title: `Team Ping: ${team.name}`,
            body: params.message || `You have been pinged by team ${team.name}`,
            data: { pingId: userPing.id, teamId: team.id, type: 'team_ping' }
          }).then(() => {
            prisma.ping.update({
              where: { id: userPing.id },
              data: { fcmSent: true }
            })
          })
        }

        // Send Slack notification if enabled
        if (params.sendSlack && user.slackChannelId) {
          await sendSlackMessage({
            channelId: user.slackChannelId,
            text: params.message || `Team ping from ${team.name}`,
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*Team Ping: ${team.name}*\n${params.message || 'You have been pinged by your team.'}`
                }
              }
            ]
          }).then(() => {
            prisma.ping.update({
              where: { id: userPing.id },
              data: { slackSent: true }
            })
          })
        }

        return userPing
      })

      await Promise.all(userPingPromises)

      // Trigger n8n automation for team ping
      if (params.triggerAutomation) {
        await triggerN8NWebhook({
          eventType: 'team_ping_expanded',
          source: 'APP',
          timestamp: new Date().toISOString(),
          targetType: 'team',
          targetId: team.id,
          message: params.message,
          metadata: { 
            pingId: ping.id,
            teamId: team.id,
            userCount: team.users.length,
            userIds: team.users.map(u => u.id)
          }
        }).then(() => {
          prisma.ping.update({
            where: { id: ping.id },
            data: { n8nTriggered: true }
          })
        })
      }
    }

    // Update ping status to delivered
    await prisma.ping.update({
      where: { id: ping.id },
      data: { status: 'delivered' }
    })

    return { 
      success: true, 
      pingId: ping.id,
      parentEventId 
    }

  } catch (error) {
    console.error('Failed to send ping:', error)
    
    // Update ping status to failed if it exists
    if (params.targetId) {
      try {
        await prisma.ping.updateMany({
          where: { targetId: params.targetId },
          data: { status: 'failed' }
        })
      } catch (e) {
        // Ignore update errors
      }
    }

    throw error
  }
}
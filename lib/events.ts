import { prisma } from './db'
import type { EventType, EventSource } from '@/types'

export async function logEvent(params: {
  type: EventType
  source?: EventSource
  userId?: string
  teamId?: string
  zoneId?: string
  scheduleId?: string
  parentEventId?: string
  pingId?: string
  payload: {
    message: string
    metadata?: any
  }
}) {
  try {
    const event = await prisma.event.create({
      data: {
        type: params.type,
        source: params.source || 'APP',
        userId: params.userId,
        teamId: params.teamId,
        zoneId: params.zoneId,
        scheduleId: params.scheduleId,
        parentEventId: params.parentEventId,
        pingId: params.pingId,
        payload: params.payload
      },
      include: {
        user: {
          select: { id: true, name: true }
        },
        team: {
          select: { id: true, name: true }
        }
      }
    })

    // In a real app, you would emit this event to a real-time service
    // For MVP, we'll rely on polling or server-sent events
    const payload = event.payload as { message: string; metadata?: any }
    console.log(`Event logged: ${event.type} - ${payload.message}`)

    return event
  } catch (error) {
    console.error('Failed to log event:', error)
    throw error
  }
}

// Helper functions for common event types

export async function logPingSent(params: {
  userId?: string
  teamId?: string
  pingId: string
  message: string
  metadata?: any
}) {
  return logEvent({
    type: 'ping_sent',
    source: 'APP',
    userId: params.userId,
    teamId: params.teamId,
    pingId: params.pingId,
    payload: {
      message: params.message,
      metadata: params.metadata
    }
  })
}

export async function logTeamPingExpanded(params: {
  parentEventId: string
  teamId: string
  userId: string
  pingId: string
  message: string
}) {
  return logEvent({
    type: 'team_ping_expanded',
    source: 'SYSTEM',
    parentEventId: params.parentEventId,
    teamId: params.teamId,
    userId: params.userId,
    pingId: params.pingId,
    payload: {
      message: `Team ping expanded to user: ${params.message}`,
      metadata: { parentEventId: params.parentEventId }
    }
  })
}

export async function logUserUpdated(params: {
  userId: string
  changes: any
  source?: EventSource
}) {
  return logEvent({
    type: 'user_updated',
    source: params.source || 'APP',
    userId: params.userId,
    payload: {
      message: 'User updated',
      metadata: { changes: params.changes }
    }
  })
}

export async function logTeamUpdated(params: {
  teamId: string
  changes: any
  source?: EventSource
}) {
  return logEvent({
    type: 'team_updated',
    source: params.source || 'APP',
    teamId: params.teamId,
    payload: {
      message: 'Team updated',
      metadata: { changes: params.changes }
    }
  })
}

export async function logScheduleTriggered(params: {
  scheduleId: string
  teamId?: string
  userId?: string
  message: string
}) {
  return logEvent({
    type: 'schedule_triggered',
    source: 'SYSTEM',
    scheduleId: params.scheduleId,
    teamId: params.teamId,
    userId: params.userId,
    payload: {
      message: params.message,
      metadata: { scheduleId: params.scheduleId }
    }
  })
}

export async function logSheetsSync(params: {
  entityType: 'user' | 'team' | 'schedule'
  entityId: string
  operation: 'create' | 'update' | 'delete'
  changes: any
}) {
  return logEvent({
    type: 'sheets_sync',
    source: 'SHEETS',
    payload: {
      message: `${params.entityType} ${params.operation}d via Google Sheets sync`,
      metadata: {
        entityType: params.entityType,
        entityId: params.entityId,
        operation: params.operation,
        changes: params.changes
      }
    }
  })
}

export async function logSlackReceived(params: {
  channelId: string
  message: string
  metadata?: any
}) {
  return logEvent({
    type: 'slack_received',
    source: 'SLACK',
    payload: {
      message: `Slack message received from channel: ${params.channelId}`,
      metadata: {
        channelId: params.channelId,
        message: params.message,
        ...params.metadata
      }
    }
  })
}

export async function logAutomationTriggered(params: {
  automationType: string
  targetType: string
  targetId: string
  message: string
  metadata?: any
}) {
  return logEvent({
    type: 'automation_triggered',
    source: 'N8N',
    payload: {
      message: params.message,
      metadata: {
        automationType: params.automationType,
        targetType: params.targetType,
        targetId: params.targetId,
        ...params.metadata
      }
    }
  })
}
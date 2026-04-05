import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.event.deleteMany()
  await prisma.ping.deleteMany()
  await prisma.schedule.deleteMany()
  await prisma.user.deleteMany()
  await prisma.team.deleteMany()
  await prisma.zone.deleteMany()
  await prisma.venueMap.deleteMany()
  await prisma.syncLog.deleteMany()

  console.log('✅ Cleared existing data')

  // Create venue map
  const venueMap = await prisma.venueMap.create({
    data: {
      name: 'Summer Youth Camp 2024',
      imageUrl: '/maps/summer-camp-2024.jpg',
    }
  })

  console.log('✅ Created venue map')

  // Create zones
  const zones = await Promise.all([
    prisma.zone.create({
      data: {
        name: 'Session Hall',
        label: 'Main Hall',
        polygonData: {
          type: 'Polygon',
          coordinates: [[[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]]]
        },
        venueMapId: venueMap.id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'Kitchen',
        label: 'Food Prep',
        polygonData: {
          type: 'Polygon',
          coordinates: [[[150, 0], [250, 0], [250, 100], [150, 100], [150, 0]]]
        },
        venueMapId: venueMap.id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'First Aid Station',
        label: 'Medical',
        polygonData: {
          type: 'Polygon',
          coordinates: [[[300, 0], [350, 0], [350, 50], [300, 50], [300, 0]]]
        },
        venueMapId: venueMap.id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'Registration Desk',
        label: 'Check-in',
        polygonData: {
          type: 'Polygon',
          coordinates: [[[0, 150], [80, 150], [80, 200], [0, 200], [0, 150]]]
        },
        venueMapId: venueMap.id,
      }
    }),
  ])

  console.log('✅ Created zones')

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'Worship Team',
        description: 'Leads worship sessions and musical activities',
        source: 'APP',
      }
    }),
    prisma.team.create({
      data: {
        name: 'Kitchen Team',
        description: 'Handles food preparation and distribution',
        source: 'APP',
      }
    }),
    prisma.team.create({
      data: {
        name: 'Medical Team',
        description: 'Provides first aid and medical support',
        source: 'APP',
      }
    }),
    prisma.team.create({
      data: {
        name: 'Registration Team',
        description: 'Manages participant registration and check-in',
        source: 'APP',
      }
    }),
  ])

  console.log('✅ Created teams')

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        role: 'Worship Leader',
        phone: '+1 (555) 123-4567',
        email: 'sarah@example.com',
        messageNotes: 'Prefers text messages for urgent matters',
        status: 'active',
        slackChannelId: 'U1234567890',
        imageUrl: null,
        lastPingAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        lastMessageAt: new Date(Date.now() - 10 * 60 * 1000),
        source: 'APP',
        teamId: teams[0].id,
        zoneId: zones[0].id,
      }
    }),
    prisma.user.create({
      data: {
        name: 'Michael Chen',
        role: 'Kitchen Staff',
        phone: '+1 (555) 234-5678',
        email: 'michael@example.com',
        messageNotes: 'Available on Slack during meal prep times',
        status: 'active',
        slackChannelId: 'U2345678901',
        imageUrl: null,
        lastPingAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        lastMessageAt: new Date(Date.now() - 30 * 60 * 1000),
        source: 'APP',
        teamId: teams[1].id,
        zoneId: zones[1].id,
      }
    }),
    prisma.user.create({
      data: {
        name: 'David Wilson',
        role: 'First Aid',
        phone: '+1 (555) 345-6789',
        email: 'david@example.com',
        messageNotes: 'Emergency contact only',
        status: 'active',
        slackChannelId: 'U3456789012',
        imageUrl: null,
        lastPingAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        lastMessageAt: new Date(Date.now() - 5 * 60 * 1000),
        source: 'APP',
        teamId: teams[2].id,
        zoneId: zones[2].id,
      }
    }),
    prisma.user.create({
      data: {
        name: 'Maria Garcia',
        role: 'Registration',
        phone: '+1 (555) 456-7890',
        email: 'maria@example.com',
        messageNotes: 'Check-in specialist',
        status: 'active',
        slackChannelId: 'U4567890123',
        imageUrl: null,
        lastPingAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        lastMessageAt: new Date(Date.now() - 60 * 60 * 1000),
        source: 'APP',
        teamId: teams[3].id,
        zoneId: zones[3].id,
      }
    }),
  ])

  console.log('✅ Created users')

  // Create schedules
  const schedules = await Promise.all([
    prisma.schedule.create({
      data: {
        title: 'Worship Session',
        description: 'Morning worship and praise',
        scheduledTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
        reminderMinutes: 15,
        status: 'pending',
        messageTemplate: 'Worship session starting in 15 minutes. Please gather in the Session Hall.',
        source: 'APP',
        teamId: teams[0].id,
        zoneId: zones[0].id,
      }
    }),
    prisma.schedule.create({
      data: {
        title: 'Break & Snacks',
        description: 'Refreshment break for all participants',
        scheduledTime: new Date(Date.now() + 90 * 60 * 1000), // 90 minutes from now
        reminderMinutes: 30,
        status: 'pending',
        messageTemplate: 'Break time in 30 minutes. Kitchen team please prepare snacks.',
        source: 'APP',
        teamId: teams[1].id,
        zoneId: zones[1].id,
      }
    }),
    prisma.schedule.create({
      data: {
        title: 'Workshop: Team Building',
        description: 'Interactive team building activities',
        scheduledTime: new Date(Date.now() + 180 * 60 * 1000), // 3 hours from now
        reminderMinutes: 60,
        status: 'pending',
        messageTemplate: 'Team building workshop in 1 hour. All teams participate.',
        source: 'APP',
        teamId: null, // All teams
        zoneId: zones[0].id, // Session Hall
      }
    }),
  ])

  console.log('✅ Created schedules')

  // Create sample pings
  const pings = await Promise.all([
    prisma.ping.create({
      data: {
        targetType: 'person',
        targetId: users[0].id,
        message: 'Reminder: Worship session starts in 10 minutes',
        status: 'delivered',
        slackSent: true,
        fcmSent: true,
        n8nTriggered: true,
        userId: users[0].id,
      }
    }),
    prisma.ping.create({
      data: {
        targetType: 'team',
        targetId: teams[1].id,
        message: 'Kitchen team meeting in 15 minutes',
        status: 'delivered',
        slackSent: true,
        fcmSent: true,
        n8nTriggered: true,
        teamId: teams[1].id,
      }
    }),
  ])

  console.log('✅ Created pings')

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        type: 'ping_sent',
        source: 'APP',
        userId: users[0].id,
        teamId: teams[0].id,
        pingId: pings[0].id,
        payload: {
          message: 'Ping sent to Sarah Johnson',
          metadata: { pingId: pings[0].id, message: pings[0].message }
        },
      }
    }),
    prisma.event.create({
      data: {
        type: 'team_ping_expanded',
        source: 'SYSTEM',
        teamId: teams[1].id,
        parentEventId: null, // This would be set in real scenario
        payload: {
          message: 'Team ping expanded to 4 members',
          metadata: { teamId: teams[1].id, memberCount: 4 }
        },
      }
    }),
    prisma.event.create({
      data: {
        type: 'user_created',
        source: 'APP',
        userId: users[0].id,
        payload: {
          message: 'User created: Sarah Johnson',
          metadata: { userId: users[0].id, name: users[0].name }
        },
      }
    }),
    prisma.event.create({
      data: {
        type: 'schedule_created',
        source: 'APP',
        scheduleId: schedules[0].id,
        payload: {
          message: 'Schedule created: Worship Session',
          metadata: { scheduleId: schedules[0].id, title: schedules[0].title }
        },
      }
    }),
    prisma.event.create({
      data: {
        type: 'sheets_sync',
        source: 'SHEETS',
        payload: {
          message: 'Google Sheets sync completed',
          metadata: { syncedCount: 8, entityTypes: ['user', 'team'] }
        },
      }
    }),
  ])

  console.log('✅ Created events')

  // Create sync logs
  const syncLogs = await Promise.all([
    prisma.syncLog.create({
      data: {
        entityType: 'user',
        entityId: users[0].id,
        operation: 'create',
        source: 'APP',
        changes: {
          after: {
            name: users[0].name,
            email: users[0].email,
            role: users[0].role
          }
        },
      }
    }),
    prisma.syncLog.create({
      data: {
        entityType: 'team',
        entityId: teams[0].id,
        operation: 'create',
        source: 'APP',
        changes: {
          after: {
            name: teams[0].name,
            description: teams[0].description
          }
        },
      }
    }),
  ])

  console.log('✅ Created sync logs')

  console.log('🎉 Database seeding completed!')
  console.log(`📊 Created:`)
  console.log(`  - ${users.length} users`)
  console.log(`  - ${teams.length} teams`)
  console.log(`  - ${zones.length} zones`)
  console.log(`  - ${schedules.length} schedules`)
  console.log(`  - ${pings.length} pings`)
  console.log(`  - ${events.length} events`)
  console.log(`  - ${syncLogs.length} sync logs`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Don't initialize Prisma during build time
let prismaInstance: PrismaClient | undefined

export const prisma = globalForPrisma.prisma ?? (() => {
  // Only create Prisma client if we're not in build mode
  if (typeof window !== 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
    // Return a mock or throw an error
    console.warn('Prisma client accessed during build time')
    return {} as PrismaClient
  }
  
  if (!prismaInstance) {
    prismaInstance = new PrismaClient()
  }
  return prismaInstance
})()

if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PHASE) {
  globalForPrisma.prisma = prisma
}

// Helper functions for common queries

export async function getDashboardStats() {
  const [
    totalUsers,
    totalTeams,
    totalSchedules,
    recentPings,
    liveActivity,
    activeUsers,
    pendingSchedules
  ] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
    prisma.schedule.count(),
    prisma.ping.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    }),
    prisma.event.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 1 * 60 * 60 * 1000) // Last 1 hour
        }
      }
    }),
    prisma.user.count({
      where: { status: 'active' }
    }),
    prisma.schedule.count({
      where: { 
        status: 'pending',
        scheduledTime: {
          gte: new Date()
        }
      }
    })
  ])

  return {
    totalUsers,
    totalTeams,
    totalSchedules,
    recentPings,
    liveActivity,
    activeUsers,
    pendingSchedules
  }
}

export async function getRecentEvents(limit: number = 20) {
  return prisma.event.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, name: true, imageUrl: true }
      },
      team: {
        select: { id: true, name: true }
      },
      zone: {
        select: { id: true, name: true }
      },
      schedule: {
        select: { id: true, title: true }
      }
    }
  })
}

export async function getUsersWithTeamAndZone() {
  return prisma.user.findMany({
    include: {
      team: true,
      zone: true
    },
    orderBy: { updatedAt: 'desc' }
  })
}

export async function getTeamsWithMemberCount() {
  const teams = await prisma.team.findMany({
    include: {
      _count: {
        select: { users: true }
      }
    },
    orderBy: { updatedAt: 'desc' }
  })

  return teams.map(team => ({
    ...team,
    memberCount: team._count.users
  }))
}

export async function getUpcomingSchedules(limit: number = 10) {
  return prisma.schedule.findMany({
    take: limit,
    where: {
      status: 'pending',
      scheduledTime: {
        gte: new Date()
      }
    },
    include: {
      team: true,
      zone: true,
      user: true
    },
    orderBy: { scheduledTime: 'asc' }
  })
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      team: true,
      zone: true
    }
  })
}

export async function findTeamById(id: string) {
  return prisma.team.findUnique({
    where: { id },
    include: {
      users: {
        include: {
          zone: true
        }
      }
    }
  })
}
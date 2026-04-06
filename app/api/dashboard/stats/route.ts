import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check if Prisma client is available (not in build mode)
    if (!prisma || typeof prisma.user?.count !== 'function') {
      // Return mock data during build time
      return NextResponse.json({
        success: true,
        data: {
          stats: {
            totalUsers: 0,
            totalTeams: 0,
            totalSchedules: 0,
            recentPings: 0,
            liveActivity: 0,
            activeUsers: 0,
            pendingSchedules: 0
          },
          recentEvents: [],
          activePersonnel: []
        }
      })
    }

    // Get dashboard statistics
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
        where: {
          OR: [
            { status: 'active' },
            { status: 'Active' }
          ]
        }
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

    // Get recent events
    const recentEvents = await prisma.event.findMany({
      take: 10,
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

    // Get active personnel (handle both 'active' and 'Active' for backward compatibility)
    const activePersonnel = await prisma.user.findMany({
      take: 3,
      where: {
        OR: [
          { status: 'active' },
          { status: 'Active' }
        ]
      },
      include: {
        team: true,
        zone: true
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalTeams,
          totalSchedules,
          recentPings,
          liveActivity,
          activeUsers,
          pendingSchedules
        },
        recentEvents,
        activePersonnel
      }
    })

  } catch (error: any) {
    console.error('Failed to fetch dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
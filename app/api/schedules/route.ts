import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const status = searchParams.get('status')
    const teamId = searchParams.get('teamId')
    const zoneId = searchParams.get('zoneId')
    const userId = searchParams.get('userId')
    const upcoming = searchParams.get('upcoming') === 'true'
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}

    if (status) {
      where.status = status
    }
    if (teamId) {
      where.teamId = teamId
    }
    if (zoneId) {
      where.zoneId = zoneId
    }
    if (userId) {
      where.userId = userId
    }
    if (upcoming) {
      where.scheduledTime = {
        gte: new Date()
      }
      where.status = 'pending'
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Query database
    const schedules = await prisma.schedule.findMany({
      take: limit,
      where,
      include: {
        team: true,
        zone: true,
        user: true
      },
      orderBy: { scheduledTime: 'asc' }
    })

    const total = await prisma.schedule.count({ where })

    return NextResponse.json({
      success: true,
      data: schedules,
      count: schedules.length,
      total
    })

  } catch (error: any) {
    console.error('Failed to fetch schedules:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields: title and scheduledTime' },
        { status: 400 }
      )
    }

    // Create schedule
    const schedule = await prisma.schedule.create({
      data: {
        title: body.title,
        description: body.description,
        scheduledTime: new Date(body.scheduledTime),
        reminderMinutes: body.reminderMinutes || 15,
        status: body.status || 'pending',
        messageTemplate: body.messageTemplate,
        teamId: body.teamId,
        zoneId: body.zoneId,
        userId: body.userId,
        source: body.source || 'APP'
      },
      include: {
        team: true,
        zone: true,
        user: true
      }
    })

    return NextResponse.json({
      success: true,
      data: schedule,
      message: 'Schedule created successfully'
    })

  } catch (error: any) {
    console.error('Failed to create schedule:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
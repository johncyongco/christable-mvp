import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/events'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    if (!body.type || !body.payload?.message) {
      return NextResponse.json(
        { error: 'Missing required fields: type and payload.message' },
        { status: 400 }
      )
    }

    // Log the event
    const event = await logEvent({
      type: body.type,
      source: body.source || 'APP',
      userId: body.userId,
      teamId: body.teamId,
      zoneId: body.zoneId,
      scheduleId: body.scheduleId,
      parentEventId: body.parentEventId,
      pingId: body.pingId,
      payload: {
        message: body.payload.message,
        metadata: body.payload.metadata
      }
    })

    return NextResponse.json({
      success: true,
      data: event,
      message: 'Event logged successfully'
    })

  } catch (error: any) {
    console.error('Failed to log event:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const type = searchParams.get('type')
    const userId = searchParams.get('userId')
    const teamId = searchParams.get('teamId')
    const since = searchParams.get('since')

    // In production, this would query the database
    // For MVP, return mock data
    
    const mockEvents = [
      {
        id: 'event_1',
        type: 'ping_sent',
        source: 'APP',
        userId: 'user_1',
        teamId: 'team_1',
        payload: {
          message: 'Ping sent to Sarah Johnson',
          metadata: { pingId: 'ping_1' }
        },
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        user: { id: 'user_1', name: 'Sarah Johnson' },
        team: { id: 'team_1', name: 'Worship Team' }
      },
      {
        id: 'event_2',
        type: 'team_ping_expanded',
        source: 'SYSTEM',
        teamId: 'team_2',
        payload: {
          message: 'Team ping expanded to 4 members',
          metadata: { parentEventId: 'event_1', userCount: 4 }
        },
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        team: { id: 'team_2', name: 'Kitchen Team' }
      },
      {
        id: 'event_3',
        type: 'schedule_triggered',
        source: 'SYSTEM',
        scheduleId: 'schedule_1',
        payload: {
          message: 'Schedule reminder: Worship Session',
          metadata: { scheduleId: 'schedule_1' }
        },
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 'event_4',
        type: 'sheets_sync',
        source: 'SHEETS',
        payload: {
          message: 'Google Sheets sync completed',
          metadata: { syncedCount: 5, entityType: 'user' }
        },
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 'event_5',
        type: 'slack_received',
        source: 'SLACK',
        payload: {
          message: 'Slack message received from #general',
          metadata: { channelId: 'C123456', message: 'Team meeting starting soon' }
        },
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      }
    ]

    // Filter events
    let filteredEvents = mockEvents
    
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type)
    }
    if (userId) {
      filteredEvents = filteredEvents.filter(event => event.userId === userId)
    }
    if (teamId) {
      filteredEvents = filteredEvents.filter(event => event.teamId === teamId)
    }
    if (since) {
      const sinceDate = new Date(since)
      filteredEvents = filteredEvents.filter(event => new Date(event.createdAt) > sinceDate)
    }

    // Sort by createdAt descending (newest first)
    filteredEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      success: true,
      data: filteredEvents.slice(0, limit),
      count: filteredEvents.length,
      total: mockEvents.length
    })

  } catch (error: any) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
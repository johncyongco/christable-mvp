import { NextRequest, NextResponse } from 'next/server'
import { sendPing } from '@/lib/ping-engine'
import { logEvent } from '@/lib/events'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    if (!body.targetId || !body.targetType) {
      return NextResponse.json(
        { error: 'Missing required fields: targetId and targetType' },
        { status: 400 }
      )
    }

    // Send ping
    const result = await sendPing({
      targetType: body.targetType,
      targetId: body.targetId,
      message: body.message,
      sendSlack: body.sendSlack !== false, // Default to true
      triggerAutomation: body.triggerAutomation !== false, // Default to true
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Ping sent successfully'
    })

  } catch (error: any) {
    console.error('Failed to send ping:', error)
    
    // Log error event
    await logEvent({
      type: 'automation_triggered',
      source: 'SYSTEM',
      payload: {
        message: `Failed to send ping: ${error.message}`,
        metadata: { error: error.message, stack: error.stack }
      }
    })

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send ping',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Get recent pings (for monitoring)
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '50')
  const targetType = searchParams.get('targetType')
  const targetId = searchParams.get('targetId')

  try {
    // In production, this would query the database
    // For MVP, return mock data
    
    const mockPings = [
      {
        id: 'ping_1',
        targetType: 'person',
        targetId: 'user_1',
        message: 'Reminder: Worship session starts in 10 minutes',
        status: 'delivered',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        user: { id: 'user_1', name: 'Sarah Johnson' }
      },
      {
        id: 'ping_2',
        targetType: 'team',
        targetId: 'team_1',
        message: 'Kitchen team meeting in 15 minutes',
        status: 'delivered',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        team: { id: 'team_1', name: 'Kitchen Team' }
      }
    ]

    // Filter if needed
    let filteredPings = mockPings
    if (targetType) {
      filteredPings = filteredPings.filter(ping => ping.targetType === targetType)
    }
    if (targetId) {
      filteredPings = filteredPings.filter(ping => ping.targetId === targetId)
    }

    return NextResponse.json({
      success: true,
      data: filteredPings.slice(0, limit),
      count: filteredPings.length
    })

  } catch (error: any) {
    console.error('Failed to fetch pings:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
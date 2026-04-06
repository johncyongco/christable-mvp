import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const venueMapId = searchParams.get('venueMapId')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}

    if (venueMapId) {
      where.venueMapId = venueMapId
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { label: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Query database
    const zones = await prisma.zone.findMany({
      take: limit,
      where,
      include: {
        venueMap: true,
        _count: {
          select: { users: true, schedules: true, events: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    const total = await prisma.zone.count({ where })

    return NextResponse.json({
      success: true,
      data: zones.map(zone => ({
        ...zone,
        userCount: zone._count.users,
        scheduleCount: zone._count.schedules,
        eventCount: zone._count.events
      })),
      count: zones.length,
      total
    })

  } catch (error: any) {
    console.error('Failed to fetch zones:', error)
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
    if (!body.name || !body.venueMapId || !body.polygonData) {
      return NextResponse.json(
        { error: 'Missing required fields: name, venueMapId, and polygonData' },
        { status: 400 }
      )
    }

    // Create zone
    const zone = await prisma.zone.create({
      data: {
        name: body.name,
        label: body.label,
        polygonData: body.polygonData,
        venueMapId: body.venueMapId
      },
      include: {
        venueMap: true,
        _count: {
          select: { users: true, schedules: true, events: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...zone,
        userCount: zone._count.users,
        scheduleCount: zone._count.schedules,
        eventCount: zone._count.events
      },
      message: 'Zone created successfully'
    })

  } catch (error: any) {
    console.error('Failed to create zone:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
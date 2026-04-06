import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const teamId = searchParams.get('teamId')
    const zoneId = searchParams.get('zoneId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}

    if (teamId) {
      where.teamId = teamId
    }
    if (zoneId) {
      where.zoneId = zoneId
    }
    if (status) {
      where.status = status
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { role: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Query database
    const users = await prisma.user.findMany({
      take: limit,
      where,
      include: {
        team: true,
        zone: true
      },
      orderBy: { updatedAt: 'desc' }
    })

    const total = await prisma.user.count({ where })

    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
      total
    })

  } catch (error: any) {
    console.error('Failed to fetch users:', error)
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
    if (!body.name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        role: body.role,
        phone: body.phone,
        email: body.email,
        messageNotes: body.messageNotes,
        status: (body.status || 'active').toLowerCase(),
        slackChannelId: body.slackChannelId,
        imageUrl: body.imageUrl,
        teamId: body.teamId,
        zoneId: body.zoneId,
        source: body.source || 'APP'
      },
      include: {
        team: true,
        zone: true
      }
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    })

  } catch (error: any) {
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
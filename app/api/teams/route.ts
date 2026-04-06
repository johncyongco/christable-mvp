import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Query database
    const teams = await prisma.team.findMany({
      take: limit,
      where,
      include: {
        _count: {
          select: { users: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    const total = await prisma.team.count({ where })

    return NextResponse.json({
      success: true,
      data: teams.map(team => ({
        ...team,
        memberCount: team._count.users
      })),
      count: teams.length,
      total
    })

  } catch (error: any) {
    console.error('Failed to fetch teams:', error)
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

    // Create team
    const team = await prisma.team.create({
      data: {
        name: body.name,
        description: body.description,
        source: body.source || 'APP'
      },
      include: {
        _count: {
          select: { users: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...team,
        memberCount: team._count.users
      },
      message: 'Team created successfully'
    })

  } catch (error: any) {
    console.error('Failed to create team:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
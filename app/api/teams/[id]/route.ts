import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true }
        },
        users: {
          include: {
            zone: true
          }
        }
      }
    })

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...team,
        memberCount: team._count.users
      }
    })

  } catch (error: any) {
    console.error('Failed to fetch team:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Check if team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id }
    })

    if (!existingTeam) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    // Update team
    const team = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description
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
      message: 'Team updated successfully'
    })

  } catch (error: any) {
    console.error('Failed to update team:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id }
    })

    if (!existingTeam) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    // First, update all users in this team to have no team
    await prisma.user.updateMany({
      where: { teamId: id },
      data: { teamId: null }
    })

    // Delete team
    await prisma.team.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Team deleted successfully'
    })

  } catch (error: any) {
    console.error('Failed to delete team:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
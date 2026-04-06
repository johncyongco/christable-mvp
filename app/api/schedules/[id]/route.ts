import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        team: true,
        zone: true,
        user: true
      }
    })

    if (!schedule) {
      return NextResponse.json(
        { error: 'Schedule not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: schedule
    })

  } catch (error: any) {
    console.error('Failed to fetch schedule:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id }
    })

    if (!existingSchedule) {
      return NextResponse.json(
        { error: 'Schedule not found' },
        { status: 404 }
      )
    }

    // Update schedule
    const schedule = await prisma.schedule.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        scheduledTime: body.scheduledTime ? new Date(body.scheduledTime) : undefined,
        reminderMinutes: body.reminderMinutes,
        status: body.status,
        messageTemplate: body.messageTemplate,
        teamId: body.teamId,
        zoneId: body.zoneId,
        userId: body.userId
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
      message: 'Schedule updated successfully'
    })

  } catch (error: any) {
    console.error('Failed to update schedule:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id }
    })

    if (!existingSchedule) {
      return NextResponse.json(
        { error: 'Schedule not found' },
        { status: 404 }
      )
    }

    // Delete schedule
    await prisma.schedule.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Schedule deleted successfully'
    })

  } catch (error: any) {
    console.error('Failed to delete schedule:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
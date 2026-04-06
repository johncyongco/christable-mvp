import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get all messages
    const messages = await prisma.message.findMany({
      include: {
        sender: {
          select: {
            name: true,
            imageUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format messages for frontend
    const formattedMessages = messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      senderId: msg.senderId,
      senderName: msg.sender?.name || 'System',
      senderImage: msg.sender?.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVC630s7QZe98aTo1awlm7GFWiuwcNk8wBme10WGu9yiOxoHlhkXYqPaBesbKnCM3iIivjn38jAz6-oKsL7d4HSQ8koLYMGTwPbmXnynscAe3_TpqNAIZr9OfCwv0uO0pvc0aV2COVjxtkFuUbmoracPSccFii9FjL_1dBV3DxmXS8q8bZuVZobBSXklloKJD8hmeKq0W8G1QDVlohfufNQPpod52AADRVzvjkjFFZz5kt3Ktp_YUwb5dcS5vot4_S4xgK32Mn060',
      createdAt: msg.createdAt.toISOString(),
      read: msg.read,
      type: msg.type
    }))

    return NextResponse.json(formattedMessages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, type, recipientId } = body

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      )
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        type,
        senderId: 'system', // In a real app, this would be the logged-in user
        recipientId,
        read: false
      },
      include: {
        sender: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.sender.name,
      senderImage: message.sender.image,
      createdAt: message.createdAt.toISOString(),
      read: message.read,
      type: message.type
    })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
// n8n automation integration layer
// For MVP, we'll structure webhook endpoints for n8n to consume

import { logAutomationTriggered } from '../events'

export type N8NWebhookPayload = {
  eventType: string
  source: string
  timestamp: string
  targetType?: string
  targetId?: string
  teamId?: string
  userId?: string
  message?: string
  metadata?: Record<string, any>
}

export type N8NResponse = {
  success: boolean
  workflowId?: string
  executionId?: string
  result?: any
  error?: string
}

// In a real implementation, you would:
// 1. Configure webhook URLs in n8n
// 2. Handle authentication (API keys, signatures)
// 3. Implement retry logic for failed webhooks
// 4. Log all automation triggers and results

export async function triggerN8NWebhook(payload: N8NWebhookPayload): Promise<N8NResponse> {
  try {
    console.log('[n8n Mock] Triggering webhook:', payload)

    // Mock implementation - in production, this would:
    // 1. Send HTTP POST to n8n webhook URL
    // 2. Include authentication headers
    // 3. Handle response and errors
    
    // Example real implementation (commented out):
    /*
    const axios = require('axios')
    
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    const apiKey = process.env.N8N_API_KEY
    
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': apiKey
      },
      timeout: 10000 // 10 second timeout
    })
    
    return {
      success: true,
      workflowId: response.data.workflowId,
      executionId: response.data.executionId,
      result: response.data.result
    }
    */

    // Log the automation trigger
    await logAutomationTriggered({
      automationType: 'n8n_webhook',
      targetType: payload.targetType || 'system',
      targetId: payload.targetId || 'webhook',
      message: payload.message || `n8n webhook triggered: ${payload.eventType}`,
      metadata: payload.metadata
    })

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 250))

    // For MVP, return mock success
    return {
      success: true,
      workflowId: 'mock-workflow-123',
      executionId: 'mock-execution-456',
      result: { processed: true, timestamp: new Date().toISOString() }
    }

  } catch (error) {
    console.error('Failed to trigger n8n webhook:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Specific webhook triggers for common events
export async function triggerPingWebhook(params: {
  pingId: string
  targetType: 'person' | 'team'
  targetId: string
  message?: string
  userId?: string
  teamId?: string
}) {
  return triggerN8NWebhook({
    eventType: 'ping_sent',
    source: 'APP',
    timestamp: new Date().toISOString(),
    targetType: params.targetType,
    targetId: params.targetId,
    userId: params.userId,
    teamId: params.teamId,
    message: params.message,
    metadata: {
      pingId: params.pingId,
      timestamp: new Date().toISOString()
    }
  })
}

export async function triggerScheduleWebhook(params: {
  scheduleId: string
  title: string
  scheduledTime: string
  teamId?: string
  userId?: string
  zoneId?: string
}) {
  return triggerN8NWebhook({
    eventType: 'schedule_triggered',
    source: 'SYSTEM',
    timestamp: new Date().toISOString(),
    targetType: 'schedule',
    targetId: params.scheduleId,
    teamId: params.teamId,
    userId: params.userId,
    message: `Schedule triggered: ${params.title}`,
    metadata: {
      scheduleId: params.scheduleId,
      title: params.title,
      scheduledTime: params.scheduledTime,
      teamId: params.teamId,
      userId: params.userId,
      zoneId: params.zoneId
    }
  })
}

export async function triggerSheetsSyncWebhook(params: {
  entityType: 'user' | 'team' | 'schedule'
  entityId: string
  operation: 'create' | 'update' | 'delete'
  changes: any
}) {
  return triggerN8NWebhook({
    eventType: 'sheets_sync',
    source: 'SHEETS',
    timestamp: new Date().toISOString(),
    targetType: params.entityType,
    targetId: params.entityId,
    message: `${params.entityType} ${params.operation}d via Google Sheets`,
    metadata: {
      entityType: params.entityType,
      entityId: params.entityId,
      operation: params.operation,
      changes: params.changes,
      syncTimestamp: new Date().toISOString()
    }
  })
}

export async function triggerSlackWebhook(params: {
  channelId: string
  message: string
  slackUserId?: string
  eventType: string
}) {
  return triggerN8NWebhook({
    eventType: 'slack_received',
    source: 'SLACK',
    timestamp: new Date().toISOString(),
    targetType: 'slack_channel',
    targetId: params.channelId,
    message: params.message,
    metadata: {
      channelId: params.channelId,
      slackUserId: params.slackUserId,
      eventType: params.eventType,
      message: params.message
    }
  })
}

// Endpoint to receive n8n webhook responses
export async function handleN8NWebhook(payload: any): Promise<{
  success: boolean
  processed: boolean
}> {
  try {
    console.log('[n8n] Webhook received from n8n:', payload)

    // This endpoint would be called by n8n workflows
    // to report back results or trigger further actions
    
    // Example payload from n8n might include:
    // - workflow execution results
    // - data processed from external systems
    // - requests to update Christable records
    
    // For MVP, we'll just log and acknowledge
    await logAutomationTriggered({
      automationType: 'n8n_callback',
      targetType: 'system',
      targetId: 'n8n_webhook',
      message: `n8n webhook callback received: ${payload.eventType || 'unknown'}`,
      metadata: payload
    })

    return {
      success: true,
      processed: true
    }

  } catch (error) {
    console.error('Failed to handle n8n webhook:', error)
    return {
      success: false,
      processed: false
    }
  }
}

// Helper to batch multiple webhook triggers
export async function triggerBatchWebhooks(
  webhooks: Array<() => Promise<N8NResponse>>
): Promise<Array<N8NResponse>> {
  const results = await Promise.allSettled(
    webhooks.map(fn => fn())
  )

  return results.map(result => 
    result.status === 'fulfilled' 
      ? result.value 
      : { success: false, error: result.reason?.message || 'Unknown error' }
  )
}
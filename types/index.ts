// Core types for Christable MVP

export type User = {
  id: string
  userId?: string
  name: string
  role?: string
  phone?: string
  email?: string
  messageNotes?: string
  status: 'active' | 'inactive' | 'away'
  slackChannelId?: string
  imageUrl?: string
  lastPingAt?: Date
  lastMessageAt?: Date
  createdAt: Date
  updatedAt: Date
  source: 'APP' | 'SHEETS' | 'SLACK' | 'N8N'
  
  // Relations
  teamId?: string
  zoneId?: string
  team?: Team
  zone?: Zone
}

export type Team = {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  source: 'APP' | 'SHEETS' | 'SLACK' | 'N8N'
  
  // Relations
  users: User[]
  memberCount?: number
}

export type Zone = {
  id: string
  name: string
  label?: string
  polygonData: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  createdAt: Date
  updatedAt: Date
  
  // Relations
  venueMapId: string
  users: User[]
}

export type VenueMap = {
  id: string
  name: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  zones: Zone[]
}

export type Schedule = {
  id: string
  title: string
  description?: string
  scheduledTime: Date
  reminderMinutes?: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  messageTemplate?: string
  createdAt: Date
  updatedAt: Date
  source: 'APP' | 'SHEETS' | 'SLACK' | 'N8N'
  
  // Relations
  teamId?: string
  zoneId?: string
  userId?: string
  team?: Team
  zone?: Zone
  user?: User
}

export type EventType = 
  | 'ping_sent'
  | 'team_ping_expanded'
  | 'slack_received'
  | 'schedule_triggered'
  | 'sheets_sync'
  | 'user_created'
  | 'user_updated'
  | 'team_created'
  | 'team_updated'
  | 'zone_created'
  | 'zone_updated'
  | 'schedule_created'
  | 'schedule_updated'
  | 'automation_triggered'

export type EventSource = 'APP' | 'SHEETS' | 'SLACK' | 'N8N' | 'SYSTEM'

export type Event = {
  id: string
  type: EventType
  source: EventSource
  payload: {
    message: string
    metadata?: any
  }
  createdAt: Date
  
  // Optional relations
  userId?: string
  teamId?: string
  zoneId?: string
  scheduleId?: string
  parentEventId?: string
  pingId?: string
  
  // Relations
  user?: User
  team?: Team
  zone?: Zone
  schedule?: Schedule
  parentEvent?: Event
  childEvents?: Event[]
  ping?: Ping
}

export type Ping = {
  id: string
  targetType: 'person' | 'team'
  targetId: string
  message?: string
  status: 'sent' | 'delivered' | 'failed'
  slackSent: boolean
  fcmSent: boolean
  n8nTriggered: boolean
  createdAt: Date
  updatedAt: Date
  
  // Relations
  userId?: string
  teamId?: string
  user?: User
  team?: Team
  events: Event[]
}

export type SyncLog = {
  id: string
  entityType: 'user' | 'team' | 'schedule'
  entityId: string
  operation: 'create' | 'update' | 'delete'
  source: 'APP' | 'SHEETS'
  changes: {
    before?: any
    after?: any
  }
  createdAt: Date
}

// API Request/Response types
export type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'team' | 'zone'>
export type UpdateUserRequest = Partial<CreateUserRequest>

export type CreateTeamRequest = Omit<Team, 'id' | 'createdAt' | 'updatedAt' | 'users' | 'memberCount'>
export type UpdateTeamRequest = Partial<CreateTeamRequest>

export type CreateScheduleRequest = Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'team' | 'zone' | 'user'>

export type PingRequest = {
  targetType: 'person' | 'team'
  targetId: string
  message?: string
  sendSlack?: boolean
  triggerAutomation?: boolean
}

export type EventLogRequest = {
  type: EventType
  source?: EventSource
  userId?: string
  teamId?: string
  zoneId?: string
  scheduleId?: string
  parentEventId?: string
  payload: {
    message: string
    metadata?: any
  }
}

// Dashboard stats
export type DashboardStats = {
  totalUsers: number
  totalTeams: number
  totalSchedules: number
  recentPings: number
  liveActivity: number
  activeUsers: number
  pendingSchedules: number
}
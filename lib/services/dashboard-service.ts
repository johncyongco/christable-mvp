export interface DashboardStats {
  totalUsers: number
  totalTeams: number
  totalSchedules: number
  recentPings: number
  liveActivity: number
  activeUsers: number
  pendingSchedules: number
}

export interface User {
  id: string
  name: string
  role: string
  phone: string | null
  email: string | null
  status: string
  imageUrl: string | null
  team?: {
    id: string
    name: string
  } | null
  zone?: {
    id: string
    name: string
  } | null
}

export interface DashboardData {
  stats: DashboardStats
  activePersonnel: User[]
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch('/api/dashboard/stats', {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch dashboard data')
    }
    
    return {
      stats: result.data.stats,
      activePersonnel: result.data.activePersonnel || []
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    // Return fallback data
    return {
      stats: {
        totalUsers: 0,
        totalTeams: 0,
        totalSchedules: 0,
        recentPings: 0,
        liveActivity: 0,
        activeUsers: 0,
        pendingSchedules: 0
      },
      activePersonnel: []
    }
  }
}

export async function fetchUsers(params?: {
  limit?: number
  teamId?: string
  zoneId?: string
  status?: string
  search?: string
}): Promise<User[]> {
  try {
    const url = new URL('/api/users', window.location.origin)
    
    if (params?.limit) url.searchParams.set('limit', params.limit.toString())
    if (params?.teamId) url.searchParams.set('teamId', params.teamId)
    if (params?.zoneId) url.searchParams.set('zoneId', params.zoneId)
    if (params?.status) url.searchParams.set('status', params.status)
    if (params?.search) url.searchParams.set('search', params.search)
    
    const response = await fetch(url.toString(), {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch users')
    }
    
    return result.data || []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
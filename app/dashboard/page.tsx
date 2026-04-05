import EventOverview from '@/components/dashboard/EventOverview'
import PeoplePanel from '@/components/dashboard/PeoplePanel'
import TeamsPanel from '@/components/dashboard/TeamsPanel'
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed'
import SchedulePanel from '@/components/dashboard/SchedulePanel'
import VenueMapPreview from '@/components/dashboard/VenueMapPreview'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Event Command Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Real-time coordination center for managing people, teams, pings, and schedules
        </p>
      </div>

      <EventOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PeoplePanel />
          <TeamsPanel />
          <SchedulePanel />
        </div>
        
        <div className="space-y-6">
          <LiveActivityFeed />
          <VenueMapPreview />
        </div>
      </div>
    </div>
  )
}
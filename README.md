# Christable MVP

A real-time event coordination and command dashboard for managing people, teams, pings, schedules, zones, and operational activity during live events.

## 🎯 Product Vision

Christable is **NOT** a chat app, CRM, or social platform. It is an event-driven coordination system with a full audit trail, designed as an operations control center for live events.

## ✨ Core Features

### Dashboard
- Real-time event overview with key metrics
- People management with quick ping actions
- Team coordination with member tracking
- Live activity feed showing all system events
- Schedule management with reminders
- Venue map with zone visualization

### People System
- Full CRUD for people records
- Team and zone assignment
- Status tracking (active, idle, needs attention)
- Slack integration via ChannelID
- Last ping/message tracking
- Image upload support

### Team System
- Dynamic team creation and management
- Member assignment and counting
- Team ping expansion to individual members
- Team-level settings and automation

### Ping Engine (Core Feature)
- Ping individuals or entire teams
- Message attachment for each ping
- FCM notifications delivery
- Slack integration
- n8n automation triggers
- Full event logging

### Live Activity Feed
- Unified stream of all system events
- Real-time updates
- Event categorization (ping, schedule, sync, etc.)
- Source tracking (APP, SHEETS, SLACK, N8N)

### Venue Map & Zone System
- Upload venue floorplan images
- Draw polygon zones on the map
- Zone assignment for people and schedules
- Zone-based pinging

### Schedule System
- Create and manage event schedules
- Team and zone assignment
- Automated reminders
- Schedule-triggered pings and notifications

### Integration Layer
- **Google Sheets**: Two-way sync for operational editing
- **Slack**: Outgoing notifications and incoming webhooks
- **n8n**: Automation orchestration via webhooks
- **FCM**: Push notifications to mobile devices

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **UI**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Realtime**: Polling/SSE (MVP), extensible to WebSockets
- **Auth**: Simple admin scaffold (focus on dashboard logic first)

### Database Models
- `User`: People records with team/zone assignment
- `Team`: Group management
- `Zone`: Venue area definitions
- `Schedule`: Time-based events
- `Event`: System activity logging
- `Ping`: Ping records with delivery status
- `VenueMap`: Uploaded floorplans
- `SyncLog`: Google Sheets sync tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd christable-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - Other integration keys (optional for MVP)

4. **Set up database**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
christable-mvp/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard page
│   ├── people/            # People management
│   ├── teams/             # Team management
│   ├── schedule/          # Schedule management
│   ├── map/               # Venue map & zones
│   ├── activity/          # Full activity feed
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── ui/                # Reusable UI components
│   └── forms/             # Form components
├── lib/                   # Utility libraries
│   ├── db.ts             # Database client
│   ├── events.ts         # Event logging system
│   ├── ping-engine.ts    # Ping delivery logic
│   ├── notifications.ts  # FCM integration
│   └── sync/             # External integrations
├── prisma/               # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts           # Database seed data
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Database Management
```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 🎨 Design Principles

### UI/UX
- **Operational Focus**: Dashboard-first, not conversation-based
- **Clean & Practical**: Premium but functional design
- **High Signal, Low Clutter**: Only essential information
- **Responsive**: Mobile-first, desktop-optimized

### System Design
- **Event-Driven**: Everything important becomes an event
- **Audit Trail**: Full logging of all actions
- **Modular Architecture**: Extensible and maintainable
- **Integration-Ready**: Webhook-friendly design

## 🚀 Deployment

### Quick Deployment Options:

#### Option 1: Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure environment variables
5. Click "Deploy"

#### Option 2: Use Deployment Scripts
- **Windows**: Run `deploy.bat`
- **Mac/Linux**: Run `./deploy.sh`

#### Option 3: Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables
See `.env.production.example` for required production variables.

### Detailed Deployment Guide
Check [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions, troubleshooting, and maintenance.

## 📦 Recent Updates

### ✅ Completed Features:
1. **Map Page**: Interactive zone drawing and management
2. **People Page**: Slack UserID field added, dynamic form data
3. **Teams Page**: Zone assignment and people multi-select
4. **Brand Colors**: Consistent styling across all pages
5. **Deployment Ready**: Full Vercel configuration

### 🎨 Brand Color Scheme:
- `brand-teal` (#1ba392) - Primary actions
- `brand-coral` (#de5e4f) - Danger/warning
- `brand-gold` (#f8b724) - Warning/attention
- `brand-light` (#dadade) - Secondary elements
- `brand-dark` (#372f49) - Text/headings

## 🔌 Integration Points

### Google Sheets Sync
- Two-way sync for operational editing
- Last-write-wins conflict resolution
- Sync logs for audit trail
- Webhook support for real-time updates

### Slack Integration
- Outgoing notifications to user channels
- Incoming webhook support
- ChannelID storage on user records
- Event logging for Slack activity

### n8n Automation
- Webhook endpoints for automation triggers
- Structured payloads for workflow processing
- Callback support for workflow results
- Event logging for automation activity

### FCM Notifications
- Push notifications to mobile devices
- Delivery status tracking
- Bulk notification support
- Emergency alert capabilities

## 📈 MVP Roadmap

### Phase 1: Core Foundation
- [x] Prisma schema and database models
- [x] Basic dashboard shell
- [x] User and team CRUD
- [x] Event logging system

### Phase 2: Ping Engine
- [x] Single person ping flow
- [x] Team ping expansion
- [x] Event logging integration
- [x] Live activity feed

### Phase 3: Integration Scaffolding
- [x] FCM notification mock
- [x] n8n webhook structure
- [x] Slack integration mock
- [x] Google Sheets sync layer

### Phase 4: Schedule System
- [x] Schedule creation and management
- [x] Reminder trigger logic
- [x] Schedule event creation
- [x] Dashboard integration

### Phase 5: Venue Map & Zones
- [x] Map upload interface
- [x] Zone drawing mock
- [x] Zone assignment
- [x] Map preview component

### Phase 6: Polish & Deployment
- [ ] Real-time updates implementation
- [ ] Error handling and validation
- [ ] Performance optimization
- [x] Production deployment setup

## 🚨 Important Rules

1. **Not a Chat App**: The Live Activity Feed is a system log, not a conversation thread
2. **Event-Driven**: All important actions create event records
3. **Team Ping Expansion**: Team pings expand to individual user-level events
4. **Last-Write-Wins**: Conflict resolution via updatedAt timestamps
5. **Audit Trail**: Full logging of all system changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with details

---

**Built for operational excellence in live event coordination**
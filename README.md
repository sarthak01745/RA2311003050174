# Campus Notifications System

A comprehensive notification management system designed to deliver prioritized campus notifications to students. This workspace contains multiple implementations of a priority inbox solution that intelligently surfaces the most important notifications.

## 📋 System Overview

The Campus Notifications System addresses the challenge of notification overload by implementing a smart **Priority Inbox** that always displays the top 'n' most important notifications. Rather than bombarding users with all notifications, the system:

1. **Prioritizes by Type**: Different notification types have different weights based on importance
   - `Placement` (Weight: 3) - Highest priority
   - `Result` (Weight: 2) - Medium priority
   - `Event` (Weight: 1) - Lower priority

2. **Considers Recency**: Within each type, newer notifications rank higher

3. **Maintains Efficiency**: Uses a Min-Heap (Priority Queue) algorithm to process notifications in O(log n) time, ensuring scalability even with high-frequency updates

## 📁 Workspace Structure

### Projects

#### 1. **campus-notifications** ([campus-notifications/](campus-notifications/))
The primary campus notifications frontend application built with Next.js, TypeScript, and Material UI.

**Key Features:**
- View all incoming notifications with pagination and filtering
- Priority Inbox displaying top 'n' most important notifications
- Visual distinction between new and previously viewed notifications
- Real-time notification fetching from API
- Robust logging integration for evaluation and analytics

**Tech Stack:**
- Next.js (App Router)
- TypeScript
- Material UI
- React State Management

**Quick Start:**
```bash
cd campus-notifications
npm install
npm run dev
# Open http://localhost:3000
```

#### 2. **notification_app_fe** ([notification_app_fe/](notification_app_fe/))
Secondary implementation of the notifications frontend with identical structure and features to `campus-notifications`.

**Tech Stack:**
- Next.js (App Router)
- TypeScript
- Material UI

**Quick Start:**
```bash
cd notification_app_fe
npm install
npm run dev
# Open http://localhost:3000
```

### Supporting Files

- **[notification_system_design.md](notification_system_design.md)** - Detailed technical design document explaining:
  - Priority scoring algorithm
  - Min-Heap implementation strategy
  - Efficiency analysis and complexity
  - Frontend implementation details

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Environment variables configured (see below)

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd c:\Users\sw\OneDrive\Desktop\RA
   ```

2. **Install dependencies for your chosen project**
   ```bash
   cd campus-notifications  # or notification_app_fe
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the project root:
   ```
   API_BEARER_TOKEN="your_token_here"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Frontend Components
Both projects share a similar component structure:

- **Layout & Navigation**: `Header.tsx`, `TabsNavigation.tsx`
- **Content Display**: `NotificationCard.tsx`, `NotificationList.tsx`
- **UI Controls**: `FilterDropdown.tsx`, `PaginationControl.tsx`, `TopNDropdown.tsx`
- **Theming**: `ThemeRegistry.tsx`

### Core Services
- **notificationService.ts** - API communication and data fetching
- **priority.ts** - Priority scoring and Min-Heap logic
- **logger.ts** - Logging and analytics integration

### API Endpoints
- `GET /api/notifications` - Fetch notifications
- `POST /api/logs` - Submit user interaction logs

## 💡 Priority Algorithm

The system uses a scoring mechanism to rank notifications:

```
Score = Type Weight + (Normalized Timestamp)
```

**Example Scoring:**
- Placement from 10 minutes ago: `3 + 0.00001 = 3.00001`
- Result from 5 minutes ago: `2 + 0.000005 = 2.000005`
- Event from now: `1 + 0 = 1`

The Min-Heap ensures only the top 'n' notifications are maintained in memory, providing:
- **Time Complexity**: O(log n) per notification
- **Space Complexity**: O(n)
- **Scalability**: Efficient for high-frequency real-time updates

## 🔧 Development

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure
```
src/
├── app/              # Next.js app router
│   ├── page.tsx      # Main page
│   ├── layout.tsx    # Root layout
│   └── api/          # API routes
├── components/       # React components
├── services/         # Business logic & API calls
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── styles/           # Global styles & theme
```

## 📝 Logging & Analytics

Both applications include robust logging capabilities:
- User interactions (view, filter, sort)
- Performance metrics
- Error tracking
- Integration with external evaluation services

Logs are submitted to `/api/logs` endpoint for backend processing.

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme Support**: Via Material UI theming system
- **Real-time Updates**: Notifications refresh as they arrive
- **Filtering & Pagination**: Browse large notification lists efficiently
- **Visual Indicators**: Clear distinction between new and viewed notifications

## 🔐 Security

- Bearer token authentication for API access
- Environment variables for sensitive credentials
- TypeScript for type safety
- Middleware for request validation

## 📊 Performance Considerations

- **Priority Inbox**: O(log n) insertions with Min-Heap
- **Pagination**: Reduces DOM rendering complexity
- **Lazy Loading**: Components load as needed
- **State Management**: Efficient React state for viewed/unread tracking

## 🐛 Troubleshooting

### Notifications not loading
- Verify `API_BEARER_TOKEN` is correctly set in `.env.local`
- Check browser console for API errors
- Ensure backend API is running and accessible

### Styling issues
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `npm install`

### Performance issues
- Check top 'n' limit in UI dropdown (smaller values = faster)
- Review browser DevTools Performance tab
- Check server logs for bottlenecks

### Images
<img width="988" height="777" alt="Screenshot 2026-05-02 121151" src="https://github.com/user-attachments/assets/7519d1a4-c5a0-46ac-b9e8-8ca9f1a88699" />
<img width="1860" height="863" alt="Screenshot 2026-05-02 124448" src="https://github.com/user-attachments/assets/c72b7862-523e-4dff-aeef-231a38a23c63" />
<img width="1914" height="866" alt="Screenshot 2026-05-02 124502" src="https://github.com/user-attachments/assets/8ea5555d-c085-4176-9b7e-98f1e4090046" />

## 📞 Support & Documentation

For more detailed technical information, see:
- [System Design Document](notification_system_design.md)
- Individual project READMEs: [campus-notifications/README.md](campus-notifications/README.md)

## 📄 License

This project is part of a Research & Development initiative.

---

**Last Updated**: May 2, 2026

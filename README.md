# ISE Sports Agency Dashboard

A Next.js application for managing ISE Sports Agency's property portfolio and stadium naming rights deals.

## Features

- **Property Portfolio Overview**: View all properties at a glance
- **Detailed Property Pages**: Comprehensive view of property details including contract information
- **Admin Interface**: Manage properties with an easy-to-use admin dashboard
- **MongoDB Integration**: Store property data in MongoDB

## Getting Started

### Prerequisites

- Node.js 12.0 or later
- MongoDB (local or remote instance)

### Environment Setup

Create a `.env.local` file in the root directory with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/ise-sports-agency?retryWrites=true&w=majority
```

Replace the connection string with your actual MongoDB URI. This is required for the application to store and retrieve property data.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Admin Interface

The admin interface is accessible at [http://localhost:3000/admin](http://localhost:3000/admin) and allows you to:

- View all properties
- Add new properties
- Edit existing properties

## Project Structure

- `/pages` - Next.js pages
  - `/api` - API routes for MongoDB integration
  - `/admin` - Admin interface pages
  - `/properties` - Property detail pages
- `/components` - Reusable React components
- `/models` - MongoDB data models
- `/lib` - Utility functions and libraries
- `/public` - Static assets

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS

## Future Enhancements

- Prospects CRM for managing potential sponsors
- CSV upload functionality for bulk data import
- User authentication and role-based access control
- Analytics dashboard for business insights

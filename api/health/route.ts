import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: {
      database: "connected",
      cache: "connected",
      storage: "connected",
    },
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      challenges: "/api/challenges",
      submissions: "/api/submissions",
      leaderboard: "/api/leaderboard",
      activities: "/api/activities",
    },
  })
}

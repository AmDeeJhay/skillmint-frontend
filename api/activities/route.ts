import { type NextRequest, NextResponse } from "next/server"

// Mock activities data
const activities = [
  {
    id: "activity-1",
    type: "challenge_completed",
    userId: "user-1",
    username: "CryptoMaster",
    userAvatar: "/placeholder.svg?height=32&width=32",
    challengeId: "1",
    challengeTitle: "Build a Decentralized Exchange (DEX)",
    description: "completed the DEX challenge",
    reward: "500",
    timestamp: "2024-12-16T10:30:00Z",
    metadata: {
      score: 95,
      difficulty: "advanced",
    },
  },
  {
    id: "activity-2",
    type: "badge_earned",
    userId: "user-2",
    username: "ReactNinja",
    userAvatar: "/placeholder.svg?height=32&width=32",
    badgeId: "badge-frontend-master",
    badgeName: "Frontend Master",
    description: "earned the Frontend Master badge",
    timestamp: "2024-12-16T09:15:00Z",
    metadata: {
      badgeType: "skill",
      category: "frontend",
    },
  },
  {
    id: "activity-3",
    type: "challenge_submitted",
    userId: "user-3",
    username: "BackendGuru",
    userAvatar: "/placeholder.svg?height=32&width=32",
    challengeId: "3",
    challengeTitle: "Microservices API with Docker",
    description: "submitted a solution for the Microservices challenge",
    timestamp: "2024-12-16T08:45:00Z",
    metadata: {
      submissionId: "sub-15",
    },
  },
  {
    id: "activity-4",
    type: "user_joined",
    userId: "user-6",
    username: "NewDeveloper",
    userAvatar: "/placeholder.svg?height=32&width=32",
    description: "joined SkillMint",
    timestamp: "2024-12-16T07:20:00Z",
    metadata: {
      referralCode: null,
    },
  },
  {
    id: "activity-5",
    type: "challenge_completed",
    userId: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    username: "SkillMinter",
    userAvatar: "/placeholder.svg?height=32&width=32",
    challengeId: "2",
    challengeTitle: "React Dashboard with Real-time Analytics",
    description: "completed the React Dashboard challenge",
    reward: "250",
    timestamp: "2024-12-15T16:30:00Z",
    metadata: {
      score: 88,
      difficulty: "intermediate",
    },
  },
  {
    id: "activity-6",
    type: "milestone_reached",
    userId: "user-1",
    username: "CryptoMaster",
    userAvatar: "/placeholder.svg?height=32&width=32",
    description: "reached 5000 ADA in total earnings",
    timestamp: "2024-12-15T14:10:00Z",
    metadata: {
      milestone: "5000_ada_earned",
      totalEarnings: "5420.75",
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const type = searchParams.get("type")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let filteredActivities = [...activities]

    // Filter by user if specified
    if (userId) {
      filteredActivities = filteredActivities.filter((activity) => activity.userId === userId)
    }

    // Filter by type if specified
    if (type) {
      filteredActivities = filteredActivities.filter((activity) => activity.type === type)
    }

    // Sort by timestamp (most recent first)
    filteredActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Apply pagination
    const limitNum = limit ? Number.parseInt(limit) : 20
    const offsetNum = offset ? Number.parseInt(offset) : 0

    const paginatedActivities = filteredActivities.slice(offsetNum, offsetNum + limitNum)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({
      activities: paginatedActivities,
      total: filteredActivities.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredActivities.length,
    })
  } catch (error) {
    console.error("Get activities error:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const activityData = await request.json()

    // Validate required fields
    const requiredFields = ["type", "userId", "username", "description"]
    for (const field of requiredFields) {
      if (!activityData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new activity
    const newActivity = {
      id: `activity-${activities.length + 1}`,
      ...activityData,
      timestamp: new Date().toISOString(),
    }

    activities.unshift(newActivity) // Add to beginning for most recent first

    return NextResponse.json(newActivity, { status: 201 })
  } catch (error) {
    console.error("Create activity error:", error)
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}

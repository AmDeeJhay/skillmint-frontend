import { type NextRequest, NextResponse } from "next/server"

// Mock user data with badges and submissions
const userData = {
  "27c9db93-a9eb-452c-a9a6-e045da5b24f6": {
    id: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2r",
    username: "SkillMinter",
    email: "user@skillmint.com",
    profileImage: "/placeholder.svg?height=100&width=100",
    bio: "Passionate developer exploring blockchain and Web3 technologies",
    skillCategories: ["Frontend", "Blockchain", "Smart Contracts"],
    totalEarnings: "2450.75",
    reputation: 95,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    badges: [
      {
        id: "badge-1",
        name: "Frontend Master",
        description: "Completed 5 frontend challenges with excellence",
        earnedAt: "2024-11-15T09:00:00Z",
        nftTokenId: "token_001",
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "badge-2",
        name: "Blockchain Pioneer",
        description: "First to complete a blockchain challenge",
        earnedAt: "2024-10-20T16:30:00Z",
        nftTokenId: "token_002",
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "badge-3",
        name: "Smart Contract Expert",
        description: "Successfully deployed 3 smart contracts",
        earnedAt: "2024-12-01T11:45:00Z",
        nftTokenId: "token_003",
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
    ],
    submissions: [
      {
        id: "sub-1",
        challengeId: "1",
        status: "completed",
        submittedAt: "2024-11-20T14:30:00Z",
        score: 95,
        feedback: "Excellent implementation with clean code",
      },
      {
        id: "sub-2",
        challengeId: "2",
        status: "completed",
        submittedAt: "2024-11-25T10:15:00Z",
        score: 88,
        feedback: "Good solution, minor improvements needed",
      },
      {
        id: "sub-3",
        challengeId: "3",
        status: "pending",
        submittedAt: "2024-12-10T16:45:00Z",
        score: null,
        feedback: null,
      },
      {
        id: "sub-4",
        challengeId: "4",
        status: "completed",
        submittedAt: "2024-12-05T13:20:00Z",
        score: 92,
        feedback: "Great work on the UI/UX design",
      },
    ],
    createdChallenges: [
      {
        id: "created-1",
        title: "Build a DeFi Lending Protocol",
        category: "blockchain",
        difficulty: "advanced",
        reward: "500",
        status: "active",
        createdAt: "2024-11-01T10:00:00Z",
        deadline: "2024-12-31T23:59:59Z",
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = userData[userId as keyof typeof userData]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(user)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const updates = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = userData[userId as keyof typeof userData]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user data
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    // In a real app, save to database
    userData[userId as keyof typeof userData] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 })
  }
}

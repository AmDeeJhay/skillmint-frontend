import { type NextRequest, NextResponse } from "next/server"

// Mock leaderboard data
const leaderboardData = [
  {
    id: "user-1",
    username: "CryptoMaster",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2r",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "5420.75",
    challengesCompleted: 12,
    reputation: 98,
    badges: 8,
    rank: 1,
    skillCategories: ["Blockchain", "Smart Contracts", "DeFi"],
    recentActivity: "Completed Advanced DeFi Protocol",
    joinedAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "user-2",
    username: "ReactNinja",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2s",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "4850.25",
    challengesCompleted: 15,
    reputation: 95,
    badges: 7,
    rank: 2,
    skillCategories: ["Frontend", "React", "TypeScript"],
    recentActivity: "Built Real-time Dashboard",
    joinedAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "user-3",
    username: "BackendGuru",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2t",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "4200.50",
    challengesCompleted: 10,
    reputation: 92,
    badges: 6,
    rank: 3,
    skillCategories: ["Backend", "Node.js", "Microservices"],
    recentActivity: "Deployed Scalable API",
    joinedAt: "2024-01-25T14:15:00Z",
  },
  {
    id: "user-4",
    username: "MobileDevPro",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2u",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "3750.00",
    challengesCompleted: 8,
    reputation: 89,
    badges: 5,
    rank: 4,
    skillCategories: ["Mobile", "React Native", "Flutter"],
    recentActivity: "Published Cross-platform App",
    joinedAt: "2024-03-01T09:45:00Z",
  },
  {
    id: "user-5",
    username: "DevOpsExpert",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2v",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "3200.75",
    challengesCompleted: 9,
    reputation: 87,
    badges: 4,
    rank: 5,
    skillCategories: ["DevOps", "Docker", "Kubernetes"],
    recentActivity: "Optimized CI/CD Pipeline",
    joinedAt: "2024-02-20T11:20:00Z",
  },
  {
    id: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    username: "SkillMinter",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2r",
    profileImage: "/placeholder.svg?height=40&width=40",
    totalEarnings: "2450.75",
    challengesCompleted: 4,
    reputation: 95,
    badges: 3,
    rank: 8,
    skillCategories: ["Frontend", "Blockchain", "Smart Contracts"],
    recentActivity: "Completed React Dashboard",
    joinedAt: "2024-01-15T10:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const timeframe = searchParams.get("timeframe") || "all-time"
    const limit = searchParams.get("limit")

    let filteredData = [...leaderboardData]

    // Filter by category if specified
    if (category && category !== "all") {
      filteredData = filteredData.filter((user) =>
        user.skillCategories.some((skill) => skill.toLowerCase().includes(category.toLowerCase())),
      )
    }

    // Sort by different criteria based on timeframe
    switch (timeframe) {
      case "weekly":
        // In a real app, this would filter by recent activity
        filteredData = filteredData.sort((a, b) => b.reputation - a.reputation)
        break
      case "monthly":
        filteredData = filteredData.sort((a, b) => b.challengesCompleted - a.challengesCompleted)
        break
      case "all-time":
      default:
        filteredData = filteredData.sort(
          (a, b) => Number.parseFloat(b.totalEarnings) - Number.parseFloat(a.totalEarnings),
        )
        break
    }

    // Update ranks based on current sort
    filteredData = filteredData.map((user, index) => ({
      ...user,
      rank: index + 1,
    }))

    // Apply limit if specified
    if (limit) {
      filteredData = filteredData.slice(0, Number.parseInt(limit))
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      leaderboard: filteredData,
      total: filteredData.length,
      timeframe,
      category: category || "all",
    })
  } catch (error) {
    console.error("Get leaderboard error:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}

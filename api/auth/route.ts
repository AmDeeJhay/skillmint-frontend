import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = [
  {
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
  },
  {
    id: "user-2",
    walletAddress: "addr1qxy2lpan99fcnhhhy8heycw0lsa05rmuf2ej6cl6gxc9wcqd2s",
    username: "BlockchainDev",
    email: "dev@skillmint.com",
    profileImage: "/placeholder.svg?height=100&width=100",
    bio: "Full-stack developer with expertise in DeFi protocols",
    skillCategories: ["Backend", "Blockchain", "DeFi"],
    totalEarnings: "3200.50",
    reputation: 88,
    createdAt: "2024-02-10T08:15:00Z",
    updatedAt: "2024-12-16T12:30:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Find user by wallet address
    const user = users.find((u) => u.walletAddress === walletAddress)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Generate a simple JWT-like token (in production, use proper JWT)
    const token = Buffer.from(JSON.stringify({ userId: user.id, walletAddress })).toString("base64")

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Auth endpoint is working",
    endpoints: {
      login: "POST /api/auth",
      logout: "DELETE /api/auth",
    },
  })
}

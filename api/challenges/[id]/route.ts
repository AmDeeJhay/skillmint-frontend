import { type NextRequest, NextResponse } from "next/server"

// Import challenges data (in a real app, this would be from a database)
const challenges = [
  {
    id: "1",
    title: "Build a Decentralized Exchange (DEX)",
    description:
      "Create a fully functional DEX with order book functionality, liquidity pools, and token swapping capabilities using Plutus smart contracts.",
    category: "blockchain",
    difficulty: "advanced",
    reward: "500",
    deadline: "2024-12-31T23:59:59Z",
    duration: "4-6 weeks",
    requirements: {
      mobileFriendly: false,
      accessibility: true,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 23,
    tags: ["plutus", "cardano", "defi", "smart-contracts"],
    skillsRequired: ["Haskell", "Plutus", "Cardano", "DeFi"],
    estimatedHours: 120,
    icon: "🔄",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    color: "text-purple-600 dark:text-purple-400",
    detailedRequirements: [
      "Implement order book functionality using Plutus smart contracts",
      "Support both limit and market orders",
      "Include proper error handling and validation",
      "Provide comprehensive documentation",
      "Deploy to Cardano testnet",
      "Include unit tests with >80% coverage",
    ],
    resources: [
      { title: "Plutus Documentation", url: "https://docs.cardano.org/plutus/", type: "docs" },
      { title: "DEX Architecture Guide", url: "#", type: "guide" },
      { title: "Sample Code Repository", url: "#", type: "code" },
      { title: "Cardano Testnet Faucet", url: "#", type: "tool" },
    ],
  },
  {
    id: "2",
    title: "React Dashboard with Real-time Analytics",
    description:
      "Build a comprehensive dashboard with real-time data visualization, user management, and responsive design using React and modern libraries.",
    category: "frontend",
    difficulty: "intermediate",
    reward: "250",
    deadline: "2024-12-25T23:59:59Z",
    duration: "2-3 weeks",
    requirements: {
      mobileFriendly: true,
      accessibility: true,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-05T14:30:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 45,
    tags: ["react", "typescript", "dashboard", "analytics"],
    skillsRequired: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    estimatedHours: 60,
    icon: "📊",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    color: "text-teal-600 dark:text-teal-400",
    detailedRequirements: [
      "Build responsive dashboard with React and TypeScript",
      "Implement real-time data visualization with Chart.js",
      "Create user management interface",
      "Ensure mobile responsiveness",
      "Include accessibility features (WCAG 2.1 AA)",
      "Write comprehensive tests",
    ],
    resources: [
      { title: "React Documentation", url: "https://react.dev/", type: "docs" },
      { title: "Chart.js Guide", url: "https://www.chartjs.org/docs/", type: "guide" },
      { title: "Dashboard Template", url: "#", type: "code" },
      { title: "Accessibility Checklist", url: "#", type: "tool" },
    ],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const challengeId = params.id

    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID is required" }, { status: 400 })
    }

    const challenge = challenges.find((c) => c.id === challengeId)

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(challenge)
  } catch (error) {
    console.error("Get challenge error:", error)
    return NextResponse.json({ error: "Failed to fetch challenge" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const challengeId = params.id
    const updates = await request.json()

    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID is required" }, { status: 400 })
    }

    const challengeIndex = challenges.findIndex((c) => c.id === challengeId)

    if (challengeIndex === -1) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Update challenge
    challenges[challengeIndex] = {
      ...challenges[challengeIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(challenges[challengeIndex])
  } catch (error) {
    console.error("Update challenge error:", error)
    return NextResponse.json({ error: "Failed to update challenge" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const challengeId = params.id

    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID is required" }, { status: 400 })
    }

    const challengeIndex = challenges.findIndex((c) => c.id === challengeId)

    if (challengeIndex === -1) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Remove challenge
    challenges.splice(challengeIndex, 1)

    return NextResponse.json({ message: "Challenge deleted successfully" })
  } catch (error) {
    console.error("Delete challenge error:", error)
    return NextResponse.json({ error: "Failed to delete challenge" }, { status: 500 })
  }
}

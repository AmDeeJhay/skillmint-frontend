import { type NextRequest, NextResponse } from "next/server"

// Enhanced challenges data
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
  },
  {
    id: "3",
    title: "Microservices API with Docker",
    description:
      "Design and implement a scalable microservices architecture with Docker containers, API gateway, and service discovery.",
    category: "backend",
    difficulty: "advanced",
    reward: "400",
    deadline: "2025-01-15T23:59:59Z",
    duration: "3-4 weeks",
    requirements: {
      mobileFriendly: false,
      accessibility: false,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-10T09:15:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 18,
    tags: ["microservices", "docker", "api", "backend"],
    skillsRequired: ["Node.js", "Docker", "Kubernetes", "API Design"],
    estimatedHours: 100,
    icon: "🐳",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "4",
    title: "Mobile App with React Native",
    description:
      "Create a cross-platform mobile application with authentication, real-time features, and native device integration.",
    category: "mobile",
    difficulty: "intermediate",
    reward: "300",
    deadline: "2025-01-10T23:59:59Z",
    duration: "3-4 weeks",
    requirements: {
      mobileFriendly: true,
      accessibility: true,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-12T16:45:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 32,
    tags: ["react-native", "mobile", "cross-platform", "authentication"],
    skillsRequired: ["React Native", "JavaScript", "Mobile Development", "Firebase"],
    estimatedHours: 80,
    icon: "📱",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "5",
    title: "CI/CD Pipeline with GitHub Actions",
    description:
      "Set up a complete CI/CD pipeline with automated testing, deployment, and monitoring using GitHub Actions and cloud services.",
    category: "devops",
    difficulty: "intermediate",
    reward: "200",
    deadline: "2024-12-30T23:59:59Z",
    duration: "1-2 weeks",
    requirements: {
      mobileFriendly: false,
      accessibility: false,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-15T11:20:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 27,
    tags: ["cicd", "github-actions", "devops", "automation"],
    skillsRequired: ["GitHub Actions", "Docker", "AWS/Azure", "Testing"],
    estimatedHours: 40,
    icon: "⚙️",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "6",
    title: "UI/UX Design System",
    description:
      "Create a comprehensive design system with components, guidelines, and documentation for a modern web application.",
    category: "design",
    difficulty: "beginner",
    reward: "150",
    deadline: "2025-01-05T23:59:59Z",
    duration: "2-3 weeks",
    requirements: {
      mobileFriendly: true,
      accessibility: true,
    },
    creatorId: "skillmint-team",
    status: "active",
    createdAt: "2024-11-18T13:10:00Z",
    updatedAt: "2024-12-16T14:22:00Z",
    submissionCount: 41,
    tags: ["design-system", "ui-ux", "figma", "components"],
    skillsRequired: ["Figma", "Design Systems", "UI/UX", "Prototyping"],
    estimatedHours: 50,
    icon: "🎨",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    color: "text-pink-600 dark:text-pink-400",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let filteredChallenges = [...challenges]

    // Apply filters
    if (category && category !== "all") {
      filteredChallenges = filteredChallenges.filter((c) => c.category === category)
    }

    if (difficulty) {
      filteredChallenges = filteredChallenges.filter((c) => c.difficulty === difficulty)
    }

    if (status) {
      filteredChallenges = filteredChallenges.filter((c) => c.status === status)
    }

    // Apply pagination
    const limitNum = limit ? Number.parseInt(limit) : filteredChallenges.length
    const offsetNum = offset ? Number.parseInt(offset) : 0

    const paginatedChallenges = filteredChallenges.slice(offsetNum, offsetNum + limitNum)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({
      challenges: paginatedChallenges,
      total: filteredChallenges.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredChallenges.length,
    })
  } catch (error) {
    console.error("Get challenges error:", error)
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const challengeData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "category", "difficulty", "reward"]
    for (const field of requiredFields) {
      if (!challengeData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new challenge
    const newChallenge = {
      id: (challenges.length + 1).toString(),
      ...challengeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionCount: 0,
      status: "active",
    }

    challenges.push(newChallenge)

    return NextResponse.json(newChallenge, { status: 201 })
  } catch (error) {
    console.error("Create challenge error:", error)
    return NextResponse.json({ error: "Failed to create challenge" }, { status: 500 })
  }
}

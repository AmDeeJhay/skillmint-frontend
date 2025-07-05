import { type NextRequest, NextResponse } from "next/server"

// Mock submissions database
const submissions = [
  {
    id: "sub-1",
    challengeId: "1",
    userId: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    title: "DEX Implementation with Advanced Features",
    description: "Complete DEX implementation with order book, liquidity pools, and advanced trading features.",
    githubUrl: "https://github.com/user/dex-implementation",
    liveUrl: "https://my-dex.vercel.app",
    status: "completed",
    score: 95,
    feedback: "Excellent implementation with clean code and comprehensive documentation.",
    submittedAt: "2024-11-20T14:30:00Z",
    reviewedAt: "2024-11-22T10:15:00Z",
    reviewerId: "reviewer-1",
    files: [
      { name: "smart-contract.hs", url: "#" },
      { name: "frontend.tsx", url: "#" },
      { name: "documentation.md", url: "#" },
    ],
  },
  {
    id: "sub-2",
    challengeId: "2",
    userId: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    title: "Analytics Dashboard with Real-time Updates",
    description: "Responsive dashboard with real-time charts and user management.",
    githubUrl: "https://github.com/user/analytics-dashboard",
    liveUrl: "https://analytics-dash.vercel.app",
    status: "completed",
    score: 88,
    feedback: "Good solution with minor improvements needed in accessibility.",
    submittedAt: "2024-11-25T10:15:00Z",
    reviewedAt: "2024-11-27T16:30:00Z",
    reviewerId: "reviewer-2",
    files: [
      { name: "dashboard.tsx", url: "#" },
      { name: "charts.tsx", url: "#" },
      { name: "tests.spec.ts", url: "#" },
    ],
  },
  {
    id: "sub-3",
    challengeId: "3",
    userId: "27c9db93-a9eb-452c-a9a6-e045da5b24f6",
    title: "Microservices Architecture Implementation",
    description: "Scalable microservices with Docker and API gateway.",
    githubUrl: "https://github.com/user/microservices-api",
    liveUrl: null,
    status: "pending",
    score: null,
    feedback: null,
    submittedAt: "2024-12-10T16:45:00Z",
    reviewedAt: null,
    reviewerId: null,
    files: [
      { name: "docker-compose.yml", url: "#" },
      { name: "api-gateway.js", url: "#" },
      { name: "user-service.js", url: "#" },
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const challengeId = searchParams.get("challengeId")
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let filteredSubmissions = [...submissions]

    // Apply filters
    if (challengeId) {
      filteredSubmissions = filteredSubmissions.filter((s) => s.challengeId === challengeId)
    }

    if (userId) {
      filteredSubmissions = filteredSubmissions.filter((s) => s.userId === userId)
    }

    if (status) {
      filteredSubmissions = filteredSubmissions.filter((s) => s.status === status)
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({
      submissions: filteredSubmissions,
      total: filteredSubmissions.length,
    })
  } catch (error) {
    console.error("Get submissions error:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json()

    // Validate required fields
    const requiredFields = ["challengeId", "userId", "title", "description"]
    for (const field of requiredFields) {
      if (!submissionData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new submission
    const newSubmission = {
      id: `sub-${submissions.length + 1}`,
      ...submissionData,
      status: "pending",
      score: null,
      feedback: null,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewerId: null,
    }

    submissions.push(newSubmission)

    return NextResponse.json(newSubmission, { status: 201 })
  } catch (error) {
    console.error("Create submission error:", error)
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 })
  }
}

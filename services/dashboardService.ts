import axios, { type AxiosInstance } from "axios"
import BASE_URL from "./baseUrl"
import { challengesData } from "@/lib/challenges-data"
import type { Challenge } from "@/types/challenges"

interface BadgeType {
  id: string
  name: string
  description: string
  earnedAt: string
  nftTokenId?: string
  imageUrl?: string
}

interface Submission {
  id: string
  challengeId: string
  status: string
  submittedAt: string
  score?: number
  feedback?: string
}

interface UserData {
  id: string
  walletAddress: string
  username: string
  email: string
  profileImage: string
  bio: string
  skillCategories: string[]
  totalEarnings: string
  reputation: number
  createdAt: string
  updatedAt: string
  badges: BadgeType[]
  submissions: Submission[]
  createdChallenges: Challenge[]
}

// Mock user data for fallback
const mockUserData: UserData = {
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
  createdChallenges: challengesData.slice(0, 4).map((challenge) => ({
    ...challenge,
    status: challenge.id === "1" ? "completed" : challenge.id === "2" ? "active" : "pending",
  })),
}

class DashboardService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    })
  }

  public async fetchUserData(userId: string): Promise<UserData> {
    try {
      console.log(`Fetching user data from API for ID: ${userId}`)

      const response = await this.api.get<UserData>(`/users/${userId}`)
      console.log("Successfully fetched user data from API")

      return response.data
    } catch (error) {
      console.warn("API unavailable, using mock user data:", error)

      // Return mock data as fallback
      return new Promise((resolve) => {
        // Simulate API delay for realistic experience
        setTimeout(() => {
          console.log("Returning mock user data")
          resolve(mockUserData)
        }, 500)
      })
    }
  }

  public async updateUserData(userId: string, updates: Partial<UserData>): Promise<UserData | null> {
    try {
      console.log(`Updating user data for ID: ${userId}`)

      const response = await this.api.put<UserData>(`/users/${userId}`, updates)
      console.log("Successfully updated user data")

      return response.data
    } catch (error) {
      console.error("Failed to update user data:", error)
      return null
    }
  }

  // Helper method to get available user data (for debugging)
  public getMockUserData(): UserData {
    return mockUserData
  }

  // Method to check if API is available
  public async checkApiHealth(): Promise<boolean> {
    try {
      await this.api.get("/health")
      return true
    } catch {
      return false
    }
  }
}

const dashboardService = new DashboardService()
export default dashboardService

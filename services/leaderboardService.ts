import axios, { type AxiosInstance } from "axios"
import BASE_URL from "./baseUrl"

interface LeaderboardUser {
  id: string
  username: string
  walletAddress: string
  profileImage: string
  totalEarnings: string
  challengesCompleted: number
  reputation: number
  badges: number
  rank: number
  skillCategories: string[]
  recentActivity: string
  joinedAt: string
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[]
  total: number
  timeframe: string
  category: string
}

// Mock leaderboard data for fallback
const mockLeaderboardData: LeaderboardUser[] = [
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

class LeaderboardService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async fetchLeaderboard(filters?: {
    category?: string
    timeframe?: string
    limit?: number
  }): Promise<LeaderboardUser[]> {
    try {
      console.log("Fetching leaderboard from API...")

      const params = new URLSearchParams()
      if (filters?.category) params.append("category", filters.category)
      if (filters?.timeframe) params.append("timeframe", filters.timeframe)
      if (filters?.limit) params.append("limit", filters.limit.toString())

      const response = await this.api.get<LeaderboardResponse>(`/leaderboard?${params.toString()}`)
      console.log(`Successfully fetched ${response.data.leaderboard.length} leaderboard entries from API`)

      return response.data.leaderboard
    } catch (error) {
      console.warn("API request failed, using fallback leaderboard data:", error)

      // Apply filters to fallback data
      let filteredData = [...mockLeaderboardData]

      if (filters?.category && filters.category !== "all") {
        filteredData = filteredData.filter((user) =>
          user.skillCategories.some((skill) => skill.toLowerCase().includes(filters.category!.toLowerCase())),
        )
      }

      // Sort based on timeframe
      switch (filters?.timeframe) {
        case "weekly":
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
      if (filters?.limit) {
        filteredData = filteredData.slice(0, filters.limit)
      }

      return filteredData
    }
  }

  public async checkApiHealth(): Promise<boolean> {
    try {
      await this.api.get("/health")
      return true
    } catch {
      return false
    }
  }
}

const leaderboardService = new LeaderboardService()
export default leaderboardService

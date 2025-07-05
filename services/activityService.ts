import axios, { type AxiosInstance } from "axios"
import BASE_URL from "./baseUrl"

interface Activity {
  id: string
  type: "challenge_completed" | "badge_earned" | "challenge_submitted" | "user_joined" | "milestone_reached"
  userId: string
  username: string
  userAvatar: string
  challengeId?: string
  challengeTitle?: string
  badgeId?: string
  badgeName?: string
  description: string
  reward?: string
  timestamp: string
  metadata?: Record<string, any>
}

interface ActivitiesResponse {
  activities: Activity[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

// Mock activities for fallback
const mockActivities: Activity[] = [
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
]

class ActivityService {
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

  public async fetchActivities(filters?: {
    userId?: string
    type?: string
    limit?: number
    offset?: number
  }): Promise<Activity[]> {
    try {
      console.log("Fetching activities from API...")

      const params = new URLSearchParams()
      if (filters?.userId) params.append("userId", filters.userId)
      if (filters?.type) params.append("type", filters.type)
      if (filters?.limit) params.append("limit", filters.limit.toString())
      if (filters?.offset) params.append("offset", filters.offset.toString())

      const response = await this.api.get<ActivitiesResponse>(`/activities?${params.toString()}`)
      console.log(`Successfully fetched ${response.data.activities.length} activities from API`)

      return response.data.activities
    } catch (error) {
      console.warn("API request failed, using fallback activities:", error)

      // Apply filters to fallback data
      let filteredData = [...mockActivities]

      if (filters?.userId) {
        filteredData = filteredData.filter((activity) => activity.userId === filters.userId)
      }

      if (filters?.type) {
        filteredData = filteredData.filter((activity) => activity.type === filters.type)
      }

      // Apply pagination
      if (filters?.offset || filters?.limit) {
        const offset = filters.offset || 0
        const limit = filters.limit || filteredData.length
        filteredData = filteredData.slice(offset, offset + limit)
      }

      return filteredData
    }
  }

  public async createActivity(activityData: {
    type: Activity["type"]
    userId: string
    username: string
    description: string
    challengeId?: string
    challengeTitle?: string
    badgeId?: string
    badgeName?: string
    reward?: string
    metadata?: Record<string, any>
  }): Promise<Activity | null> {
    try {
      console.log("Creating new activity...")

      const response = await this.api.post<Activity>("/activities", activityData)
      console.log(`Successfully created activity: ${response.data.description}`)

      return response.data
    } catch (error) {
      console.error("Failed to create activity:", error)
      return null
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

const activityService = new ActivityService()
export default activityService

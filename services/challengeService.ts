import axios, { type AxiosInstance, type AxiosError } from "axios"
import BASE_URL from "./baseUrl"
import type { Challenge } from "@/types/challenges"
import { challengesData } from "@/lib/challenges-data"

interface ChallengesResponse {
  challenges: Challenge[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

class ChallengeService {
  private api: AxiosInstance
  private fallbackData: Challenge[] = challengesData

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Add response interceptor for better error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.warn("API request failed:", error.message)
        return Promise.reject(error)
      },
    )
  }

  public async fetchChallenges(filters?: {
    category?: string
    difficulty?: string
    status?: string
    limit?: number
    offset?: number
  }): Promise<Challenge[]> {
    try {
      console.log("Fetching challenges from API...")

      const params = new URLSearchParams()
      if (filters?.category) params.append("category", filters.category)
      if (filters?.difficulty) params.append("difficulty", filters.difficulty)
      if (filters?.status) params.append("status", filters.status)
      if (filters?.limit) params.append("limit", filters.limit.toString())
      if (filters?.offset) params.append("offset", filters.offset.toString())

      const response = await this.api.get<ChallengesResponse>(`/challenges?${params.toString()}`)
      console.log(`Successfully fetched ${response.data.challenges.length} challenges from API`)

      return response.data.challenges
    } catch (error) {
      console.warn("API request failed, using fallback data:", error)

      // Apply filters to fallback data
      let filteredData = [...this.fallbackData]

      if (filters?.category && filters.category !== "all") {
        filteredData = filteredData.filter((c) => c.category === filters.category)
      }

      if (filters?.difficulty) {
        filteredData = filteredData.filter((c) => c.difficulty === filters.difficulty)
      }

      if (filters?.status) {
        filteredData = filteredData.filter((c) => c.status === filters.status)
      }

      // Apply pagination to fallback data
      if (filters?.offset || filters?.limit) {
        const offset = filters.offset || 0
        const limit = filters.limit || filteredData.length
        filteredData = filteredData.slice(offset, offset + limit)
      }

      return filteredData
    }
  }

  public async fetchSingleChallenge(challengeId: string): Promise<Challenge | null> {
    try {
      console.log(`Fetching challenge ${challengeId} from API...`)

      const response = await this.api.get<Challenge>(`/challenges/${challengeId}`)
      console.log(`Successfully fetched challenge: ${response.data.title}`)

      return response.data
    } catch (error) {
      console.warn(`API request failed for challenge ${challengeId}, using fallback data:`, error)

      // Convert string ID to number for comparison with local data
      const numericId = Number.parseInt(challengeId, 10)

      // Use fallback data
      const localChallenge = this.fallbackData.find((challenge) => {
        return challenge.id === numericId || challenge.id === challengeId || challenge.id.toString() === challengeId
      })

      if (localChallenge) {
        console.log(`Found challenge locally:`, localChallenge.title)
        return localChallenge
      }

      console.warn(`Challenge with ID ${challengeId} not found`)
      return null
    }
  }

  public async createChallenge(challengeData: Partial<Challenge>): Promise<Challenge | null> {
    try {
      console.log("Creating new challenge...")

      const response = await this.api.post<Challenge>("/challenges", challengeData)
      console.log(`Successfully created challenge: ${response.data.title}`)

      return response.data
    } catch (error) {
      console.error("Failed to create challenge:", error)
      return null
    }
  }

  public async updateChallenge(challengeId: string, updates: Partial<Challenge>): Promise<Challenge | null> {
    try {
      console.log(`Updating challenge ${challengeId}...`)

      const response = await this.api.put<Challenge>(`/challenges/${challengeId}`, updates)
      console.log(`Successfully updated challenge: ${response.data.title}`)

      return response.data
    } catch (error) {
      console.error(`Failed to update challenge ${challengeId}:`, error)
      return null
    }
  }

  public async deleteChallenge(challengeId: string): Promise<boolean> {
    try {
      console.log(`Deleting challenge ${challengeId}...`)

      await this.api.delete(`/challenges/${challengeId}`)
      console.log(`Successfully deleted challenge ${challengeId}`)

      return true
    } catch (error) {
      console.error(`Failed to delete challenge ${challengeId}:`, error)
      return false
    }
  }

  // Method to check API health
  public async checkApiHealth(): Promise<boolean> {
    try {
      await this.api.get("/health")
      return true
    } catch {
      return false
    }
  }

  // Method to get all available challenge IDs
  public getAvailableChallengeIds(): string[] {
    return this.fallbackData.map((challenge) => challenge.id.toString())
  }
}

const challengeService = new ChallengeService()
export default challengeService

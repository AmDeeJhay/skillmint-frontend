import axios, { type AxiosInstance, type AxiosError } from "axios"
import BASE_URL from "./baseUrl"
import type { Challenge } from "@/types/challenges"
import { challengesData } from "@/lib/challenges-data"

class ChallengeService {
  private api: AxiosInstance
  private fallbackData: Challenge[] = challengesData

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 5000, // 5 second timeout
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

  public async fetchChallenges(): Promise<Challenge[]> {
    try {
      // Always return local data for now to avoid network issues
      console.log("Using local challenges data for reliable experience")
      return this.fallbackData
    } catch (error) {
      console.error("Unexpected error in fetchChallenges:", error)
      return this.fallbackData
    }
  }

  public async fetchSingleChallenge(challengeId: string): Promise<Challenge | null> {
    try {
      // Try to find in local data first
      const localChallenge = this.fallbackData.find((challenge) => challenge.id === challengeId)
      if (localChallenge) {
        return localChallenge
      }

      // If not found locally, try API
      const response = await this.api.get<Challenge>(`/challenges/${challengeId}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch challenge with ID ${challengeId}:`, error)
      // Return local challenge if available
      return this.fallbackData.find((challenge) => challenge.id === challengeId) || null
    }
  }

  // Method to check API health
  public async checkApiHealth(): Promise<boolean> {
    try {
      await this.api.get("/health", { timeout: 2000 })
      return true
    } catch {
      return false
    }
  }
}

const challengeService = new ChallengeService()
export default challengeService

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
      console.log(`Fetching challenge with ID: ${challengeId}`)

      // Convert string ID to number for comparison with local data
      const numericId = Number.parseInt(challengeId, 10)

      // Always use local data first to avoid network issues
      const localChallenge = this.fallbackData.find((challenge) => {
        // Handle both string and number ID comparisons
        return challenge.id === numericId || challenge.id === challengeId || challenge.id.toString() === challengeId
      })

      if (localChallenge) {
        console.log(`Found challenge locally:`, localChallenge.title)
        return localChallenge
      }

      console.warn(`Challenge with ID ${challengeId} not found in local data`)
      return null
    } catch (error) {
      console.error(`Failed to fetch challenge with ID ${challengeId}:`, error)

      // Fallback: try to find in local data even if there's an error
      const numericId = Number.parseInt(challengeId, 10)
      const fallbackChallenge = this.fallbackData.find(
        (challenge) => challenge.id === numericId || challenge.id.toString() === challengeId,
      )

      return fallbackChallenge || null
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

  // Method to get all available challenge IDs
  public getAvailableChallengeIds(): string[] {
    return this.fallbackData.map((challenge) => challenge.id.toString())
  }
}

const challengeService = new ChallengeService()
export default challengeService

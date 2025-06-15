import axios, { type AxiosInstance } from "axios"
import BASE_URL from "./baseUrl"
import type { Challenge } from "@/types/challenges"

class ChallengeService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async fetchChallenges(): Promise<Challenge[]> {
    try {
      const response = await this.api.get<Challenge[]>("/challenges", {
        timeout: 10000, // 10 second timeout
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          console.error("Request timeout - API server may be slow")
        } else if (error.response) {
          console.error("API Error:", error.response.status, error.response.data)
        } else if (error.request) {
          console.error("Network Error - API server may be unavailable")
        }
      }
      throw error
    }
  }
  public async fetchSingleChallenge(challengeId: string): Promise<Challenge> {
    try {
      const response = await this.api.get<Challenge>(`/challenges/${challengeId}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch challenge with ID ${challengeId}:`, error)
      throw error
    }
  }
}

const challengeService = new ChallengeService()
export default challengeService

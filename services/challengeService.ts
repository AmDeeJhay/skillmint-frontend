import axios, { AxiosInstance } from "axios";
import BASE_URL from "./baseUrl";
import { Challenge } from "@/types/challenges";

class ChallengeService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async fetchChallenges(): Promise<Challenge[]> {
    try {
      const response = await this.api.get<Challenge[]>("/challenges");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
      throw error;
    }
  }
  public async fetchSingleChallenge(challengeId: string): Promise<Challenge> {
    try {
      const response = await this.api.get<Challenge>(
        `/challenges/${challengeId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch challenge with ID ${challengeId}:`, error);
      throw error;
    }
  }
}

const challengeService = new ChallengeService();
export default challengeService;

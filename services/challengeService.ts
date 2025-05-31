import axios, { AxiosInstance } from 'axios';
import BASE_URL from './baseUrl';
import { Challenge } from '@/types/challenges';

class ChallengeService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async fetchChallenges(): Promise<Challenge[]> {
    try {
      const response = await this.api.get<Challenge[]>('/challenges');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
      throw error;
    }
  }

//   public async createChallenge(payload: CreateChallengePayload): Promise<Challenge> {
//     try {
//       const response = await this.api.post<Challenge>('/challenges', payload);
//       return response.data;
//     } catch (error) {
//       console.error('Failed to create challenge:', error);
//       throw error;
//     }
//   }
}

const challengeService = new ChallengeService();
export default challengeService;

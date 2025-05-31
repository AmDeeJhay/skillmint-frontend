import axios, { AxiosInstance } from "axios";
import BASE_URL from "./baseUrl";

class DashboardService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

   public async fetchUserData(userId:string) {
      try {
        const response = await this.api.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch userdata:", error);
        throw error;
      }
    }
}

const dashboardService = new DashboardService();
export default dashboardService;
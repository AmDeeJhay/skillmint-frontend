import axios from "axios";
import BASE_URL from "./baseUrl";

export const badgeService = {
  createBadge: (data: any) => axios.post(`${BASE_URL}/badges`, data),
  getAllBadges: () => axios.get(`${BASE_URL}/badges`),
  getBadgeById: (id: string) => axios.get(`${BASE_URL}/badges/${id}`),
  getBadgesByUser: (userId: string) => axios.get(`${BASE_URL}/badges/user/${userId}`),
  mintBadge: (data: any) => axios.post(`${BASE_URL}/badges/mint`, data),
  deleteBadge: (id: string) => axios.delete(`${BASE_URL}/badges/${id}`),
};

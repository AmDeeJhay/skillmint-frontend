import axios from "axios";
import BASE_URL from "./baseUrl";

export const userService = {
  createUser: (data: any) => axios.post(`${BASE_URL}/users`, data),
  getAllUsers: () => axios.get(`${BASE_URL}/users`),
  getUserById: (id: string) => axios.get(`${BASE_URL}/users/${id}`),
  getUserByWallet: (walletAddress: string) => axios.get(`${BASE_URL}/users/wallet/${walletAddress}`),
  updateUser: (id: string, data: any) => axios.patch(`${BASE_URL}/users/${id}`, data),
  deleteUser: (id: string) => axios.delete(`${BASE_URL}/users/${id}`),
};

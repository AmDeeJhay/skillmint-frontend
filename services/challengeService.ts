import axios from "axios";
import BASE_URL from "./baseUrl";

export const submissionService = {
  createSubmission: (data: any) => axios.post(`${BASE_URL}/submissions`, data),
  getAllSubmissions: () => axios.get(`${BASE_URL}/submissions`),
  getSubmissionById: (id: string) => axios.get(`${BASE_URL}/submissions/${id}`),
  getSubmissionsByChallenge: (challengeId: string) => axios.get(`${BASE_URL}/submissions/challenge/${challengeId}`),
  getSubmissionsByUser: (userId: string) => axios.get(`${BASE_URL}/submissions/user/${userId}`),
  updateSubmission: (id: string, data: any) => axios.patch(`${BASE_URL}/submissions/${id}`, data),
  deleteSubmission: (id: string) => axios.delete(`${BASE_URL}/submissions/${id}`),
};

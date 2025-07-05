import axios, { type AxiosInstance } from "axios"
import BASE_URL from "./baseUrl"

interface SubmissionFile {
  name: string
  url: string
}

interface Submission {
  id: string
  challengeId: string
  userId: string
  title: string
  description: string
  githubUrl?: string
  liveUrl?: string
  status: "pending" | "completed" | "rejected"
  score?: number
  feedback?: string
  submittedAt: string
  reviewedAt?: string
  reviewerId?: string
  files: SubmissionFile[]
}

interface SubmissionsResponse {
  submissions: Submission[]
  total: number
}

class SubmissionService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async fetchSubmissions(filters?: {
    challengeId?: string
    userId?: string
    status?: string
  }): Promise<Submission[]> {
    try {
      console.log("Fetching submissions from API...")

      const params = new URLSearchParams()
      if (filters?.challengeId) params.append("challengeId", filters.challengeId)
      if (filters?.userId) params.append("userId", filters.userId)
      if (filters?.status) params.append("status", filters.status)

      const response = await this.api.get<SubmissionsResponse>(`/submissions?${params.toString()}`)
      console.log(`Successfully fetched ${response.data.submissions.length} submissions from API`)

      return response.data.submissions
    } catch (error) {
      console.warn("API request failed for submissions:", error)
      return []
    }
  }

  public async createSubmission(submissionData: {
    challengeId: string
    userId: string
    title: string
    description: string
    githubUrl?: string
    liveUrl?: string
    files?: SubmissionFile[]
  }): Promise<Submission | null> {
    try {
      console.log("Creating new submission...")

      const response = await this.api.post<Submission>("/submissions", submissionData)
      console.log(`Successfully created submission: ${response.data.title}`)

      return response.data
    } catch (error) {
      console.error("Failed to create submission:", error)
      return null
    }
  }

  public async checkApiHealth(): Promise<boolean> {
    try {
      await this.api.get("/health")
      return true
    } catch {
      return false
    }
  }
}

const submissionService = new SubmissionService()
export default submissionService

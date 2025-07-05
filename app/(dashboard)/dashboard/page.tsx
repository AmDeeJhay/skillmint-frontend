"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, CheckCircle, Code, FileText, Paintbrush, Zap, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import RecentActivities from "@/components/dashboard/recent-activities"
import RecentEarners from "@/components/dashboard/recent-earners"
import { useEffect, useState } from "react"
import dashboardService from "@/services/dashboardService"
import useUIStore from "@/store/useUIStore"
import type { Challenge } from "@/types/challenges"
import { WalletGuard } from "@/components/wallet-guard"

interface BadgeType {
  id: string
  name: string
  description: string
  earnedAt: string
}

interface Submission {
  id: string
  challengeId: string
  status: string
  submittedAt: string
}

interface UserData {
  id: string
  walletAddress: string
  username: string
  email: string
  profileImage: string
  bio: string
  skillCategories: string[]
  totalEarnings: string
  reputation: number
  createdAt: string
  updatedAt: string
  badges: BadgeType[]
  submissions: Submission[]
  createdChallenges: Challenge[]
}

const formatCurrency = (amount: string) => {
  return `${Number.parseFloat(amount).toFixed(2)} ADA`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "frontend":
      return <Paintbrush className="h-4 w-4" />
    case "backend":
      return <Code className="h-4 w-4" />
    case "blockchain":
      return <Zap className="h-4 w-4" />
    case "smart_contracts":
      return <Code className="h-4 w-4" />
    case "devops":
      return <FileText className="h-4 w-4" />
    default:
      return <Code className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "frontend":
      return { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400" }
    case "backend":
      return { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" }
    case "blockchain":
      return { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" }
    case "smart_contracts":
      return { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-600 dark:text-yellow-400" }
    case "devops":
      return { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" }
    default:
      return { bg: "bg-gray-100 dark:bg-gray-900/30", text: "text-gray-600 dark:text-gray-400" }
  }
}

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "default"
    case "intermediate":
      return "secondary"
    case "advanced":
      return "destructive"
    default:
      return "outline"
  }
}

function DashboardContent() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const { loading, setLoading, setError, error } = useUIStore()

  const userId = "27c9db93-a9eb-452c-a9a6-e045da5b24f6"

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await dashboardService.fetchUserData(userId)
        setUserData(data)
      } catch (err) {
        console.error("Error loading user data:", err)
        setError("Failed to load user data")

        try {
          const mockData = dashboardService.getMockUserData()
          setUserData(mockData)
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [setLoading, setError])

  if (loading) {
    return (
      <div className="space-y-4 p-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mt-2 animate-pulse"></div>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!loading && (error || !userData)) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-sm">Error: {error || "Failed to load user data"}</p>
          <Button onClick={() => window.location.reload()} size="sm">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const activeChallenges = userData?.createdChallenges
    .filter((challenge) => challenge.status !== "completed")
    .slice(0, 3)

  const completedSubmissions = userData?.submissions.filter((sub) => sub.status === "completed")

  const stats = [
    {
      title: "Completed",
      value: Array.isArray(completedSubmissions) ? completedSubmissions.length.toString() : "0",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      change: Array.isArray(completedSubmissions)
        ? `+${
            completedSubmissions.filter((sub) => {
              const submissionDate = new Date(sub?.submittedAt ?? 0)
              const oneMonthAgo = new Date()
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
              return submissionDate > oneMonthAgo
            }).length
          } this month`
        : "0 this month",
      trend: "up" as const,
    },
    {
      title: "Total Earned",
      value: formatCurrency(userData?.totalEarnings ?? "0"),
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      change: "View all",
      trend: "neutral" as const,
    },
    {
      title: "NFT Badges",
      value: Array.isArray(userData?.badges) ? userData.badges.length.toString() : "0",
      icon: <Award className="h-4 w-4 text-purple-500" />,
      change: Array.isArray(userData?.badges) ? `${userData.badges.length} earned` : "0 earned",
      trend: "up" as const,
    },
    {
      title: "Active",
      value: Array.isArray(activeChallenges) ? activeChallenges.length.toString() : "0",
      icon: <Code className="h-4 w-4 text-blue-500" />,
      change: (() => {
        if (!Array.isArray(activeChallenges)) return "On track"
        const upcomingCount = activeChallenges.filter(
          (c) => c.deadline && new Date(c.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ).length
        return upcomingCount > 0 ? `${upcomingCount} due soon` : "On track"
      })(),
      trend: "neutral" as const,
    },
  ]

  return (
    <div className="space-y-4 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {userData?.username}! Track your progress.
          </p>
        </div>
        <Link href="/challenges">
          <Button className="bg-teal-600 hover:bg-teal-700 text-sm" size="sm">
            Browse Challenges
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{stat.title}</h3>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active" className="text-xs">
                Active
              </TabsTrigger>
              <TabsTrigger value="created" className="text-xs">
                Created
              </TabsTrigger>
              <TabsTrigger value="badges" className="text-xs">
                Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your Active Challenges</CardTitle>
                  <CardDescription className="text-sm">Challenges you're currently working on.</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeChallenges?.length === 0 ? (
                    <div className="text-center py-6">
                      <Code className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No active challenges yet.</p>
                      <Link href="/challenges">
                        <Button className="mt-3 bg-teal-600 hover:bg-teal-700" size="sm">
                          Browse Challenges
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeChallenges?.map((challenge) => {
                        const categoryColors = getCategoryColor(challenge.category)
                        return (
                          <motion.div
                            key={challenge.id}
                            whileHover={{ x: 5 }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg ${categoryColors.bg} flex items-center justify-center`}
                              >
                                <div className={categoryColors.text}>{getCategoryIcon(challenge.category)}</div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-sm truncate">{challenge.title}</h3>
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    {challenge.category.replace("_", " ")}
                                  </Badge>
                                  <Badge
                                    variant={getDifficultyVariant(challenge.difficulty)}
                                    className="text-xs px-1 py-0"
                                  >
                                    {challenge.difficulty}
                                  </Badge>
                                  <div className="flex items-center text-yellow-500 space-x-1">
                                    <Zap className="h-3 w-3" />
                                    <span className="text-xs font-medium">{formatCurrency(challenge?.reward)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    {challenge.status}
                                  </Badge>
                                  {challenge.deadline && (
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>Due {formatDate(challenge.deadline)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/challenges/${challenge.id}`}>
                                <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/challenges/${challenge.id}/submit`}>
                                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs px-2 py-1">
                                  Submit
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="created" className="mt-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Created Challenges</CardTitle>
                  <CardDescription className="text-sm">Challenges you've created for the community.</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData?.createdChallenges.length === 0 ? (
                    <div className="text-center py-6">
                      <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">You haven't created any challenges yet.</p>
                      <Link href="/challenges/create">
                        <Button className="mt-3 bg-teal-600 hover:bg-teal-700" size="sm">
                          Create Challenge
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userData?.createdChallenges.map((challenge) => {
                        const categoryColors = getCategoryColor(challenge.category)
                        return (
                          <div key={challenge.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            <div className={`w-8 h-8 rounded-lg ${categoryColors.bg} flex items-center justify-center`}>
                              <div className={categoryColors.text}>{getCategoryIcon(challenge.category)}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-sm truncate">{challenge.title}</h3>
                                <div className="flex items-center gap-1">
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    {challenge.status}
                                  </Badge>
                                  <Badge
                                    variant={getDifficultyVariant(challenge.difficulty)}
                                    className="text-xs px-1 py-0"
                                  >
                                    {challenge.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {challenge.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Created {formatDate(challenge.createdAt)}
                                </span>
                                <div className="flex items-center text-yellow-500 space-x-1">
                                  <Zap className="h-3 w-3" />
                                  <span className="text-xs font-medium">{formatCurrency(challenge?.reward)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="mt-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your NFT Badges</CardTitle>
                  <CardDescription className="text-sm">
                    Skill badges you've earned by completing challenges.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userData?.badges.length === 0 ? (
                    <div className="text-center py-6">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No badges earned yet.</p>
                      <p className="text-xs text-gray-400 mt-1">Complete challenges to earn skill badges!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {userData?.badges.map((badge) => (
                        <Card
                          key={badge.id}
                          className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <h3 className="font-medium text-sm">{badge.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Earned {formatDate(badge.earnedAt)}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {badge.description}
                              </p>
                              <Button variant="outline" size="sm" className="mt-3 text-xs px-2 py-1">
                                View on Chain
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <RecentActivities />
          <RecentEarners />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <WalletGuard message="Connect your wallet to access your personalized dashboard and track your progress.">
      <DashboardContent />
    </WalletGuard>
  )
}

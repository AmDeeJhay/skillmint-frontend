"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, CheckCircle, Clock, Code, FileText, Paintbrush, Zap, User, Trophy } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import RecentActivities from "@/components/dashboard/recent-activities"
import RecentEarners from "@/components/dashboard/recent-earners"
import { useEffect, useState } from "react"
import dashboardService from "@/services/dashboardService"
import useUIStore from "@/store/useUIStore"
import { Challenge } from "@/types/challenges"



interface Badge {
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
  badges: Badge[]
  submissions: Submission[]
  createdChallenges: Challenge[]
}

const formatCurrency = (amount: string) => {
  return `${parseFloat(amount).toFixed(2)} ADA`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Paintbrush className="h-5 w-5" />
    case 'backend':
      return <Code className="h-5 w-5" />
    case 'blockchain':
      return <Zap className="h-5 w-5" />
    case 'smart_contracts':
      return <Code className="h-5 w-5" />
    case 'devops':
      return <FileText className="h-5 w-5" />
    default:
      return <Code className="h-5 w-5" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400' }
    case 'backend':
      return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' }
    case 'blockchain':
      return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' }
    case 'smart_contracts':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400' }
    case 'devops':
      return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' }
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-600 dark:text-gray-400' }
  }
}

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'default'
    case 'intermediate':
      return 'secondary'
    case 'advanced':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const { loading,setLoading, setError, error } = useUIStore();

  const userId = "27c9db93-a9eb-452c-a9a6-e045da5b24f6"
  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);          
      setError(null);           
      try {
        const data = await dashboardService.fetchUserData(userId);
        setUserData(data);
      } catch (err) {
        console.error("Error loading challenges:", err);
      } finally {
        setLoading(false);       
      }
    };

    loadChallenges();
  }, [setLoading, setError]);
 

 

  if (!loading && (error || !userData)) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error || 'Failed to load user data'}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  const activeChallenges = userData?.createdChallenges
    .filter(challenge => challenge.status !== 'completed')
    .slice(0, 3)

  const completedSubmissions = userData?.submissions.filter(sub => sub.status === 'completed')

  const stats = [
    {
      title: "Challenges Completed",
      value: Array.isArray(completedSubmissions)
        ? completedSubmissions.length.toString()
        : "0",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      change: Array.isArray(completedSubmissions)
        ? `+${completedSubmissions.filter((sub) => {
            const submissionDate = new Date(sub?.submittedAt ?? 0)
            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
            return submissionDate > oneMonthAgo
          }).length} this month`
        : "0 this month",
      trend: "up" as const,
    },
    {
      title: "Total Earned",
      value: formatCurrency(userData?.totalEarnings ?? "0"),
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      change: "View transactions",
      trend: "neutral" as const,
    },
    {
      title: "NFT Badges",
      value: Array.isArray(userData?.badges)
        ? userData.badges.length.toString()
        : "0",
      icon: <Award className="h-5 w-5 text-purple-500" />,
      change: Array.isArray(userData?.badges)
        ? `${userData.badges.length} earned`
        : "0 earned",
      trend: "up" as const,
    },
    {
      title: "Active Challenges",
      value: Array.isArray(activeChallenges)
        ? activeChallenges.length.toString()
        : "0",
      icon: <Code className="h-5 w-5 text-blue-500" />,
      change: (() => {
        if (!Array.isArray(activeChallenges)) return "On track"
        const upcomingCount = activeChallenges.filter(
          (c) =>
            c.deadline &&
            new Date(c.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ).length
        return upcomingCount > 0 ? `${upcomingCount} due soon` : "On track"
      })(),
      trend: "neutral" as const,
    },
  ]  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, {userData?.username}! Track your progress and find new challenges.
              </p>
            </div>
            <Link href="/challenges">
              <Button className="bg-teal-600 hover:bg-teal-700">Browse Challenges</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : stat.trend === "down"
                              ? "text-red-500"
                              : "text-gray-500"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="w-full">
                <TabsList>
                  <TabsTrigger value="active">Active Challenges</TabsTrigger>
                  <TabsTrigger value="created">Created Challenges</TabsTrigger>
                  <TabsTrigger value="badges">NFT Badges</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Active Challenges</CardTitle>
                      <CardDescription>Challenges you're currently working on.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeChallenges?.length === 0 ? (
                        <div className="text-center py-8">
                          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No active challenges yet.</p>
                          <Link href="/challenges">
                            <Button className="mt-4 bg-teal-600 hover:bg-teal-700">
                              Browse Challenges
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {activeChallenges?.map((challenge) => {
                            const categoryColors = getCategoryColor(challenge.category)
                            return (
                              <motion.div
                                key={challenge.id}
                                whileHover={{ x: 5 }}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full ${categoryColors.bg} flex items-center justify-center`}>
                                    <div className={categoryColors.text}>
                                      {getCategoryIcon(challenge.category)}
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{challenge.title}</h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                      <Badge variant="outline" className="capitalize">
                                        {challenge.category.replace('_', ' ')}
                                      </Badge>
                                      <Badge variant={getDifficultyVariant(challenge.difficulty)} className="capitalize">
                                        {challenge.difficulty}
                                      </Badge>
                                      <div className="flex items-center text-yellow-500 space-x-1">
                                        <Zap className="h-3.5 w-3.5" />
                                        <span className="text-xs font-medium">{formatCurrency(challenge?.reward)}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                        <Badge variant="outline" className="text-xs">
                                          {challenge.status}
                                        </Badge>
                                      </div>
                                      {challenge.deadline && (
                                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                          <Calendar className="h-3.5 w-3.5 mr-1" />
                                          <span>Due {formatDate(challenge.deadline)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Link href={`/challenges/${challenge.id}`}>
                                    <Button size="sm" variant="outline">
                                      View Details
                                    </Button>
                                  </Link>
                                  <Link href={`/challenges/${challenge.id}/submit`}>
                                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Created Challenges</CardTitle>
                      <CardDescription>Challenges you've created for the community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData?.createdChallenges.length === 0 ? (
                        <div className="text-center py-8">
                          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">You haven't created any challenges yet.</p>
                          <Link href="/challenges/create">
                            <Button className="mt-4 bg-teal-600 hover:bg-teal-700">
                              Create Challenge
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userData?.createdChallenges.map((challenge) => {
                            const categoryColors = getCategoryColor(challenge.category)
                            return (
                              <div key={challenge.id} className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full ${categoryColors.bg} flex items-center justify-center`}>
                                  <div className={categoryColors.text}>
                                    {getCategoryIcon(challenge.category)}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{challenge.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="capitalize">
                                        {challenge.status}
                                      </Badge>
                                      <Badge variant={getDifficultyVariant(challenge.difficulty)} className="capitalize">
                                        {challenge.difficulty}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {challenge.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      Created on {formatDate(challenge.createdAt)}
                                    </span>
                                    <div className="flex items-center text-yellow-500 space-x-1">
                                      <Zap className="h-3.5 w-3.5" />
                                      <span className="text-sm font-medium">{formatCurrency(challenge?.reward)}</span>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Your NFT Badges</CardTitle>
                      <CardDescription>Skill badges you've earned by completing challenges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData?.badges.length === 0 ? (
                        <div className="text-center py-8">
                          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No badges earned yet.</p>
                          <p className="text-sm text-gray-400 mt-2">
                            Complete challenges to earn skill badges!
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {userData?.badges.map((badge) => (
                            <Card key={badge.id} className="overflow-hidden">
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                    <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <h3 className="font-medium">{badge.name}</h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Earned on {formatDate(badge.earnedAt)}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    {badge.description}
                                  </p>
                                  <Button variant="outline" size="sm" className="mt-4">
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
            <div className="space-y-6">
              <RecentActivities />
              <RecentEarners />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
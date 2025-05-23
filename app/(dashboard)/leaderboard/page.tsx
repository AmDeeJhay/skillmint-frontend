"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Zap, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  const topEarners = [
    {
      rank: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      earnings: "5,250 ADA",
      challenges: 24,
      badge: "Expert",
    },
    {
      rank: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      earnings: "4,180 ADA",
      challenges: 19,
      badge: "Advanced",
    },
    {
      rank: 3,
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      earnings: "3,920 ADA",
      challenges: 17,
      badge: "Advanced",
    },
    {
      rank: 4,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      earnings: "3,450 ADA",
      challenges: 15,
      badge: "Intermediate",
    },
    {
      rank: 5,
      name: "Eva Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      earnings: "3,200 ADA",
      challenges: 14,
      badge: "Advanced",
    },
  ]

  const topPerformers = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      successRate: "95%",
      challenges: 20,
      avgRating: 4.9,
    },
    {
      rank: 2,
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      successRate: "92%",
      challenges: 18,
      avgRating: 4.8,
    },
    {
      rank: 3,
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      successRate: "90%",
      challenges: 16,
      avgRating: 4.7,
    },
  ]

  const recentWinners = [
    {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      challenge: "Build a DEX Order Book",
      reward: "250 ADA",
      time: "2 hours ago",
    },
    {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      challenge: "Design Mobile Wallet UI",
      reward: "150 ADA",
      time: "4 hours ago",
    },
    {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      challenge: "Smart Contract Audit",
      reward: "300 ADA",
      time: "6 hours ago",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-gray-500">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Expert":
        return "bg-purple-100 text-purple-800"
      case "Advanced":
        return "bg-blue-100 text-blue-800"
      case "Intermediate":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
            See who's leading the way in skill verification and earning rewards on SkillMint.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topEarners.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
            >
              <Card className={`text-center ${index === 0 ? "ring-2 ring-yellow-500" : ""}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{getRankIcon(user.rank)}</div>
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-2">{user.name}</h3>
                  <Badge className={getBadgeColor(user.badge)}>{user.badge}</Badge>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{user.earnings}</span>
                    </div>
                    <div className="text-sm text-gray-500">{user.challenges} challenges completed</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="earnings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earnings">Top Earners</TabsTrigger>
            <TabsTrigger value="performance">Top Performers</TabsTrigger>
            <TabsTrigger value="recent">Recent Winners</TabsTrigger>
          </TabsList>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Earners This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEarners.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.challenges} challenges</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getBadgeColor(user.badge)}>{user.badge}</Badge>
                        <div className="text-right">
                          <div className="font-semibold">{user.earnings}</div>
                          <div className="text-sm text-gray-500">Total earned</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Performers by Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.challenges} challenges</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{user.successRate}</div>
                          <div className="text-xs text-gray-500">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{user.avgRating}</span>
                          </div>
                          <div className="text-xs text-gray-500">Avg Rating</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Challenge Winners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWinners.map((winner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={winner.avatar || "/placeholder.svg"} alt={winner.name} />
                          <AvatarFallback>
                            {winner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{winner.name}</div>
                          <div className="text-sm text-gray-500">{winner.challenge}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{winner.reward}</span>
                        </div>
                        <div className="text-sm text-gray-500">{winner.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

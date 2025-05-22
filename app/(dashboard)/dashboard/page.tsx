"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, CheckCircle, Clock, Code, FileText, Paintbrush, Zap } from "lucide-react"
import Link from "next/link"
import { challengesData } from "@/lib/challenges-data"
import { motion } from "framer-motion"
import RecentActivities from "@/components/dashboard/recent-activities"
import RecentEarners from "@/components/dashboard/recent-earners"

export default function DashboardPage() {
  // Get the first 3 challenges for the active challenges section
  const activeChallenges = challengesData.slice(0, 3)

  // Stats for the dashboard
  const stats = [
    {
      title: "Challenges Completed",
      value: "3",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      change: "+2 this month",
      trend: "up",
    },
    {
      title: "Total Earned",
      value: "500 ADA",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      change: "+150 ADA this month",
      trend: "up",
    },
    {
      title: "NFT Badges",
      value: "3",
      icon: <Award className="h-5 w-5 text-purple-500" />,
      change: "+1 this month",
      trend: "up",
    },
    {
      title: "Active Challenges",
      value: "2",
      icon: <Code className="h-5 w-5 text-blue-500" />,
      change: "1 due soon",
      trend: "neutral",
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
                Welcome back, John! Track your progress and find new challenges.
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
                  <TabsTrigger value="completed">Completed Challenges</TabsTrigger>
                  <TabsTrigger value="badges">NFT Badges</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Active Challenges</CardTitle>
                      <CardDescription>Challenges you're currently working on.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {activeChallenges.map((challenge) => (
                          <motion.div
                            key={challenge.id}
                            whileHover={{ x: 5 }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}
                              >
                                <div className={challenge.color}>{challenge.icon}</div>
                              </div>
                              <div>
                                <h3 className="font-medium">{challenge.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                  <Badge variant="outline">{challenge.category}</Badge>
                                  <div className="flex items-center text-yellow-500 space-x-1">
                                    <Zap className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium">{challenge.reward} ADA</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    <span>{challenge.duration}</span>
                                  </div>
                                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    <span>Due {challenge.deadline}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/challenges/${challenge.id}`}>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </Link>
                              <Link href={`/challenges/${challenge.id}`}>
                                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                  Submit
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Challenges</CardTitle>
                      <CardDescription>Challenges you've successfully completed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Build a DEX Order Book on Cardano</h3>
                              <Badge variant="outline">Development</Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Completed on May 15, 2023
                              </span>
                              <div className="flex items-center text-yellow-500 space-x-1">
                                <Zap className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">250 ADA</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Paintbrush className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Design a DeFi Dashboard UI</h3>
                              <Badge variant="outline">Design</Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Completed on April 22, 2023
                              </span>
                              <div className="flex items-center text-yellow-500 space-x-1">
                                <Zap className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">150 ADA</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Write a Technical Guide on NFT Minting</h3>
                              <Badge variant="outline">Content</Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Completed on March 10, 2023
                              </span>
                              <div className="flex items-center text-yellow-500 space-x-1">
                                <Zap className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">100 ADA</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                              </div>
                              <h3 className="font-medium">Smart Contract Developer</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned on May 15, 2023</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Awarded for completing 5 smart contract challenges
                              </p>
                              <Button variant="outline" size="sm" className="mt-4">
                                View on Chain
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                              </div>
                              <h3 className="font-medium">UI Designer</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned on April 22, 2023</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Awarded for completing 3 UI design challenges
                              </p>
                              <Button variant="outline" size="sm" className="mt-4">
                                View on Chain
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                              </div>
                              <h3 className="font-medium">Technical Writer</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned on March 10, 2023</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Awarded for completing 2 technical writing challenges
                              </p>
                              <Button variant="outline" size="sm" className="mt-4">
                                View on Chain
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
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

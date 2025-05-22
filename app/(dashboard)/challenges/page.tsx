"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Filter, Search, Zap } from "lucide-react"
import { challengesData } from "@/lib/challenges-data"
import { motion } from "framer-motion"

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter challenges based on search term and current tab
  const filteredChallenges = challengesData.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = currentTab === "all" || challenge.category.toLowerCase() === currentTab.toLowerCase()
    return matchesSearch && matchesTab
  })

  // Sort challenges based on selected sort option
  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "reward-high":
        return Number.parseInt(b.reward) - Number.parseInt(a.reward)
      case "reward-low":
        return Number.parseInt(a.reward) - Number.parseInt(b.reward)
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:py-12 mx-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Challenges</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px]">
            Browse and complete challenges to earn rewards and build your on-chain skill portfolio.
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-800 overflow-x-auto">
                <TabsTrigger value="all">All Challenges</TabsTrigger>
                <TabsTrigger value="Development">Development</TabsTrigger>
                <TabsTrigger value="Design">Design</TabsTrigger>
                <TabsTrigger value="Content">Content</TabsTrigger>
                <TabsTrigger value="Healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="Agriculture">Agriculture</TabsTrigger>
                <TabsTrigger value="Security">Security</TabsTrigger>
              </TabsList>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search challenges..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="reward-high">Highest Reward</SelectItem>
                      <SelectItem value="reward-low">Lowest Reward</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}
                          >
                            <div className={challenge.color}>{challenge.icon}</div>
                          </div>
                          <Badge variant="outline" className="font-normal">
                            {challenge.category}
                          </Badge>
                        </div>
                        <CardTitle className="mt-4">{challenge.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {challenge.difficulty}
                          </Badge>
                          <div className="flex items-center text-yellow-500 space-x-1">
                            <Zap className="h-3.5 w-3.5" />
                            <span className="text-sm font-medium">{challenge.reward} ADA</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{challenge.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Due {challenge.deadline}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-auto">
                        <div className="flex gap-2 w-full">
                          <Link href={`/challenges/${challenge.id}`} className="w-full">
                            <Button size="sm" variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/challenges/${challenge.id}`} className="w-full">
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 w-full">
                              Accept Challenge
                            </Button>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {sortedChallenges.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No challenges found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setCurrentTab("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Category-specific tabs */}
            {["Development", "Design", "Content", "Healthcare", "Agriculture", "Security"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedChallenges
                    .filter((challenge) => challenge.category === category)
                    .map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="overflow-hidden h-full flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div
                                className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}
                              >
                                <div className={challenge.color}>{challenge.icon}</div>
                              </div>
                              <Badge variant="outline" className="font-normal">
                                {challenge.category}
                              </Badge>
                            </div>
                            <CardTitle className="mt-4">{challenge.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {challenge.difficulty}
                              </Badge>
                              <div className="flex items-center text-yellow-500 space-x-1">
                                <Zap className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">{challenge.reward} ADA</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{challenge.duration}</span>
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>Due {challenge.deadline}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-auto">
                            <div className="flex gap-2 w-full">
                              <Link href={`/challenges/${challenge.id}`} className="w-full">
                                <Button size="sm" variant="outline" className="w-full">
                                  View Details
                                </Button>
                              </Link>
                              <Link href={`/challenges/${challenge.id}`} className="w-full">
                                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 w-full">
                                  Accept Challenge
                                </Button>
                              </Link>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

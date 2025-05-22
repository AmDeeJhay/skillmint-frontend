import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Code, FileText, Paintbrush, Zap } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const topUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "@alice",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 1250,
      completedChallenges: 12,
      badges: 8,
      topSkill: "Smart Contract Development",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "@bobsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 980,
      completedChallenges: 9,
      badges: 6,
      topSkill: "UI/UX Design",
    },
    {
      id: 3,
      name: "Charlie Brown",
      username: "@charlie",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 850,
      completedChallenges: 8,
      badges: 5,
      topSkill: "Technical Writing",
    },
    {
      id: 4,
      name: "Diana Prince",
      username: "@diana",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 720,
      completedChallenges: 7,
      badges: 4,
      topSkill: "Frontend Development",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      username: "@ethan",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 650,
      completedChallenges: 6,
      badges: 4,
      topSkill: "Blockchain Architecture",
    },
    {
      id: 6,
      name: "Fiona Gallagher",
      username: "@fiona",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 580,
      completedChallenges: 5,
      badges: 3,
      topSkill: "Smart Contract Development",
    },
    {
      id: 7,
      name: "George Miller",
      username: "@george",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 520,
      completedChallenges: 5,
      badges: 3,
      topSkill: "UI/UX Design",
    },
    {
      id: 8,
      name: "Hannah Baker",
      username: "@hannah",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 480,
      completedChallenges: 4,
      badges: 2,
      topSkill: "Technical Writing",
    },
    {
      id: 9,
      name: "Ian Malcolm",
      username: "@ian",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 420,
      completedChallenges: 4,
      badges: 2,
      topSkill: "Frontend Development",
    },
    {
      id: 10,
      name: "Julia Roberts",
      username: "@julia",
      avatar: "/placeholder.svg?height=40&width=40",
      earned: 380,
      completedChallenges: 3,
      badges: 2,
      topSkill: "Blockchain Architecture",
    },
  ]

  const topChallenges = [
    {
      id: 1,
      title: "Build a DEX Order Book on Cardano",
      category: "Development",
      submissionCount: 24,
      reward: "250 ADA",
      icon: <Code className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Design a DeFi Dashboard UI",
      category: "Design",
      submissionCount: 42,
      reward: "150 ADA",
      icon: <Paintbrush className="h-5 w-5" />,
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
      id: 3,
      title: "Write a Technical Guide on NFT Minting",
      category: "Content",
      submissionCount: 18,
      reward: "100 ADA",
      icon: <FileText className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      title: "Implement a Cardano Wallet Connector",
      category: "Development",
      submissionCount: 15,
      reward: "200 ADA",
      icon: <Code className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 5,
      title: "Create an Educational Infographic on Cardano",
      category: "Design",
      submissionCount: 31,
      reward: "120 ADA",
      icon: <Paintbrush className="h-5 w-5" />,
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Discover the top performers and most popular challenges on SkillMint.
          </p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="users">Top Users</TabsTrigger>
            <TabsTrigger value="challenges">Popular Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <CardDescription>Users who have earned the most rewards on SkillMint.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-2 font-medium">Rank</th>
                        <th className="text-left py-4 px-2 font-medium">User</th>
                        <th className="text-left py-4 px-2 font-medium">Earned</th>
                        <th className="text-left py-4 px-2 font-medium hidden md:table-cell">Challenges</th>
                        <th className="text-left py-4 px-2 font-medium hidden md:table-cell">Badges</th>
                        <th className="text-left py-4 px-2 font-medium hidden lg:table-cell">Top Skill</th>
                        <th className="text-right py-4 px-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {topUsers.map((user, index) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-4 px-2">
                            {index === 0 ? (
                              <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold">
                                1
                              </div>
                            ) : index === 1 ? (
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                                2
                              </div>
                            ) : index === 2 ? (
                              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                                3
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-500 font-medium">
                                {index + 1}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center text-yellow-500">
                              <Zap className="h-4 w-4 mr-1" />
                              <span className="font-medium">{user.earned} ADA</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 hidden md:table-cell">{user.completedChallenges}</td>
                          <td className="py-4 px-2 hidden md:table-cell">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                              <span>{user.badges}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 hidden lg:table-cell">
                            <Badge variant="outline">{user.topSkill}</Badge>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <Button variant="ghost" size="sm" className="text-teal-600 dark:text-teal-400">
                              View Profile
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges">
            <Card>
              <CardHeader>
                <CardTitle>Popular Challenges</CardTitle>
                <CardDescription>The most popular challenges based on number of submissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topChallenges.map((challenge, index) => (
                    <div key={challenge.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {index === 0 ? (
                          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold">
                            1
                          </div>
                        ) : index === 1 ? (
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                            2
                          </div>
                        ) : index === 2 ? (
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                            3
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-500 font-medium">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{challenge.title}</h3>
                              <Badge variant="outline">{challenge.category}</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {challenge.submissionCount} submissions
                              </span>
                              <div className="flex items-center text-yellow-500 space-x-1">
                                <Zap className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">{challenge.reward}</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/challenges/${challenge.id}`}>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 mt-2 md:mt-0">
                              View Challenge
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

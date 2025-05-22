import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Code, ExternalLink, FileText, Github, Paintbrush, Twitter, Zap } from "lucide-react"

export default function ProfilePage() {
  const skills = [
    { name: "Smart Contract Development", level: "Advanced", category: "Development" },
    { name: "UI/UX Design", level: "Intermediate", category: "Design" },
    { name: "Technical Writing", level: "Intermediate", category: "Content" },
    { name: "Frontend Development", level: "Advanced", category: "Development" },
    { name: "Blockchain Architecture", level: "Intermediate", category: "Development" },
  ]

  const completedChallenges = [
    {
      id: 1,
      title: "Build a DEX Order Book on Cardano",
      category: "Development",
      reward: "250 ADA",
      date: "May 15, 2023",
      icon: <Code className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Design a DeFi Dashboard UI",
      category: "Design",
      reward: "150 ADA",
      date: "April 22, 2023",
      icon: <Paintbrush className="h-5 w-5" />,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      title: "Write a Technical Guide on NFT Minting",
      category: "Content",
      reward: "100 ADA",
      date: "March 10, 2023",
      icon: <FileText className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ]

  const skillBadges = [
    {
      id: 1,
      name: "Smart Contract Developer",
      image: "/placeholder.svg?height=80&width=80",
      date: "May 15, 2023",
      description: "Awarded for completing 5 smart contract challenges",
    },
    {
      id: 2,
      name: "UI Designer",
      image: "/placeholder.svg?height=80&width=80",
      date: "April 22, 2023",
      description: "Awarded for completing 3 UI design challenges",
    },
    {
      id: 3,
      name: "Technical Writer",
      image: "/placeholder.svg?height=80&width=80",
      date: "March 10, 2023",
      description: "Awarded for completing 2 technical writing challenges",
    },
  ]

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">@johndoe</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                      500 ADA earned
                    </span>
                  </div>
                  <div className="mt-4 w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Blockchain developer and designer with a passion for building decentralized applications on Cardano.
                  Focused on creating user-friendly interfaces for DeFi projects.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Github className="h-4 w-4" />
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      github.com/johndoe
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Twitter className="h-4 w-4" />
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      twitter.com/johndoe
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4" />
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      johndoe.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.name}</span>
                      </div>
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="challenges">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="challenges">Completed Challenges</TabsTrigger>
              <TabsTrigger value="badges">Skill NFT Badges</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="challenges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Challenges</CardTitle>
                  <CardDescription>Challenges you've successfully completed on SkillMint.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {completedChallenges.map((challenge) => (
                      <div key={challenge.id} className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <div className={challenge.color}>{challenge.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{challenge.title}</h3>
                            <Badge variant="outline">{challenge.category}</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Completed on {challenge.date}
                            </span>
                            <div className="flex items-center text-yellow-500 space-x-1">
                              <Zap className="h-3.5 w-3.5" />
                              <span className="text-sm font-medium">{challenge.reward}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="badges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill NFT Badges</CardTitle>
                  <CardDescription>NFT badges you've earned by completing challenges on SkillMint.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skillBadges.map((badge) => (
                      <Card key={badge.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                              <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="font-medium">{badge.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned on {badge.date}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{badge.description}</p>
                            <Button variant="outline" size="sm" className="mt-4">
                              View on Chain
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Stats</CardTitle>
                  <CardDescription>Your activity and achievements on SkillMint.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                            <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-2xl font-bold">3</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Challenges Completed</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4">
                            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <h3 className="text-2xl font-bold">500</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ADA Earned</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold">3</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">NFT Badges Earned</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Activity Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                          <div className="w-0.5 h-full bg-purple-200 dark:bg-purple-800"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">Completed "Build a DEX Order Book on Cardano"</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">May 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                          <div className="w-0.5 h-full bg-purple-200 dark:bg-purple-800"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">Earned "Smart Contract Developer" Badge</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">May 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                          <div className="w-0.5 h-full bg-purple-200 dark:bg-purple-800"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">Completed "Design a DeFi Dashboard UI"</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">April 22, 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Completed "Write a Technical Guide on NFT Minting"</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">March 10, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

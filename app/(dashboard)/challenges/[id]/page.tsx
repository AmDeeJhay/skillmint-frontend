"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Zap, Users, CheckCircle, ArrowLeft, ExternalLink, FileText, Code, Award } from "lucide-react"
import Link from "next/link"
import { challengesData } from "@/lib/challenges-data"
import { ChallengeSubmissionForm } from "@/components/challenge-submission-form"
import { motion } from "framer-motion"
import challengeService from "@/services/challengeService"
import useUIStore from "@/store/useUIStore"

export default function ChallengePage() {
  const params = useParams()
  const challengeId = params.id as string
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [challenge, setChallenge] = useState({});

  const { setLoading, setError, clearError } = useUIStore();

  useEffect(() => {
    const loadChallenge = async () => {
      setLoading(true);          
      setError(null);           
      try {
        const data = await challengeService.fetchSingleChallenge(challengeId);
        setChallenge(data);
      } catch (err) {
        console.error("Error loading challenges:", err);
        setError("Failed to load challenges");
      } finally {
        setLoading(false);       
      }
    };

    loadChallenge();
  }, [setLoading, setError]);



  // const challenge = challengesData.find((c) => c.id === Number.parseInt(challengeId))

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
        <Link href="/challenges">
          <Button>Back to Challenges</Button>
        </Link>
      </div>
    )
  }

  const submissions = [
    {
      id: 1,
      user: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      submittedAt: "2 hours ago",
      status: "Under Review",
      preview: "Built a complete DEX with order matching...",
    },
    {
      id: 2,
      user: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      submittedAt: "1 day ago",
      status: "Approved",
      preview: "Implemented advanced order book functionality...",
    },
    {
      id: 3,
      user: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      submittedAt: "3 days ago",
      status: "Needs Revision",
      preview: "Created basic DEX structure with...",
    },
  ]

  const requirements = [
    "Implement order book functionality using Plutus smart contracts",
    "Support both limit and market orders",
    "Include proper error handling and validation",
    "Provide comprehensive documentation",
    "Deploy to Cardano testnet",
    "Include unit tests with >80% coverage",
  ]

  const resources = [
    { title: "Plutus Documentation", url: "#", type: "docs" },
    { title: "DEX Architecture Guide", url: "#", type: "guide" },
    { title: "Sample Code Repository", url: "#", type: "code" },
    { title: "Cardano Testnet Faucet", url: "#", type: "tool" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/challenges">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${challenge.bgColor} flex items-center justify-center`}>
              <div className={challenge.color}>{challenge.icon}</div>
            </div>
            <Badge variant="outline">{challenge.category}</Badge>
          </div>
        </div>

        {/* Challenge Info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{challenge.difficulty}</Badge>
                      <div className="flex items-center text-yellow-500 gap-1">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">{challenge.reward} ADA</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{challenge.submissionCount} submissions</span>
                      </div>
                    </div>
                  </div>
                  {challenge.status === "closed" && <Badge variant="destructive">Submissions Closed</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{challenge.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div className="text-sm text-gray-500">{challenge.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Deadline</div>
                      <div className="text-sm text-gray-500">{challenge.deadline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Reward</div>
                      <div className="text-sm text-gray-500">{challenge.reward} ADA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Participants</div>
                      <div className="text-sm text-gray-500">{challenge.submissionCount}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {challenge.status !== "closed" ? (
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setShowSubmissionForm(true)}>
                      Accept Challenge
                    </Button>
                  ) : (
                    <Button disabled>Submissions Closed</Button>
                  )}
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="requirements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Challenge Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-teal-600 dark:text-teal-400">{index + 1}</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Helpful Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {resource.type === "docs" && <FileText className="h-4 w-4" />}
                              {resource.type === "code" && <Code className="h-4 w-4" />}
                              {resource.type === "guide" && <FileText className="h-4 w-4" />}
                              {resource.type === "tool" && <ExternalLink className="h-4 w-4" />}
                            </div>
                            <span className="font-medium">{resource.title}</span>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={resource.url}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Recent Submissions ({submissions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <div key={submission.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={submission.avatar || "/placeholder.svg"} alt={submission.user} />
                            <AvatarFallback>
                              {submission.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-medium">{submission.user}</div>
                                <div className="text-sm text-gray-500">{submission.submittedAt}</div>
                              </div>
                              <Badge
                                variant={
                                  submission.status === "Approved"
                                    ? "default"
                                    : submission.status === "Under Review"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {submission.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{submission.preview}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No discussions yet. Be the first to ask a question!</p>
                      <Button className="mt-4" variant="outline">
                        Start Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Creator" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">SkillMint Team</div>
                    <div className="text-sm text-gray-500">Official Challenge</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Reward</span>
                  <span className="font-medium">{challenge.reward} ADA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submissions</span>
                  <span className="font-medium">{challenge.submissionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time Left</span>
                  <span className="font-medium">5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Success Rate</span>
                  <span className="font-medium">68%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {showSubmissionForm && (
        <ChallengeSubmissionForm
          challengeId={challenge.id}
          challengeTitle={challenge.title}
          onClose={() => setShowSubmissionForm(false)}
        />
      )}
    </div>
  )
}

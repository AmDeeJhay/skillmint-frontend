"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, Calendar, Clock, Github, Upload, Zap } from "lucide-react"
import { challengesData } from "@/lib/challenges-data"
import ChallengeSubmissionForm from "@/components/challenge-submission-form"

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [challenge, setChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [nextChallengeId, setNextChallengeId] = useState<number | null>(null)
  const [prevChallengeId, setPrevChallengeId] = useState<number | null>(null)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  useEffect(() => {
    // Find the challenge by ID
    const id = Number.parseInt(params.id)
    const foundChallenge = challengesData.find((c) => c.id === id)

    if (foundChallenge) {
      setChallenge(foundChallenge)

      // Find next and previous challenge IDs
      const currentIndex = challengesData.findIndex((c) => c.id === id)
      if (currentIndex < challengesData.length - 1) {
        setNextChallengeId(challengesData[currentIndex + 1].id)
      } else {
        setNextChallengeId(null)
      }

      if (currentIndex > 0) {
        setPrevChallengeId(challengesData[currentIndex - 1].id)
      } else {
        setPrevChallengeId(null)
      }
    }

    setLoading(false)
  }, [params.id])

  const handleSubmitChallenge = () => {
    setShowSubmissionForm(true)
  }

  const handleAcceptChallenge = () => {
    setShowSubmissionForm(true)
  }

  const handleCloseSubmissionForm = () => {
    setShowSubmissionForm(false)
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 md:py-12 mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2">Loading challenge...</p>
        </div>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="container px-4 py-8 md:py-12 mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
          <p className="mb-6">The challenge you're looking for doesn't exist or has been removed.</p>
          <Link href="/challenges">
            <Button>Back to Challenges</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (showSubmissionForm) {
    return <ChallengeSubmissionForm challenge={challenge} onClose={handleCloseSubmissionForm} />
  }

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${challenge.bgColor} flex items-center justify-center`}>
              <div className={challenge.color}>{challenge.icon}</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{challenge.title}</h1>
                <Badge variant="outline">{challenge.category}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{challenge.difficulty}</Badge>
                <div className="flex items-center text-yellow-500 space-x-1">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">{challenge.reward} ADA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAcceptChallenge}>
              Accept Challenge
            </Button>
            <Button variant="outline" onClick={handleSubmitChallenge}>
              <Upload className="mr-2 h-4 w-4" /> Submit Challenge
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          {prevChallengeId ? (
            <Link href={`/challenges/${prevChallengeId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Challenge
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nextChallengeId && (
            <Link href={`/challenges/${nextChallengeId}`}>
              <Button variant="outline">
                Next Challenge <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Challenge Details</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">{challenge.longDescription}</p>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {challenge.requirements.map((requirement: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                            <span className="text-gray-500 dark:text-gray-400">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Submission Guidelines</h3>
                      <p className="text-gray-500 dark:text-gray-400">Your submission should include:</p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            GitHub repository link with your code
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Documentation explaining your implementation
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Test cases demonstrating functionality
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            A brief video walkthrough (optional but recommended)
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Evaluation Criteria</h3>
                      <p className="text-gray-500 dark:text-gray-400">Submissions will be evaluated based on:</p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Functionality (40%): Does it work as expected?
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Code Quality (30%): Is the code well-structured and maintainable?
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Security (20%): Is the implementation secure?
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Documentation (10%): Is the documentation clear and comprehensive?
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</h3>
                        <p className="mt-1">{challenge.createdBy}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created On</h3>
                        <p className="mt-1">{challenge.createdAt}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                        <div className="flex items-center mt-1 space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{challenge.duration}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Deadline</h3>
                        <div className="flex items-center mt-1 space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{challenge.deadline}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reward</h3>
                        <div className="flex items-center mt-1 text-yellow-500 space-x-1">
                          <Zap className="h-4 w-4" />
                          <span className="font-medium">{challenge.reward} ADA</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Submissions</h3>
                        <p className="mt-1">
                          {Array.isArray(challenge.submissions) ? challenge.submissions.length : 0} submissions
                        </p>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            alert("This would open the starter code repository")
                          }}
                        >
                          <Github className="mr-2 h-4 w-4" /> View Starter Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="submissions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>View all submissions for this challenge.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.isArray(challenge.submissions) && challenge.submissions.length > 0 ? (
                    challenge.submissions.map((submission: any) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage
                              src={submission.user.avatar || "/placeholder.svg"}
                              alt={submission.user.name}
                            />
                            <AvatarFallback>{submission.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{submission.user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Submitted on {submission.submittedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={
                              submission.status === "Approved"
                                ? "success"
                                : submission.status === "Rejected"
                                  ? "destructive"
                                  : "outline"
                            }
                            className={
                              submission.status === "Approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : submission.status === "Rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : ""
                            }
                          >
                            {submission.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              alert(`Viewing submission by ${submission.user.name}`)
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No submissions yet. Be the first to submit!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="discussion" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
                <CardDescription>Ask questions and discuss this challenge with other participants.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No discussions yet. Be the first to start a conversation!
                    </p>
                    <Button
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() => {
                        alert("This would open a new discussion form")
                      }}
                    >
                      Start Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

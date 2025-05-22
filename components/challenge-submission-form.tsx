"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Link2, Upload, X, Zap } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChallengeSubmissionForm({ challenge, onClose }: { challenge: any; onClose: () => void }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    githubUrl: "",
    description: "",
    additionalLinks: "",
    comments: "",
    files: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files as FileList)],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Submission data:", formData)
      setIsSubmitting(false)
      setSubmissionComplete(true)
    }, 2000)
  }

  if (submissionComplete) {
    return (
      <div className="container px-4 py-12 mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Submission Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <AlertTitle className="text-green-800 dark:text-green-300">Success!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Your submission for "{challenge.title}" has been received and is now pending review.
                </AlertDescription>
              </div>
            </Alert>

            <div className="text-center space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                Our team will review your submission and provide feedback within 7 days. You'll receive a notification
                once the review is complete.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(`/challenges/${challenge.id}`)
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenge
                </Button>
                <Button
                  onClick={() => {
                    router.push("/profile")
                  }}
                >
                  View Your Submissions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenge
          </Button>
          <h1 className="text-2xl font-bold">Submit Your Solution</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submission Form</CardTitle>
              <CardDescription>
                Complete the form below to submit your solution for "{challenge.title}".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="files">Files & Resources</TabsTrigger>
                  <TabsTrigger value="review">Review & Submit</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub Repository URL *</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      placeholder="https://github.com/yourusername/your-repo"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Link to the GitHub repository containing your solution code
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your solution, approach, and implementation details..."
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Provide a detailed description of your solution and how it meets the challenge requirements
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("files")}>Next: Files & Resources</Button>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Files (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Max file size: 10MB. Supported formats: PDF, ZIP, PNG, JPG, MP4
                      </p>
                      <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} multiple />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Select Files
                      </Button>
                    </div>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files</Label>
                      <div className="space-y-2">
                        {formData.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-900"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                  <polyline points="10 9 9 9 8 9" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="additionalLinks">Additional Links (Optional)</Label>
                    <Textarea
                      id="additionalLinks"
                      name="additionalLinks"
                      placeholder="Add any additional links to resources, demos, or documentation..."
                      rows={3}
                      value={formData.additionalLinks}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Include links to live demos, documentation, or other relevant resources
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      Back: Project Details
                    </Button>
                    <Button onClick={() => setActiveTab("review")}>Next: Review & Submit</Button>
                  </div>
                </TabsContent>

                <TabsContent value="review" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Review Your Submission</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Please review your submission details before submitting. Once submitted, you won't be able to make
                      changes.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHub Repository</h4>
                      <div className="flex items-center mt-1">
                        <Github className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formData.githubUrl || "Not provided"}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Description</h4>
                      <p className="mt-1 text-sm border p-3 rounded-md bg-gray-50 dark:bg-gray-900">
                        {formData.description || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Files</h4>
                      {formData.files.length > 0 ? (
                        <div className="mt-1 text-sm">
                          {formData.files.map((file, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                              <span>
                                {file.name} ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">No files uploaded</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Links</h4>
                      {formData.additionalLinks ? (
                        <div className="flex items-center mt-1">
                          <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{formData.additionalLinks}</span>
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">No additional links provided</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments">Final Comments (Optional)</Label>
                      <Textarea
                        id="comments"
                        name="comments"
                        placeholder="Any final comments for the reviewers?"
                        rows={3}
                        value={formData.comments}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("files")}>
                      Back: Files & Resources
                    </Button>
                    <Button
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.githubUrl || !formData.description}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Challenge"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}>
                  <div className={challenge.color}>{challenge.icon}</div>
                </div>
                <div>
                  <h3 className="font-medium">{challenge.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{challenge.category}</Badge>
                    <Badge variant="secondary">{challenge.difficulty}</Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reward</h4>
                  <div className="flex items-center mt-1 text-yellow-500 space-x-1">
                    <Zap className="h-4 w-4" />
                    <span className="font-medium">{challenge.reward} ADA</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h4>
                  <p className="mt-1">{challenge.duration}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Deadline</h4>
                  <p className="mt-1">{challenge.deadline}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Submission Tips</h4>
                <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-gray-400"></div>
                    <span>Make sure your code is well-documented</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-gray-400"></div>
                    <span>Include clear instructions to run your project</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-gray-400"></div>
                    <span>Test your solution thoroughly before submitting</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-gray-400"></div>
                    <span>Address all the requirements in the challenge</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Cancel Submission
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

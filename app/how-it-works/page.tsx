"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileCheck, Trophy, Upload, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <FileCheck className="h-12 w-12 text-teal-600 dark:text-teal-400" />,
      title: "Choose a Challenge",
      description: "Browse through community-posted skill challenges that match your interests and expertise.",
      details: [
        "Filter challenges by category, difficulty, and reward amount",
        "Read detailed requirements and evaluation criteria",
        "See previous submissions and discussions",
        "Choose challenges that align with your skills and interests",
      ],
    },
    {
      icon: <Upload className="h-12 w-12 text-teal-600 dark:text-teal-400" />,
      title: "Submit Your Work",
      description:
        "Complete the challenge and submit your workproof - code, video, article, design, or other deliverables.",
      details: [
        "Work on the challenge at your own pace",
        "Submit your solution through our platform",
        "Include all required documentation and explanations",
        "Link to your GitHub repository or other relevant resources",
      ],
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-teal-600 dark:text-teal-400" />,
      title: "Get Verified",
      description: "AI and the community verify your submission based on the challenge requirements.",
      details: [
        "Our AI system performs initial verification of your submission",
        "Community members review and provide feedback",
        "Challenge creator evaluates against the requirements",
        "Receive detailed feedback on your work",
      ],
    },
    {
      icon: <Trophy className="h-12 w-12 text-teal-600 dark:text-teal-400" />,
      title: "Earn Rewards",
      description: "Receive on-chain rewards and a Skill NFT badge that's added to your public portfolio.",
      details: [
        "Receive ADA tokens directly to your wallet",
        "Earn a unique NFT badge representing your skill",
        "Build your on-chain skill portfolio",
        "Showcase your verified skills to potential employers or clients",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How SkillMint Works</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            SkillMint is a decentralized platform that allows you to prove your skills, earn rewards, and build your
            on-chain reputation.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-teal-600 dark:text-teal-400 mr-2">{index + 1}.</span> {step.title}
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{step.description}</p>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">What this means:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                          <span className="text-gray-500 dark:text-gray-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/challenges">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Browse Challenges <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                alert("Wallet connection functionality would be implemented here")
              }}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

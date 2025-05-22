"use client"

import { ArrowRight, Award, Code, FileCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedChallenges from "@/components/featured-challenges"
import HowItWorks from "@/components/how-it-works"
import Link from "next/link"
import { challengesData } from "@/lib/challenges-data"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 text-sm font-medium mb-2">
                Decentralized Skill Verification
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Prove Your Skills, <span className="text-teal-600 dark:text-teal-400">Earn Rewards</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SkillMint is an open platform on the Cardano blockchain where builders, developers, creatives, and
                learners prove their skills by completing challenges and earn on-chain rewards.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/challenges">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
                    Explore Challenges <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-teal-200 dark:bg-teal-900/30 rounded-full filter blur-3xl opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-cyan-200 dark:bg-cyan-900/30 rounded-full filter blur-3xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                          <Code className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Smart Contract Challenge</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Intermediate</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">250 ADA</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Build a DEX Order Book on Cardano</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Create a decentralized exchange order book using Plutus smart contracts. Implement limit orders
                      and market orders.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {challengesData[0]?.submissionCount || 24} submissions
                        </span>
                      </div>
                      <Link href="/challenges/1">
                        <Button size="sm" variant="ghost" className="text-teal-600 dark:text-teal-400">
                          View Challenge
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Challenges */}
      <FeaturedChallenges />

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why SkillMint?</h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SkillMint removes traditional barriers to opportunity and creates a new way to build your reputation.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle>No Entry Barriers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  No interviews, no resumes — just show what you can build and get recognized for your skills.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle>Skill Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  No fake CVs — NFTs prove your work publicly and verifiably on the blockchain.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle>Direct Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  No clients, no middlemen — earn directly from open challenges on the platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  >
                    <path d="M12 2L5 12l7 10 7-10z" />
                    <path d="M5 12l7-10 7 10" />
                    <path d="M5 12l7 10 7-10" />
                    <path d="M5 12h14" />
                  </svg>
                </div>
                <CardTitle>Public Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Everything is tied to your wallet. Build a public, portable skill portfolio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Prove Your Skills?
              </h2>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join SkillMint today and start building your on-chain skill portfolio.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
                onClick={() => {
                  alert("Wallet connection functionality would be implemented here")
                }}
              >
                Connect Wallet
              </Button>
              <Link href="/challenges">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Challenges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

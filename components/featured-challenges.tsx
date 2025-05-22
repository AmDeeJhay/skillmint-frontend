import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { challengesData } from "@/lib/challenges-data"

export default function FeaturedChallenges() {
  // Get only the first 3 challenges for the featured section
  const featuredChallenges = challengesData.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Challenges</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Complete these challenges to earn rewards and build your on-chain skill portfolio.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}>
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
                    <span className="text-sm font-medium">{challenge.reward}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {challenge.submissionCount} submissions
                  </span>
                </div>
                <Link href={`/challenges/${challenge.id}`}>
                  <Button size="sm" variant="ghost" className="text-teal-600 dark:text-teal-400">
                    View Challenge
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/challenges">
            <Button variant="outline" size="lg">
              View All Challenges
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

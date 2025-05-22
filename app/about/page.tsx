"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Blockchain developer with 8+ years of experience. Previously worked at Cardano Foundation.",
      avatar: "/placeholder.svg?height=100&width=100",
      twitter: "alexj",
      github: "alexj",
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      bio: "Smart contract expert and Plutus pioneer. Led development teams at multiple DeFi projects.",
      avatar: "/placeholder.svg?height=100&width=100",
      twitter: "sarahw",
      github: "sarahw",
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      bio: "Product leader with experience at Web3 startups. Passionate about decentralized identity.",
      avatar: "/placeholder.svg?height=100&width=100",
      twitter: "michaelc",
      github: "michaelc",
    },
    {
      name: "Priya Patel",
      role: "Community Lead",
      bio: "Community builder and educator in the Cardano ecosystem. Hosts the popular 'Cardano Conversations' podcast.",
      avatar: "/placeholder.svg?height=100&width=100",
      twitter: "priyap",
      github: "priyap",
    },
  ]

  const faqItems = [
    {
      question: "What is SkillMint?",
      answer:
        "SkillMint is a decentralized platform on the Cardano blockchain where builders, developers, creatives, and learners can prove their skills by completing open challenges. Instead of traditional hiring processes, users earn on-chain rewards and NFT badges that build their verifiable skill portfolio.",
    },
    {
      question: "How do I get started?",
      answer:
        "To get started, connect your Cardano wallet, browse the available challenges, and choose one that matches your skills and interests. Complete the challenge according to the requirements, submit your work, and wait for verification. Once approved, you'll receive your reward and an NFT badge.",
    },
    {
      question: "What types of challenges are available?",
      answer:
        "SkillMint offers a variety of challenges across different categories including Development (smart contracts, frontend, backend), Design (UI/UX, graphics), and Content (technical writing, educational materials). Challenges range from beginner to advanced difficulty levels.",
    },
    {
      question: "How are submissions verified?",
      answer:
        "Submissions go through a two-step verification process. First, our AI system performs an initial check against the challenge requirements. Then, community members and the challenge creator review the submission to ensure quality and completeness before approval.",
    },
    {
      question: "What are Skill NFT badges?",
      answer:
        "Skill NFT badges are on-chain credentials that verify your skills and achievements. Each badge represents a successfully completed challenge and is added to your public portfolio. These badges serve as verifiable proof of your abilities that you can showcase to potential employers or clients.",
    },
    {
      question: "Can I create my own challenges?",
      answer:
        "Yes! Community members can create and fund their own challenges. This allows organizations, projects, and individuals to source specific skills and contributions while providing opportunities for builders to earn rewards.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SkillMint</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Building a decentralized future where skills are verified, rewarded, and owned by the builders.
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                  SkillMint was founded with a simple but powerful mission: to create a world where skills matter more
                  than credentials, where builders can prove their abilities through their work, not their resume.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                  We believe that talent is globally distributed, but opportunity is not. By leveraging blockchain
                  technology, we're building a platform that removes traditional barriers to opportunity and creates a
                  new way for people to build their reputation based on what they can actually do.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Our goal is to create a more meritocratic system where anyone, anywhere can prove their skills, earn
                  rewards, and build a verifiable portfolio that opens doors to new opportunities.
                </p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Why Cardano?</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We chose to build on Cardano because of its commitment to scientific rigor, sustainability, and
                  scalability. Cardano's approach aligns with our values of creating a platform that is:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                    <span className="text-gray-500 dark:text-gray-400">Accessible to users globally</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                    <span className="text-gray-500 dark:text-gray-400">Environmentally sustainable</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                    <span className="text-gray-500 dark:text-gray-400">Secure and transparent</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                    <span className="text-gray-500 dark:text-gray-400">Built for long-term growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-teal-600 dark:text-teal-400 mb-2">{member.role}</p>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{member.bio}</p>
                        <div className="flex gap-3">
                          <a
                            href={`https://twitter.com/${member.twitter}`}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                          <a
                            href={`https://github.com/${member.github}`}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join SkillMint?</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              Start building your on-chain skill portfolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/challenges">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Explore Challenges <ArrowRight className="ml-2 h-4 w-4" />
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
          </section>
        </div>
      </div>
    </div>
  )
}

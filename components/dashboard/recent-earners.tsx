"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function RecentEarners() {
  const earners = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      amount: "250 ADA",
      challenge: "Build a DEX Order Book",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      amount: "150 ADA",
      challenge: "Design a DeFi Dashboard",
      time: "1 day ago",
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      amount: "100 ADA",
      challenge: "Technical Guide on NFTs",
      time: "2 days ago",
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "/placeholder.svg?height=32&width=32",
      amount: "200 ADA",
      challenge: "Cardano Wallet Connector",
      time: "3 days ago",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      avatar: "/placeholder.svg?height=32&width=32",
      amount: "120 ADA",
      challenge: "Educational Infographic",
      time: "4 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Earners</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {earners.map((earner, index) => (
            <motion.div
              key={earner.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={earner.avatar || "/placeholder.svg"} alt={earner.name} />
                <AvatarFallback>{earner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{earner.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-yellow-500">
                    <Zap className="h-3 w-3 mr-0.5" />
                    <span className="text-xs font-medium">{earner.amount}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{earner.time}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs truncate max-w-[100px]">
                {earner.challenge}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

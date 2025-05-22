"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, QrCode, Wallet, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function WalletPage() {
  const [copied, setCopied] = useState(false)

  const walletAddress =
    "addr1qxy8p07tr4877vdlr98f87e4mnmf3fvnfcyjh9r5vr9qkyfg8jlj2f5xvvdpjh3s7y4rr9c8jjj9f2k3v4nvz8tk8g3qn8l7vz"
  const shortenedAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const transactions = [
    {
      id: "tx1",
      type: "Received",
      amount: "250 ADA",
      from: "SkillMint Challenge Reward",
      date: "May 15, 2023",
      status: "Confirmed",
    },
    {
      id: "tx2",
      type: "Received",
      amount: "150 ADA",
      from: "SkillMint Challenge Reward",
      date: "April 22, 2023",
      status: "Confirmed",
    },
    {
      id: "tx3",
      type: "Sent",
      amount: "50 ADA",
      to: "NFT Marketplace",
      date: "April 10, 2023",
      status: "Confirmed",
    },
    {
      id: "tx4",
      type: "Received",
      amount: "100 ADA",
      from: "SkillMint Challenge Reward",
      date: "March 10, 2023",
      status: "Confirmed",
    },
    {
      id: "tx5",
      type: "Sent",
      amount: "25 ADA",
      to: "Donation",
      date: "February 28, 2023",
      status: "Confirmed",
    },
  ]

  const assets = [
    {
      id: "asset1",
      name: "Smart Contract Developer Badge",
      type: "NFT",
      quantity: 1,
      policy: "policy1...",
    },
    {
      id: "asset2",
      name: "UI Designer Badge",
      type: "NFT",
      quantity: 1,
      policy: "policy2...",
    },
    {
      id: "asset3",
      name: "Technical Writer Badge",
      type: "NFT",
      quantity: 1,
      policy: "policy3...",
    },
  ]

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your wallet, view transactions, and track your assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Wallet Overview</CardTitle>
                <CardDescription>Your connected Cardano wallet details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</p>
                        <div className="flex items-center mt-1">
                          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {shortenedAddress}
                          </code>
                          <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-2">
                            {copied ? (
                              <span className="text-green-500 text-xs">Copied!</span>
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Type</p>
                        <p className="mt-1">Nami</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Since</p>
                        <p className="mt-1">May 1, 2023</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View on Explorer
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <QrCode className="h-4 w-4" />
                          Show QR Code
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Balance</h3>
                        <Wallet className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                            <span className="text-2xl font-bold">500 ADA</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">≈ $150 USD</p>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Total Earned</span>
                            <span className="font-medium">575 ADA</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-500 dark:text-gray-400">Total Spent</span>
                            <span className="font-medium">75 ADA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-teal-600 hover:bg-teal-700">
                    <Zap className="mr-2 h-4 w-4" />
                    Claim Rewards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View NFT Gallery
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <QrCode className="mr-2 h-4 w-4" />
                    Receive ADA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent wallet transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Type</th>
                          <th className="text-left py-3 px-2 font-medium">Amount</th>
                          <th className="text-left py-3 px-2 font-medium">From/To</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="border-b">
                            <td className="py-3 px-2">
                              <Badge
                                variant="outline"
                                className={`${
                                  tx.type === "Received"
                                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                    : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                }`}
                              >
                                {tx.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center">
                                <Zap className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                                <span className="font-medium">{tx.amount}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-sm">{tx.from || tx.to}</span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-sm text-green-600 dark:text-green-400">{tx.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assets" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                  <CardDescription>NFTs and tokens in your wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Asset Name</th>
                          <th className="text-left py-3 px-2 font-medium">Type</th>
                          <th className="text-left py-3 px-2 font-medium">Quantity</th>
                          <th className="text-left py-3 px-2 font-medium">Policy ID</th>
                          <th className="text-left py-3 px-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset) => (
                          <tr key={asset.id} className="border-b">
                            <td className="py-3 px-2">
                              <span className="font-medium">{asset.name}</span>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant="outline">{asset.type}</Badge>
                            </td>
                            <td className="py-3 px-2">
                              <span>{asset.quantity}</span>
                            </td>
                            <td className="py-3 px-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                                {asset.policy.slice(0, 8)}...
                              </code>
                            </td>
                            <td className="py-3 px-2">
                              <Button variant="ghost" size="sm">
                                View
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
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

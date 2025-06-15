"use client"

import type React from "react"

import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Lock } from "lucide-react"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useState } from "react"
import { motion } from "framer-motion"

interface WalletGuardProps {
  children: React.ReactNode
  message?: string
}

export function WalletGuard({ children, message = "Connect your wallet to access this feature" }: WalletGuardProps) {
  const { isConnected } = useWallet()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  if (isConnected) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle className="text-xl">Wallet Connection Required</CardTitle>
            <CardDescription className="text-base">{message}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setIsWalletModalOpen(true)}
              className="w-full bg-teal-600 hover:bg-teal-700"
              size="lg"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Secure your account and access all platform features
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <WalletConnectModal open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
    </div>
  )
}

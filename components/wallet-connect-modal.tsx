"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const wallets = [
  {
    id: "nami",
    name: "Nami",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Browser extension wallet for Cardano",
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Feature-rich wallet for Cardano",
  },
  {
    id: "flint",
    name: "Flint",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Simple and secure Cardano wallet",
  },
  {
    id: "yoroi",
    name: "Yoroi",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Light wallet for Cardano",
  },
]

export function WalletConnectModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { connect } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId)

    // Simulate connection delay
    setTimeout(() => {
      connect()
      setConnecting(null)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your Cardano wallet to access challenges, earn rewards, and build your on-chain skill portfolio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <motion.div key={wallet.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
              <Button
                variant="outline"
                className="w-full justify-start p-4 h-auto"
                onClick={() => handleConnect(wallet.id)}
                disabled={connecting !== null}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{wallet.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{wallet.description}</span>
                  </div>
                </div>
                {connecting === wallet.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 rounded-md">
                    <Loader2 className="h-6 w-6 animate-spin text-teal-600 dark:text-teal-400" />
                  </div>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  )
}

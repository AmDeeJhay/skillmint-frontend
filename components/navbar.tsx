"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useWallet } from "@/hooks/use-wallet"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected } = useWallet()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
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
            </motion.div>
            <span className="font-bold text-xl">SkillMint</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/challenges"
            className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
              pathname === "/challenges" ? "text-teal-600 dark:text-teal-400" : ""
            }`}
          >
            Challenges
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
              pathname === "/leaderboard" ? "text-teal-600 dark:text-teal-400" : ""
            }`}
          >
            Leaderboard
          </Link>
          <Link
            href="/how-it-works"
            className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
              pathname === "/how-it-works" ? "text-teal-600 dark:text-teal-400" : ""
            }`}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
              pathname === "/about" ? "text-teal-600 dark:text-teal-400" : ""
            }`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {isConnected ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button size="sm" className="hidden md:flex bg-teal-600 hover:bg-teal-700" onClick={handleConnectWallet}>
                Connect Wallet
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t p-4"
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/challenges"
              className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
                pathname === "/challenges" ? "text-teal-600 dark:text-teal-400" : ""
              }`}
            >
              Challenges
            </Link>
            <Link
              href="/leaderboard"
              className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
                pathname === "/leaderboard" ? "text-teal-600 dark:text-teal-400" : ""
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/how-it-works"
              className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
                pathname === "/how-it-works" ? "text-teal-600 dark:text-teal-400" : ""
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
                pathname === "/about" ? "text-teal-600 dark:text-teal-400" : ""
              }`}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isConnected ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleConnectWallet}>
                    Connect Wallet
                  </Button>
                </>
              )}
            </div>
          </nav>
        </motion.div>
      )}

      <WalletConnectModal open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
    </header>
  )
}

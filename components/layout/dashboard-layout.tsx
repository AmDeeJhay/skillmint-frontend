"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Award, HelpCircle, Info, Settings, LogOut, Wallet, User, BarChart3, Zap } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import { motion } from "framer-motion"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isConnected, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar className="border-r border-gray-200 dark:border-gray-800">
          <SidebarHeader className="px-3 py-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-600 dark:bg-teal-700">
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
                  className="h-5 w-5 text-white"
                >
                  <path d="M12 2L5 12l7 10 7-10z" />
                  <path d="M5 12l7-10 7 10" />
                  <path d="M5 12l7 10 7-10" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <div className="font-bold text-xl">SkillMint</div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3 py-2">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                      <Link href="/dashboard">
                        <Home className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/challenges" || pathname.startsWith("/challenges/")}
                    >
                      <Link href="/challenges">
                        <Award className="h-4 w-4 mr-2" />
                        <span>Challenges</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/leaderboard"}>
                      <Link href="/leaderboard">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <span>Leaderboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/how-it-works"}>
                      <Link href="/how-it-works">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        <span>How It Works</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/about"}>
                      <Link href="/about">
                        <Info className="h-4 w-4 mr-2" />
                        <span>About</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {isConnected && (
              <>
                <SidebarSeparator className="my-4" />
                <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                          <Link href="/profile">
                            <User className="h-4 w-4 mr-2" />
                            <span>Profile</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/wallet"}>
                          <Link href="/wallet">
                            <Wallet className="h-4 w-4 mr-2" />
                            <span>Wallet</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                          <Link href="/settings">
                            <Settings className="h-4 w-4 mr-2" />
                            <span>Settings</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
            {isConnected ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">John Doe</span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>500 ADA earned</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={disconnect}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <ModeToggle />
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </SidebarProvider>
  )
}

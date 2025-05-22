"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type WalletContextType = {
  isConnected: boolean
  isConnecting: boolean
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  isConnecting: false,
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  // Check if wallet was previously connected
  useEffect(() => {
    const connected = localStorage.getItem("wallet-connected") === "true"
    setIsConnected(connected)
  }, [])

  const connect = () => {
    setIsConnecting(true)
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      localStorage.setItem("wallet-connected", "true")
      router.push("/dashboard")
    }, 500)
  }

  const disconnect = () => {
    setIsConnected(false)
    localStorage.removeItem("wallet-connected")
    router.push("/")
  }

  return (
    <WalletContext.Provider value={{ isConnected, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}

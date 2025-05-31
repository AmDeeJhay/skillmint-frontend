"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Search, Zap } from "lucide-react";
import { challengesData } from "@/lib/challenges-data";
import { motion } from "framer-motion";
import challengeService from "@/services/challengeService";
import { Challenge } from "@/types/challenges";
import LoadingSpinner from "@/components/LoadingSpinner";
import useUIStore from "@/store/useUIStore";
import usePaginationStore from "@/store/usePaginationStore";
import Pagination from "@/components/Pagination";

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentTab, setCurrentTab] = useState("all");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { setLoading, setError, clearError } = useUIStore();
  const { currentPage, itemsPerPage, resetPagination } = usePaginationStore();

  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await challengeService.fetchChallenges();
        setChallenges(data);
      } catch (err) {
        console.error("Error loading challenges:", err);
        setError("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [setLoading, setError]);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      currentTab === "all" || challenge.category === currentTab;
    return matchesSearch && matchesTab;
  });

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "reward-high":
        return Number.parseFloat(b.reward) - Number.parseFloat(a.reward);
      case "reward-low":
        return Number.parseFloat(a.reward) - Number.parseFloat(b.reward);
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChallenges = sortedChallenges.slice(startIndex, endIndex);

  useEffect(() => {
    resetPagination();
  }, [searchTerm, sortBy, currentTab, resetPagination]);

  const renderChallengeCard = (challenge: Challenge) => (
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div
              className={`w-10 h-10 rounded-full ${challenge.bgColor} flex items-center justify-center`}
            >
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
              <span className="text-sm font-medium">${challenge.reward}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {challenge.description}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>
                {challenge.deadline
                  ? `Due ${new Date(challenge.deadline).toLocaleDateString()}`
                  : "No deadline"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-auto">
          <div className="flex gap-2 w-full">
            <Link href={`/challenges/${challenge.id}`} className="w-full">
              <Button size="sm" variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Link href={`/challenges/${challenge.id}`} className="w-full">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 w-full"
              >
                Accept Challenge
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:py-12 mx-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Challenges
          </h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px]">
            Browse and complete challenges to earn rewards and build your
            on-chain skill portfolio.
          </p>
        </div>

        <div className="mt-8 w-full">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setCurrentTab}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-800 overflow-x-auto">
                <TabsTrigger value="all">All Challenges</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="devops">DevOps</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search challenges..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="reward-high">
                        Highest Reward
                      </SelectItem>
                      <SelectItem value="reward-low">Lowest Reward</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentChallenges.map(renderChallengeCard)}
              </div>

              {sortedChallenges.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No challenges found matching your criteria.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentTab("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              <Pagination
                totalItems={sortedChallenges.length}
                className="mt-12"
              />
            </TabsContent>

            {[
              "frontend",
              "backend",
              "devops",
              "mobile",
              "blockchain",
              "design",
            ].map((category) => {
              const categoryFilteredChallenges = sortedChallenges.filter(
                (challenge) => challenge.category === category
              );
              const categoryChallengesStartIndex =
                (currentPage - 1) * itemsPerPage;
              const categoryChallengesEndIndex =
                categoryChallengesStartIndex + itemsPerPage;
              const currentCategoryChallenges =
                categoryFilteredChallenges.slice(
                  categoryChallengesStartIndex,
                  categoryChallengesEndIndex
                );

              return (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCategoryChallenges.map(renderChallengeCard)}
                  </div>

                  <Pagination
                    totalItems={categoryFilteredChallenges.length}
                    className="mt-12"
                  />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

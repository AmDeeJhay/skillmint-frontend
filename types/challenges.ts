export interface ChallengeRequirements {
  mobileFriendly: boolean;
  accessibility: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  reward: number;
  deadline: string; 
  requirements: ChallengeRequirements;
  creatorId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

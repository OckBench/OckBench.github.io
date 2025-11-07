// OckBench Leaderboard Data
// This file contains placeholder data for the leaderboard

const leaderboardData = {
  lastUpdated: "2025-01-15",
  models: [
    {
      rank: 1,
      name: "GPT-4o",
      organization: "OpenAI",
      params: "-",
      accuracy: 87.5,
      avgTime: 3.2,
      avgTokens: 245,
      efficiencyScore: 92.3,
      overallScore: 89.8
    },
    {
      rank: 2,
      name: "Claude 3.5 Sonnet",
      organization: "Anthropic",
      params: "-",
      accuracy: 86.8,
      avgTime: 2.8,
      avgTokens: 228,
      efficiencyScore: 94.1,
      overallScore: 90.3
    },
    {
      rank: 3,
      name: "Gemini 1.5 Pro",
      organization: "Google",
      params: "-",
      accuracy: 85.3,
      avgTime: 3.5,
      avgTokens: 267,
      efficiencyScore: 89.7,
      overallScore: 87.4
    },
    {
      rank: 4,
      name: "GPT-4 Turbo",
      organization: "OpenAI",
      params: "-",
      accuracy: 84.2,
      avgTime: 4.1,
      avgTokens: 312,
      efficiencyScore: 86.5,
      overallScore: 85.3
    },
    {
      rank: 5,
      name: "Llama-3.1-405B",
      organization: "Meta",
      params: "405B",
      accuracy: 82.7,
      avgTime: 5.6,
      avgTokens: 389,
      efficiencyScore: 81.2,
      overallScore: 81.9
    },
    {
      rank: 6,
      name: "Claude 3 Opus",
      organization: "Anthropic",
      params: "-",
      accuracy: 83.1,
      avgTime: 4.8,
      avgTokens: 356,
      efficiencyScore: 84.3,
      overallScore: 83.7
    },
    {
      rank: 7,
      name: "Qwen2.5-72B",
      organization: "Alibaba",
      params: "72B",
      accuracy: 79.8,
      avgTime: 3.9,
      avgTokens: 298,
      efficiencyScore: 86.7,
      overallScore: 83.1
    },
    {
      rank: 8,
      name: "Gemini 1.5 Flash",
      organization: "Google",
      params: "-",
      accuracy: 78.4,
      avgTime: 2.1,
      avgTokens: 198,
      efficiencyScore: 95.8,
      overallScore: 86.3
    },
    {
      rank: 9,
      name: "Llama-3.1-70B",
      organization: "Meta",
      params: "70B",
      accuracy: 77.2,
      avgTime: 3.6,
      avgTokens: 276,
      efficiencyScore: 87.9,
      overallScore: 82.2
    },
    {
      rank: 10,
      name: "Mistral-Large-2",
      organization: "Mistral AI",
      params: "123B",
      accuracy: 76.5,
      avgTime: 4.2,
      avgTokens: 334,
      efficiencyScore: 83.1,
      overallScore: 79.7
    },
    {
      rank: 11,
      name: "DeepSeek-V2.5",
      organization: "DeepSeek",
      params: "236B",
      accuracy: 75.8,
      avgTime: 5.1,
      avgTokens: 412,
      efficiencyScore: 78.4,
      overallScore: 77.1
    },
    {
      rank: 12,
      name: "GPT-3.5 Turbo",
      organization: "OpenAI",
      params: "-",
      accuracy: 72.3,
      avgTime: 1.8,
      avgTokens: 167,
      efficiencyScore: 97.2,
      overallScore: 82.9
    },
    {
      rank: 13,
      name: "Llama-3.1-8B",
      organization: "Meta",
      params: "8B",
      accuracy: 65.4,
      avgTime: 1.2,
      avgTokens: 145,
      efficiencyScore: 98.9,
      overallScore: 78.8
    },
    {
      rank: 14,
      name: "Qwen2.5-7B",
      organization: "Alibaba",
      params: "7B",
      accuracy: 63.7,
      avgTime: 1.1,
      avgTokens: 132,
      efficiencyScore: 99.4,
      overallScore: 78.2
    },
    {
      rank: 15,
      name: "Mistral-7B-v0.3",
      organization: "Mistral AI",
      params: "7B",
      accuracy: 61.2,
      avgTime: 1.3,
      avgTokens: 156,
      efficiencyScore: 98.1,
      overallScore: 76.1
    }
  ],
  taskCategories: [
    "Mathematical Reasoning",
    "Logical Inference",
    "Commonsense Reasoning",
    "Symbolic Reasoning",
    "Multi-Step Reasoning",
    "Code Reasoning",
    "Scientific Reasoning",
    "Strategic Reasoning"
  ],
  difficultyLevels: ["Easy", "Medium", "Hard"]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = leaderboardData;
}


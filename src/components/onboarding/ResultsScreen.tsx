
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadeIn from '@/components/animations/FadeIn';
import { Award, Brain, PiggyBank, Wallet, LineChart, Lightbulb, ChevronRight } from 'lucide-react';

interface ResultsScreenProps {
  results: {
    literacyScore: {
      correct: number;
      total: number;
      percentage: number;
    };
    profile: {
      primaryProfile: string;
      secondaryProfile: string;
      profiles: {
        type: string;
        score: number;
      }[];
    };
  };
  onFinish: () => void;
}

const profileDescriptions = {
  Saver: {
    title: "You're a Saver",
    description: "You tend to be cautious with money and prioritize saving for the future. You find security in having funds set aside and may be hesitant to take financial risks.",
    icon: <PiggyBank className="w-12 h-12 text-green" />,
    strengths: ["Building emergency funds", "Living below means", "Avoiding debt"],
    challenges: ["Missing investment opportunities", "Under-spending on experiences", "Anxiety about money"],
    color: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  Spender: {
    title: "You're a Spender",
    description: "You appreciate the value of using money in the present to enhance your life. You enjoy experiences and may prioritize immediate enjoyment over long-term planning.",
    icon: <Wallet className="w-12 h-12 text-gold" />,
    strengths: ["Living in the moment", "Generosity", "Experiencing life fully"],
    challenges: ["Saving for long-term goals", "Budget discipline", "Impulse control"],
    color: "bg-gold-50",
    textColor: "text-gold-800",
    borderColor: "border-gold-200",
  },
  Investor: {
    title: "You're an Investor",
    description: "You see money as a tool for growth and tend to make strategic decisions. You're comfortable with calculated risks and focus on long-term returns.",
    icon: <LineChart className="w-12 h-12 text-blue-600" />,
    strengths: ["Growing wealth", "Strategic thinking", "Balancing risk"],
    challenges: ["Emotional reactions to market changes", "Over-analyzing decisions", "Work-life balance"],
    color: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
  }
};

const getScoreCategory = (percentage: number): string => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Satisfactory";
  if (percentage >= 50) return "Fair";
  return "Needs Improvement";
};

const getScoreColor = (percentage: number): { text: string; bg: string; ring: string } => {
  if (percentage >= 80) return { 
    text: "text-green-600", 
    bg: "bg-green-600",
    ring: "text-green-100" 
  };
  if (percentage >= 60) return { 
    text: "text-blue-600", 
    bg: "bg-blue-600",
    ring: "text-blue-100" 
  };
  if (percentage >= 40) return { 
    text: "text-gold", 
    bg: "bg-gold",
    ring: "text-gold-100" 
  };
  return { 
    text: "text-red-500", 
    bg: "bg-red-500",
    ring: "text-red-100" 
  };
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onFinish }) => {
  const { literacyScore, profile } = results;
  const scoreCategory = getScoreCategory(literacyScore.percentage);
  const scoreColor = getScoreColor(literacyScore.percentage);
  
  const primaryProfileInfo = profileDescriptions[profile.primaryProfile as keyof typeof profileDescriptions];
  const secondaryProfileInfo = profileDescriptions[profile.secondaryProfile as keyof typeof profileDescriptions];
  
  return (
    <FadeIn className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Your Financial Profile</h2>
        <p className="text-green/70">
          Based on your answers, we've analyzed your financial knowledge and mindset
        </p>
      </div>

      {/* Financial Literacy Score */}
      <Card className="mb-8 border-2 border-green-100">
        <CardHeader className="bg-green-50/50">
          <CardTitle className="flex items-center text-green-800">
            <Brain className="w-6 h-6 mr-2" />
            Financial Literacy Score
          </CardTitle>
          <CardDescription className="text-green-600">
            Based on your answers to our knowledge questions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-4xl font-bold ${scoreColor.text}`}>
                  {literacyScore.percentage}%
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#eaeaea"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * literacyScore.percentage) / 100}
                  className={`transform -rotate-90 origin-center ${scoreColor.bg}`}
                />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold ${scoreColor.text}`}>{scoreCategory}</h3>
            <p className="text-green-700 mt-2 font-medium">
              You answered {literacyScore.correct} out of {literacyScore.total} questions correctly
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Primary Financial Profile */}
      <Card className={`mb-6 border-2 ${primaryProfileInfo.borderColor}`}>
        <CardHeader className={`${primaryProfileInfo.color}`}>
          <CardTitle className={`flex items-center ${primaryProfileInfo.textColor}`}>
            <Lightbulb className="w-6 h-6 mr-2" />
            Your Financial Mindset
          </CardTitle>
          <CardDescription className={primaryProfileInfo.textColor}>
            Your primary financial personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${primaryProfileInfo.color}`}>
              {primaryProfileInfo.icon}
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${primaryProfileInfo.textColor}`}>{primaryProfileInfo.title}</h3>
              <p className="text-green-700">{primaryProfileInfo.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800">Your Strengths</h4>
              <ul className="space-y-1">
                {primaryProfileInfo.strengths.map((strength, index) => (
                  <li key={index} className="text-sm flex items-center text-green-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green mr-2"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-red-800">Your Challenges</h4>
              <ul className="space-y-1">
                {primaryProfileInfo.challenges.map((challenge, index) => (
                  <li key={index} className="text-sm flex items-center text-red-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`pt-4 border-t border-gray-200 mt-4 ${secondaryProfileInfo.color} p-4 rounded-lg`}>
            <h4 className={`font-medium mb-2 ${secondaryProfileInfo.textColor}`}>Your Secondary Trait: {profile.secondaryProfile}</h4>
            <p className={`text-sm ${secondaryProfileInfo.textColor}`}>
              You also show characteristics of a {profile.secondaryProfile.toLowerCase()}, which means 
              {profile.secondaryProfile === "Saver" ? " you value financial security and planning ahead." : 
               profile.secondaryProfile === "Spender" ? " you appreciate enjoying the present and life experiences." : 
               " you're interested in growth opportunities and calculated risks."}
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Score Breakdown */}
      <Card className="mb-8 border-2 border-green-100">
        <CardHeader className="bg-green-50/50">
          <CardTitle className="text-lg text-green-800">Profile Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {profile.profiles.map((p) => {
              const profileColor = p.type === "Saver" 
                ? "bg-green" 
                : p.type === "Spender" 
                  ? "bg-gold" 
                  : "bg-blue-600";
                  
              return (
                <div key={p.type} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">{p.type}</span>
                    <span className="text-sm font-medium text-green-700">{Math.round(p.score * 20)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div 
                      className={`h-full rounded-full ${profileColor}`} 
                      style={{width: `${p.score * 20}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={onFinish}
        className="w-full bg-green hover:bg-green-600 py-6 text-white font-semibold text-lg"
      >
        Continue to Dashboard
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </FadeIn>
  );
};

export default ResultsScreen;

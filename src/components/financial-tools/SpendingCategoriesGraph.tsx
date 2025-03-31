
import React from 'react';
import { cn } from "@/lib/utils";
import { Home, ShoppingBag, Utensils, Car, Plane, HeartPulse, Smartphone, GraduationCap } from 'lucide-react';

export interface SpendingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  spent: number;
  budget: number;
  color: string;
}

interface SpendingCategoriesGraphProps {
  categories: SpendingCategory[];
  className?: string;
}

const SpendingCategoriesGraph: React.FC<SpendingCategoriesGraphProps> = ({ 
  categories,
  className
}) => {
  // Calculate total spending and budget
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const totalBudget = categories.reduce((acc, cat) => acc + cat.budget, 0);
  
  // Sort categories by percentage of budget spent (highest first)
  const sortedCategories = [...categories].sort((a, b) => 
    (b.spent / b.budget) - (a.spent / a.budget)
  );

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-cream">Spending by Category</h3>
        <div className="text-xs text-cream/70">
          <span className="font-medium">${totalSpent.toLocaleString()}</span>
          <span className="mx-1">/</span>
          <span>${totalBudget.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sortedCategories.map((category) => {
          const percentage = Math.min(100, (category.spent / category.budget) * 100);
          const isOverBudget = category.spent > category.budget;
          
          return (
            <div key={category.id} className="flex items-center space-x-3">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                category.color
              )}>
                {category.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-cream">{category.name}</span>
                  <span className="text-xs text-cream/70">
                    <span className={cn(
                      "font-medium",
                      isOverBudget ? "text-red-400" : "text-cream"
                    )}>
                      ${category.spent.toLocaleString()}
                    </span>
                    <span className="mx-1">/</span>
                    <span>${category.budget.toLocaleString()}</span>
                  </span>
                </div>
                
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      isOverBudget ? "bg-red-400" : category.color
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingCategoriesGraph;


import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Home, ShoppingBag, Utensils, Car, Plane, HeartPulse, Smartphone, GraduationCap, PieChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

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
  const [viewMode, setViewMode] = useState<'bars' | 'pie'>('bars');
  
  // Calculate total spending and budget
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const totalBudget = categories.reduce((acc, cat) => acc + cat.budget, 0);
  
  // Sort categories by percentage of budget spent (highest first)
  const sortedCategories = [...categories].sort((a, b) => 
    (b.spent / b.budget) - (a.spent / a.budget)
  );

  // Prepare data for pie chart
  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color.replace('bg-', '').replace('/80', '')
  }));

  // Generate colors for the pie chart from the category colors
  const getChartColor = (colorString: string) => {
    // Map Tailwind color classes to actual color values
    const colorMap: Record<string, string> = {
      'green-300': '#4CBA4B', 
      'gold': '#DAA520',
      'blue-400': '#60A5FA',
      'purple-400': '#A78BFA',
      'pink-400': '#F472B6',
      'cyan-400': '#22D3EE'
    };
    
    // Try to match the color from the map, default to a color if not found
    return colorMap[colorString] || '#9CA3AF';
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-cream">Spending by Category</h3>
        <div className="flex items-center gap-2">
          <div className="text-xs text-cream/70">
            <span className="font-medium">${totalSpent.toLocaleString()}</span>
            <span className="mx-1">/</span>
            <span>${totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 bg-cream/10 rounded-md p-1">
            <button 
              onClick={() => setViewMode('bars')}
              className={cn(
                "text-xs p-1 rounded-sm transition-all",
                viewMode === 'bars' ? "bg-cream/20 text-cream" : "text-cream/70"
              )}
            >
              Bars
            </button>
            <button 
              onClick={() => setViewMode('pie')}
              className={cn(
                "text-xs p-1 rounded-sm transition-all",
                viewMode === 'pie' ? "bg-cream/20 text-cream" : "text-cream/70"
              )}
            >
              <PieChart size={14} className="inline mr-1" />
              Pie
            </button>
          </div>
        </div>
      </div>
      
      {viewMode === 'bars' ? (
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
                        isOverBudget ? "bg-red-400" : "bg-white"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 w-full">
          <ChartContainer 
            config={{
              spent: {
                label: "Amount Spent",
                color: "#FFFFFF"
              },
              remaining: {
                label: "Remaining",
                color: "#4CBA4B"
              }
            }}
            className="h-64 w-full"
          >
            <RechartsPieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                  />
                }
              />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getChartColor(entry.color)} 
                  />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value, entry, index) => (
                  <span className="text-xs text-cream">{value}</span>
                )}
              />
            </RechartsPieChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};

export default SpendingCategoriesGraph;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import FadeIn from '@/components/animations/FadeIn';

const mockBudgetData = [
  { name: 'Housing', spent: 1200, budget: 1500, color: '#10B981' },
  { name: 'Food', spent: 450, budget: 500, color: '#F59E0B' },
  { name: 'Transportation', spent: 320, budget: 400, color: '#3B82F6' },
  { name: 'Entertainment', spent: 180, budget: 200, color: '#8B5CF6' },
  { name: 'Shopping', spent: 250, budget: 300, color: '#EC4899' },
  { name: 'Other', spent: 100, budget: 200, color: '#6B7280' }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BudgetPieChart = () => {
  const totalSpent = mockBudgetData.reduce((acc, item) => acc + item.spent, 0);
  const totalBudget = mockBudgetData.reduce((acc, item) => acc + item.budget, 0);
  const budgetPercentage = ((totalSpent / totalBudget) * 100).toFixed(1);

  return (
    <FadeIn className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground mb-1">Budget Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly spending breakdown</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-card-foreground">
            ${totalSpent.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            of ${totalBudget.toLocaleString()} ({budgetPercentage}%)
          </div>
          <div className="w-20 h-1.5 bg-muted rounded-full mt-2">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockBudgetData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="spent"
              paddingAngle={2}
            >
              {mockBudgetData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {mockBudgetData.map((item) => {
          const percentage = ((item.spent / item.budget) * 100).toFixed(0);
          const isOverBudget = item.spent > item.budget;
          
          return (
            <div key={item.name} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground truncate">{item.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    ${item.spent.toLocaleString()}
                  </span>
                  <span className={`text-xs font-medium ${isOverBudget ? 'text-destructive' : 'text-primary'}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${isOverBudget ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${Math.min(100, parseInt(percentage))}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FadeIn>
  );
};

export default BudgetPieChart;
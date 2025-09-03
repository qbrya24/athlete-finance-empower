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

  return (
    <FadeIn className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Budget Overview</h3>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">${totalSpent.toLocaleString()}</span>
          <span className="mx-1">/</span>
          <span>${totalBudget.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockBudgetData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="spent"
            >
              {mockBudgetData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
              labelStyle={{ color: '#000' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {mockBudgetData.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
            <span className="text-xs font-medium text-foreground ml-auto">
              ${item.spent}
            </span>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

export default BudgetPieChart;
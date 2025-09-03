import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import FadeIn from '@/components/animations/FadeIn';

const mockBudgetData = [
  { name: 'Housing', spent: 1200, budget: 1500, color: '#016F00' },
  { name: 'Food', spent: 450, budget: 500, color: '#DAA520' },
  { name: 'Transportation', spent: 320, budget: 400, color: '#4CBA4B' },
  { name: 'Entertainment', spent: 180, budget: 200, color: '#1F961E' },
  { name: 'Shopping', spent: 250, budget: 300, color: '#B58A1B' },
  { name: 'Other', spent: 100, budget: 200, color: '#89D289' }
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
    <FadeIn className="bg-gradient-to-br from-green-50 to-gold-50 rounded-lg p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-800 mb-1">Budget Overview</h3>
          <p className="text-sm text-green-600">Monthly spending breakdown</p>
        </div>
        <div className="text-right bg-white/60 rounded-lg p-3 border border-gold-200">
          <div className="text-2xl font-bold text-green-700">
            ${totalSpent.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">
            of ${totalBudget.toLocaleString()} ({budgetPercentage}%)
          </div>
          <div className="w-20 h-2 bg-green-100 rounded-full mt-2">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-gold-500 rounded-full transition-all duration-500"
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
                backgroundColor: 'rgba(255, 245, 234, 0.95)', 
                border: '1px solid #DAA520',
                borderRadius: '8px',
                color: '#016F00'
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
            <div key={item.name} className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 hover:bg-white/90 transition-all duration-300 border border-green-100 hover:border-gold-300 hover:shadow-md">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-green-800 truncate">{item.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-green-600">
                    ${item.spent.toLocaleString()}
                  </span>
                  <span className={`text-xs font-medium ${isOverBudget ? 'text-red-600' : 'text-gold-600'}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-green-100 rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${isOverBudget ? 'bg-red-400' : 'bg-gradient-to-r from-green-400 to-gold-400'}`}
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
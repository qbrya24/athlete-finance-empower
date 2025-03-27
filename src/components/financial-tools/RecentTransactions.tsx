
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowDownCircle, ArrowUpCircle, Clock } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <FadeIn delay={300} className="mb-8">
      <div className="bg-green rounded-xl p-6 shadow-sm border border-cream/10 text-cream">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button className="text-sm text-cream/80 mt-2 md:mt-0 hover:text-cream transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-cream/10 last:border-0">
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${transaction.type === 'income' ? 'bg-cream/20 text-cream' : 'bg-red-500/20 text-red-400'}
                `}>
                  {transaction.type === 'income' ? (
                    <ArrowDownCircle className="w-5 h-5" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-cream/70">{transaction.category}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className={`font-semibold ${transaction.type === 'income' ? 'text-cream' : 'text-red-300'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-cream/70 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

export default RecentTransactions;

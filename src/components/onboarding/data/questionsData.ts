
import { Question, KnowledgeQuestion } from '../types';

export const mindsetQuestions: Question[] = [
  {
    id: 1,
    text: "When I receive money unexpectedly (like a bonus or gift), my first instinct is to save it rather than spend it on something enjoyable.",
    type: 'mindset'
  },
  {
    id: 2,
    text: "I often feel anxious or overwhelmed when I need to make financial decisions, even simple ones like paying bills.",
    type: 'mindset'
  },
  {
    id: 3,
    text: "I believe that having significant wealth might corrupt me or make me a worse person.",
    type: 'mindset'
  },
  {
    id: 4,
    text: "I frequently make impulse purchases without considering my budget or financial obligations.",
    type: 'mindset'
  },
  {
    id: 5,
    text: "I take pride in accumulating wealth and believe that having substantial savings gives me security and control.",
    type: 'mindset'
  },
  {
    id: 6,
    text: "I find myself postponing or avoiding dealing with financial paperwork and bills until they become urgent.",
    type: 'mindset'
  },
  {
    id: 7,
    text: "When others ask me to contribute to shared expenses, I often feel resentful, even if the request is reasonable.",
    type: 'mindset'
  },
  {
    id: 8,
    text: "I sometimes feel guilty about having more money than others and may downplay my financial success.",
    type: 'mindset'
  },
  {
    id: 9,
    text: "I prefer keeping my money in savings rather than spending it on experiences or items that might bring joy to myself or others.",
    type: 'mindset'
  },
  {
    id: 10,
    text: "I tend to prioritize immediate wants over long-term financial responsibilities.",
    type: 'mindset'
  },
  {
    id: 11,
    text: "I often procrastinate on financial tasks because they make me feel inadequate or confused.",
    type: 'mindset'
  },
  {
    id: 12,
    text: "I believe money should be continuously invested or saved rather than spent on non-essential items.",
    type: 'mindset'
  },
  {
    id: 13,
    text: "I feel uncomfortable accepting financial help or support from others, even when it's appropriate or necessary.",
    type: 'mindset'
  },
  {
    id: 14,
    text: "I frequently avoid checking my bank account or financial statements because they cause me anxiety.",
    type: 'mindset'
  },
  {
    id: 15,
    text: "I find it difficult to spend money on myself, even for basic necessities or well-deserved treats.",
    type: 'mindset'
  }
];

export const knowledgeQuestions: KnowledgeQuestion[] = [
  {
    id: 101,
    text: "What is a CPA?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Certified Public Accountant", isCorrect: true },
      { id: "b", text: "Corporate Payment Account", isCorrect: false },
      { id: "c", text: "Consumer Protection Agency", isCorrect: false },
      { id: "d", text: "Cost Per Acquisition", isCorrect: false }
    ]
  },
  {
    id: 102,
    text: "Which of the following is considered a liquid asset?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Real estate property", isCorrect: false },
      { id: "b", text: "Cash in a savings account", isCorrect: true },
      { id: "c", text: "Collectible memorabilia", isCorrect: false },
      { id: "d", text: "Five-year certificate of deposit with early withdrawal penalty", isCorrect: false }
    ]
  },
  {
    id: 103,
    text: "What is the primary purpose of a 401(k) plan?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Short-term savings for emergencies", isCorrect: false },
      { id: "b", text: "Education funding", isCorrect: false },
      { id: "c", text: "Retirement savings", isCorrect: true },
      { id: "d", text: "Tax-free health expenses", isCorrect: false }
    ]
  },
  {
    id: 104,
    text: "What does ROI stand for in investing?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Risk Of Investment", isCorrect: false },
      { id: "b", text: "Return On Investment", isCorrect: true },
      { id: "c", text: "Rate Of Inflation", isCorrect: false },
      { id: "d", text: "Regulation Of Income", isCorrect: false }
    ]
  },
  {
    id: 105,
    text: "What type of insurance would typically cover damage to your home from a flood?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Health insurance", isCorrect: false },
      { id: "b", text: "Standard homeowner's insurance", isCorrect: false },
      { id: "c", text: "Flood insurance", isCorrect: true },
      { id: "d", text: "Life insurance", isCorrect: false }
    ]
  },
  {
    id: 106,
    text: "What is a credit score primarily based on?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Your annual income", isCorrect: false },
      { id: "b", text: "Your education level", isCorrect: false },
      { id: "c", text: "Your payment history and debts", isCorrect: true },
      { id: "d", text: "Your employment status", isCorrect: false }
    ]
  },
  {
    id: 107,
    text: "What is compound interest?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Interest calculated only on the initial principal", isCorrect: false },
      { id: "b", text: "Interest calculated on both principal and accumulated interest", isCorrect: true },
      { id: "c", text: "Interest paid only at the end of a loan term", isCorrect: false },
      { id: "d", text: "Interest charged on late payments", isCorrect: false }
    ]
  },
  {
    id: 108,
    text: "What is diversification in investing?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Putting all your money in high-risk investments", isCorrect: false },
      { id: "b", text: "Investing in only one industry to maximize returns", isCorrect: false },
      { id: "c", text: "Spreading investments across different asset classes to reduce risk", isCorrect: true },
      { id: "d", text: "Changing your investment strategy every month", isCorrect: false }
    ]
  },
  {
    id: 109,
    text: "What is a budget deficit?",
    type: 'knowledge',
    options: [
      { id: "a", text: "When your expenses exceed your income", isCorrect: true },
      { id: "b", text: "When your income exceeds your expenses", isCorrect: false },
      { id: "c", text: "When you have no savings", isCorrect: false },
      { id: "d", text: "When your investments lose value", isCorrect: false }
    ]
  },
  {
    id: 110,
    text: "What is inflation?",
    type: 'knowledge',
    options: [
      { id: "a", text: "A decrease in the general price level of goods and services", isCorrect: false },
      { id: "b", text: "An increase in the general price level of goods and services", isCorrect: true },
      { id: "c", text: "The total value of a country's goods and services", isCorrect: false },
      { id: "d", text: "A government tax on imported goods", isCorrect: false }
    ]
  },
  {
    id: 111,
    text: "What is a stock dividend?",
    type: 'knowledge',
    options: [
      { id: "a", text: "The total value of stock you own", isCorrect: false },
      { id: "b", text: "A portion of a company's profit paid to shareholders", isCorrect: true },
      { id: "c", text: "The fee paid to buy or sell stocks", isCorrect: false },
      { id: "d", text: "A loan given to shareholders", isCorrect: false }
    ]
  },
  {
    id: 112,
    text: "What is a deductible in insurance?",
    type: 'knowledge',
    options: [
      { id: "a", text: "The monthly payment for insurance coverage", isCorrect: false },
      { id: "b", text: "The maximum amount an insurance company will pay", isCorrect: false },
      { id: "c", text: "The amount you must pay before insurance coverage begins", isCorrect: true },
      { id: "d", text: "A tax benefit for having insurance", isCorrect: false }
    ]
  },
  {
    id: 113,
    text: "What does 'being underwater' on a mortgage mean?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Having a low interest rate", isCorrect: false },
      { id: "b", text: "Falling behind on monthly payments", isCorrect: false },
      { id: "c", text: "Owning a home near a body of water", isCorrect: false },
      { id: "d", text: "Owing more on your mortgage than your home is worth", isCorrect: true }
    ]
  },
  {
    id: 114,
    text: "What is a bear market?",
    type: 'knowledge',
    options: [
      { id: "a", text: "A market where stock prices are rising", isCorrect: false },
      { id: "b", text: "A market where stock prices are falling", isCorrect: true },
      { id: "c", text: "A market that specializes in selling agricultural products", isCorrect: false },
      { id: "d", text: "A market that specializes in luxury goods", isCorrect: false }
    ]
  },
  {
    id: 115,
    text: "What is the difference between a traditional IRA and a Roth IRA?",
    type: 'knowledge',
    options: [
      { id: "a", text: "There is no difference; they are two names for the same thing", isCorrect: false },
      { id: "b", text: "Traditional IRA contributions are taxed, Roth IRA withdrawals are taxed", isCorrect: false },
      { id: "c", text: "Traditional IRA contributions are tax-deductible now; Roth IRA withdrawals are tax-free later", isCorrect: true },
      { id: "d", text: "Only a Roth IRA can be used for retirement savings", isCorrect: false }
    ]
  }
];

export const allQuestions = [...knowledgeQuestions, ...mindsetQuestions];

export const answerOptions = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" }
];

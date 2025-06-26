
-- Insert education modules with comprehensive content
INSERT INTO education_modules (title, description, duration, lessons_count, order_index, learning_objectives) VALUES
('Budgeting Basics', 'Learn the fundamentals of personal budgeting and money management to take control of your finances.', '2-3 hours', 4, 1, ARRAY[
  'Create and maintain a personal budget',
  'Track income and expenses effectively', 
  'Identify areas for cost reduction',
  'Build healthy spending habits'
]),
('Investment Fundamentals', 'Discover the basics of investing and how to build wealth through smart investment strategies.', '3-4 hours', 5, 2, ARRAY[
  'Understand different types of investments',
  'Learn about risk and return relationships',
  'Create a diversified investment portfolio',
  'Make informed investment decisions'
]),
('Debt Management', 'Master strategies for managing and eliminating debt to achieve financial freedom.', '2-3 hours', 4, 3, ARRAY[
  'Understand different types of debt',
  'Learn debt payoff strategies', 
  'Improve credit score and creditworthiness',
  'Avoid common debt traps'
]),
('Retirement Planning', 'Plan for a secure financial future with comprehensive retirement planning strategies.', '3-4 hours', 5, 4, ARRAY[
  'Calculate retirement savings needs',
  'Understand retirement account options',
  'Maximize employer benefits and matches',
  'Create a retirement investment strategy'
]),
('Tax Optimization', 'Learn how to minimize your tax burden through legal tax planning strategies.', '2-3 hours', 4, 5, ARRAY[
  'Understand basic tax concepts',
  'Learn about tax deductions and credits',
  'Plan tax-efficient investment strategies', 
  'Organize records for tax preparation'
]),
('Emergency Planning', 'Build financial resilience with proper emergency planning and risk management.', '2 hours', 3, 6, ARRAY[
  'Build an emergency fund',
  'Understand insurance needs',
  'Create a financial contingency plan',
  'Protect against financial risks'
])
ON CONFLICT (title) DO NOTHING;

-- Insert lessons for Budgeting Basics
INSERT INTO education_lessons (module_id, title, description, content, duration, order_index, video_url)
SELECT m.id, 'Understanding Your Money Flow', 'Learn to track and categorize your income and expenses.',
'<h2>Understanding Your Money Flow</h2>
<p>The foundation of good budgeting starts with understanding where your money comes from and where it goes.</p>
<h3>Income Sources</h3>
<ul>
  <li><strong>Primary Income:</strong> Your main job salary or wages</li>
  <li><strong>Secondary Income:</strong> Side hustles, freelance work</li>
  <li><strong>Passive Income:</strong> Investments, rental income</li>
</ul>
<h3>Expense Categories</h3>
<ul>
  <li><strong>Fixed Expenses:</strong> Rent, insurance, loan payments</li>
  <li><strong>Variable Expenses:</strong> Groceries, utilities</li>
  <li><strong>Discretionary:</strong> Entertainment, dining out</li>
</ul>',
'30 minutes', 1, 'https://www.youtube.com/watch?v=sVKQn2R7ym0'
FROM education_modules m WHERE m.title = 'Budgeting Basics'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Creating Your First Budget', 'Step-by-step guide to creating a practical budget.',
'<h2>Creating Your First Budget</h2>
<p>Learn to create a budget using the 50/30/20 rule as a starting framework.</p>
<h3>The 50/30/20 Rule</h3>
<ul>
  <li><strong>50% for Needs:</strong> Housing, utilities, groceries</li>
  <li><strong>30% for Wants:</strong> Entertainment, dining out</li>
  <li><strong>20% for Savings:</strong> Emergency fund, retirement</li>
</ul>',
'45 minutes', 2
FROM education_modules m WHERE m.title = 'Budgeting Basics'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Budget Tracking', 'Learn to monitor and adjust your budget.',
'<h2>Budget Tracking and Adjustments</h2>
<p>Creating a budget is just the beginning. Success comes from consistent tracking.</p>
<h3>Daily Tracking Habits</h3>
<ul>
  <li>Record expenses immediately</li>
  <li>Use mobile apps for tracking</li>
  <li>Check account balances regularly</li>
</ul>',
'30 minutes', 3
FROM education_modules m WHERE m.title = 'Budgeting Basics'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Building Money Habits', 'Develop sustainable money management habits.',
'<h2>Building Better Money Habits</h2>
<p>Long-term success comes from developing good money habits.</p>
<h3>Essential Habits</h3>
<ul>
  <li>Pay yourself first</li>
  <li>Use the 24-hour rule for purchases</li>
  <li>Weekly money check-ins</li>
  <li>Automate savings</li>
</ul>',
'30 minutes', 4
FROM education_modules m WHERE m.title = 'Budgeting Basics'
ON CONFLICT (module_id, order_index) DO NOTHING;

-- Insert lessons for Investment Fundamentals
INSERT INTO education_lessons (module_id, title, description, content, duration, order_index, video_url)
SELECT m.id, 'Introduction to Investing', 'Understand why investing is crucial for building wealth.',
'<h2>Introduction to Investing</h2>
<p>Investing is one of the most powerful tools for building long-term wealth.</p>
<h3>Why Invest?</h3>
<ul>
  <li><strong>Beat Inflation:</strong> Money in savings loses purchasing power</li>
  <li><strong>Compound Growth:</strong> Your returns earn returns</li>
  <li><strong>Wealth Building:</strong> Historical returns average 7-10% annually</li>
</ul>',
'30 minutes', 1, 'https://www.youtube.com/watch?v=gFQNPmLKj1k'
FROM education_modules m WHERE m.title = 'Investment Fundamentals'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Types of Investments', 'Explore different investment options.',
'<h2>Types of Investments</h2>
<p>Understanding different investment types helps build a diversified portfolio.</p>
<h3>Stocks</h3>
<ul>
  <li>Potential Returns: 7-10% annually</li>
  <li>Risk Level: Medium to High</li>
  <li>Best For: Long-term growth</li>
</ul>
<h3>Bonds</h3>
<ul>
  <li>Potential Returns: 2-6% annually</li>
  <li>Risk Level: Low to Medium</li>
  <li>Best For: Income and stability</li>
</ul>',
'45 minutes', 2
FROM education_modules m WHERE m.title = 'Investment Fundamentals'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Risk and Return', 'Learn about investment risk and potential returns.',
'<h2>Risk and Return</h2>
<p>Understanding risk-return relationship is fundamental to investing.</p>
<h3>Risk-Return Spectrum</h3>
<ul>
  <li>Low Risk: Savings accounts (0.5-1.5% return)</li>
  <li>Medium Risk: Corporate bonds (3-6% return)</li>
  <li>High Risk: Growth stocks (6-12% return)</li>
</ul>',
'40 minutes', 3
FROM education_modules m WHERE m.title = 'Investment Fundamentals'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Building a Portfolio', 'Learn to construct a diversified portfolio.',
'<h2>Building a Portfolio</h2>
<p>A well-constructed portfolio balances risk and return.</p>
<h3>Asset Allocation</h3>
<ul>
  <li>Age-based rule: Stock % = 100 - your age</li>
  <li>Conservative: 30% stocks, 70% bonds</li>
  <li>Aggressive: 80% stocks, 20% bonds</li>
</ul>',
'45 minutes', 4
FROM education_modules m WHERE m.title = 'Investment Fundamentals'
ON CONFLICT (module_id, order_index) DO NOTHING;

INSERT INTO education_lessons (module_id, title, description, content, duration, order_index)
SELECT m.id, 'Investment Accounts', 'Understand different account types and platforms.',
'<h2>Investment Accounts and Platforms</h2>
<p>Choosing the right accounts can significantly impact your investment success.</p>
<h3>Account Types</h3>
<ul>
  <li><strong>401(k):</strong> Employer retirement plan</li>
  <li><strong>IRA:</strong> Individual retirement account</li>
  <li><strong>Taxable:</strong> No restrictions, pay taxes on gains</li>
</ul>',
'40 minutes', 5
FROM education_modules m WHERE m.title = 'Investment Fundamentals'
ON CONFLICT (module_id, order_index) DO NOTHING;

-- Insert sample quizzes
INSERT INTO education_quizzes (lesson_id, question, options, correct_option, explanation)
SELECT l.id, 'What are the three main expense categories?',
'["Fixed, Variable, Discretionary", "Needs, Wants, Emergency", "Monthly, Weekly, Daily", "Income, Savings, Spending"]',
0, 'Fixed expenses stay the same, variable expenses change but are necessary, and discretionary expenses are optional.'
FROM education_lessons l 
JOIN education_modules m ON l.module_id = m.id 
WHERE m.title = 'Budgeting Basics' AND l.order_index = 1
ON CONFLICT DO NOTHING;

INSERT INTO education_quizzes (lesson_id, question, options, correct_option, explanation)
SELECT l.id, 'What is the main benefit of investing?',
'["Guaranteed returns", "Beating inflation and compound growth", "No risk involved", "Immediate access"]',
1, 'Investing helps beat inflation and provides compound growth over time.'
FROM education_lessons l 
JOIN education_modules m ON l.module_id = m.id 
WHERE m.title = 'Investment Fundamentals' AND l.order_index = 1
ON CONFLICT DO NOTHING;

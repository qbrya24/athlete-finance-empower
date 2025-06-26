
-- Insert education modules
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
]);

-- Insert lessons for Budgeting Basics (module_id will be 1)
INSERT INTO education_lessons (module_id, title, description, content, duration, order_index, video_url) VALUES
(1, 'Understanding Your Money Flow', 'Learn to track and categorize your income and expenses.', 
'<h2>Understanding Your Money Flow</h2>
<p>The foundation of good budgeting starts with understanding where your money comes from and where it goes. This lesson will teach you how to track your income and expenses effectively.</p>

<h3>Income Sources</h3>
<ul>
  <li><strong>Primary Income:</strong> Your main job salary or wages</li>
  <li><strong>Secondary Income:</strong> Side hustles, freelance work, investments</li>
  <li><strong>Passive Income:</strong> Rental income, dividends, royalties</li>
</ul>

<h3>Expense Categories</h3>
<ul>
  <li><strong>Fixed Expenses:</strong> Rent, insurance, loan payments</li>
  <li><strong>Variable Expenses:</strong> Groceries, utilities, entertainment</li>
  <li><strong>Discretionary Expenses:</strong> Dining out, hobbies, luxury items</li>
</ul>

<h3>Tracking Methods</h3>
<p>Choose a method that works for you:</p>
<ul>
  <li>Mobile apps like Mint or YNAB</li>
  <li>Spreadsheets (Excel or Google Sheets)</li>
  <li>Traditional pen and paper</li>
  <li>Bank account categorization features</li>
</ul>

<h3>Action Steps</h3>
<ol>
  <li>Gather your financial statements from the last 3 months</li>
  <li>List all sources of income</li>
  <li>Categorize all expenses</li>
  <li>Calculate your net cash flow (income minus expenses)</li>
</ol>', 
'30 minutes', 1, 'https://www.youtube.com/watch?v=sVKQn2R7ym0'),

(1, 'Creating Your First Budget', 'Step-by-step guide to creating a practical budget that works.', 
'<h2>Creating Your First Budget</h2>
<p>Now that you understand your money flow, let''s create a budget that aligns with your financial goals and lifestyle.</p>

<h3>The 50/30/20 Rule</h3>
<p>A simple starting framework:</p>
<ul>
  <li><strong>50% for Needs:</strong> Housing, utilities, groceries, minimum debt payments</li>
  <li><strong>30% for Wants:</strong> Entertainment, dining out, hobbies</li>
  <li><strong>20% for Savings & Debt Payoff:</strong> Emergency fund, retirement, extra debt payments</li>
</ul>

<h3>Budget Categories</h3>
<h4>Essential Categories:</h4>
<ul>
  <li>Housing (rent/mortgage, utilities, maintenance)</li>
  <li>Transportation (car payment, gas, insurance, public transit)</li>
  <li>Food (groceries, necessary dining)</li>
  <li>Insurance (health, life, disability)</li>
  <li>Minimum debt payments</li>
</ul>

<h4>Important Categories:</h4>
<ul>
  <li>Emergency fund</li>
  <li>Retirement savings</li>
  <li>Healthcare and medical expenses</li>
  <li>Professional development</li>
</ul>

<h4>Discretionary Categories:</h4>
<ul>
  <li>Entertainment and recreation</li>
  <li>Personal care and clothing</li>
  <li>Gifts and charitable giving</li>
  <li>Miscellaneous expenses</li>
</ul>

<h3>Creating Your Budget</h3>
<ol>
  <li>Start with your after-tax income</li>
  <li>List fixed expenses first</li>
  <li>Allocate money for savings goals</li>
  <li>Budget for variable expenses</li>
  <li>Assign remaining money to discretionary categories</li>
  <li>Ensure total expenses don''t exceed income</li>
</ol>', 
'45 minutes', 2, null),

(1, 'Budget Tracking and Adjustments', 'Learn how to monitor your budget and make necessary adjustments.', 
'<h2>Budget Tracking and Adjustments</h2>
<p>Creating a budget is just the beginning. The key to success is consistent tracking and making adjustments as needed.</p>

<h3>Daily Tracking Habits</h3>
<ul>
  <li>Record expenses immediately or daily</li>
  <li>Use mobile apps for on-the-go tracking</li>
  <li>Take photos of receipts</li>
  <li>Check account balances regularly</li>
</ul>

<h3>Weekly Budget Reviews</h3>
<p>Every week, spend 15-20 minutes reviewing:</p>
<ul>
  <li>How much you''ve spent in each category</li>
  <li>Which categories you''re over or under budget</li>
  <li>Upcoming expenses for the next week</li>
  <li>Any budget adjustments needed</li>
</ul>

<h3>Monthly Budget Analysis</h3>
<p>At the end of each month:</p>
<ol>
  <li>Compare actual spending to budgeted amounts</li>
  <li>Identify patterns and trends</li>
  <li>Celebrate successes and learn from overspending</li>
  <li>Adjust next month''s budget based on learnings</li>
</ol>

<h3>Common Budget Challenges</h3>
<ul>
  <li><strong>Irregular Income:</strong> Use your lowest monthly income as baseline</li>
  <li><strong>Unexpected Expenses:</strong> Build a miscellaneous category</li>
  <li><strong>Social Pressure:</strong> Plan for social activities within your budget</li>
  <li><strong>Seasonal Variations:</strong> Account for holiday and seasonal expenses</li>
</ul>

<h3>When to Adjust Your Budget</h3>
<ul>
  <li>Income changes (raise, job loss, side hustle)</li>
  <li>Major life events (marriage, baby, moving)</li>
  <li>Consistently overspending in certain categories</li>
  <li>Achieving financial goals (debt payoff, emergency fund complete)</li>
</ul>', 
'30 minutes', 3, null),

(1, 'Building Better Money Habits', 'Develop sustainable habits that support your budgeting goals.', 
'<h2>Building Better Money Habits</h2>
<p>Long-term financial success comes from developing good money habits that become automatic over time.</p>

<h3>Habit Formation Basics</h3>
<p>Research shows it takes 21-66 days to form a new habit. Start small and be consistent.</p>

<h3>Essential Money Habits</h3>

<h4>1. Pay Yourself First</h4>
<ul>
  <li>Automate savings transfers</li>
  <li>Treat savings like a non-negotiable bill</li>
  <li>Start with even $25-50 per paycheck</li>
</ul>

<h4>2. The 24-Hour Rule</h4>
<ul>
  <li>Wait 24 hours before non-essential purchases over $50</li>
  <li>Wait a week for purchases over $200</li>
  <li>This reduces impulse buying</li>
</ul>

<h4>3. Weekly Money Dates</h4>
<ul>
  <li>Schedule 30 minutes weekly to review finances</li>
  <li>Check account balances</li>
  <li>Review spending against budget</li>
  <li>Plan for upcoming expenses</li>
</ul>

<h4>4. Meal Planning</h4>
<ul>
  <li>Plan meals for the week</li>
  <li>Create grocery lists based on planned meals</li>
  <li>Prep meals in advance when possible</li>
  <li>This typically saves $200-400 monthly</li>
</ul>

<h4>5. Automate Everything Possible</h4>
<ul>
  <li>Automatic bill payments (to avoid late fees)</li>
  <li>Automatic savings transfers</li>
  <li>Automatic investment contributions</li>
</ul>

<h3>Breaking Bad Money Habits</h3>

<h4>Emotional Spending</h4>
<ul>
  <li>Identify your spending triggers</li>
  <li>Find alternative activities (walk, call a friend, exercise)</li>
  <li>Remove temptation (unsubscribe from retailer emails)</li>
</ul>

<h4>Lifestyle Inflation</h4>
<ul>
  <li>When income increases, increase savings first</li>
  <li>Maintain your current lifestyle for 3-6 months after a raise</li>
  <li>Only increase spending on items that truly improve your life</li>
</ul>

<h3>Making It Stick</h3>
<ul>
  <li>Start with one habit at a time</li>
  <li>Track your progress visually</li>
  <li>Celebrate small wins</li>
  <li>Find an accountability partner</li>
  <li>Focus on progress, not perfection</li>
</ul>', 
'30 minutes', 4, null);

-- Insert lessons for Investment Fundamentals (module_id will be 2)
INSERT INTO education_lessons (module_id, title, description, content, duration, order_index, video_url) VALUES
(2, 'Introduction to Investing', 'Understand the basics of investing and why it''s crucial for building wealth.', 
'<h2>Introduction to Investing</h2>
<p>Investing is one of the most powerful tools for building long-term wealth and achieving financial independence.</p>

<h3>Why Invest?</h3>
<ul>
  <li><strong>Beat Inflation:</strong> Money in savings accounts loses purchasing power over time</li>
  <li><strong>Compound Growth:</strong> Your money earns returns, and those returns earn returns</li>
  <li><strong>Wealth Building:</strong> Historical stock market returns average 7-10% annually</li>
  <li><strong>Financial Goals:</strong> Fund retirement, home purchases, children''s education</li>
</ul>

<h3>The Power of Compound Interest</h3>
<p>Einstein allegedly called compound interest "the eighth wonder of the world." Here''s why:</p>
<ul>
  <li>$100 invested at 7% annual return becomes $196 in 10 years</li>
  <li>The same $100 becomes $761 in 30 years</li>
  <li>Time is your greatest asset when investing</li>
</ul>

<h3>Investment vs. Speculation</h3>
<h4>Investing:</h4>
<ul>
  <li>Long-term wealth building</li>
  <li>Based on research and fundamentals</li>
  <li>Accepts market volatility</li>
  <li>Diversified approach</li>
</ul>

<h4>Speculation:</h4>
<ul>
  <li>Short-term price movements</li>
  <li>Based on timing and luck</li>
  <li>High risk, high reward</li>
  <li>Often concentrated bets</li>
</ul>

<h3>Common Investment Fears</h3>
<ul>
  <li><strong>"I don''t have enough money":</strong> You can start with as little as $50</li>
  <li><strong>"I might lose money":</strong> Diversification and time reduce risk</li>
  <li><strong>"It''s too complicated":</strong> Simple index funds require minimal knowledge</li>
  <li><strong>"I don''t have time":</strong> Automated investing requires minimal maintenance</li>
</ul>

<h3>Before You Invest</h3>
<ol>
  <li>Build an emergency fund (3-6 months expenses)</li>
  <li>Pay off high-interest debt (credit cards)</li>
  <li>Take advantage of employer 401(k) match</li>
  <li>Define your investment goals and timeline</li>
</ol>', 
'30 minutes', 1, 'https://www.youtube.com/watch?v=gFQNPmLKj1k'),

(2, 'Types of Investments', 'Explore different investment options and their characteristics.', 
'<h2>Types of Investments</h2>
<p>Understanding different investment types helps you build a diversified portfolio that matches your goals and risk tolerance.</p>

<h3>Stocks (Equities)</h3>
<p>Ownership shares in companies</p>
<ul>
  <li><strong>Potential Returns:</strong> Historically 7-10% annually</li>
  <li><strong>Risk Level:</strong> Medium to High</li>
  <li><strong>Best For:</strong> Long-term growth, retirement</li>
  <li><strong>Examples:</strong> Apple, Microsoft, index funds</li>
</ul>

<h3>Bonds (Fixed Income)</h3>
<p>Loans to governments or corporations</p>
<ul>
  <li><strong>Potential Returns:</strong> 2-6% annually</li>
  <li><strong>Risk Level:</strong> Low to Medium</li>
  <li><strong>Best For:</strong> Income, portfolio stability</li>
  <li><strong>Examples:</strong> Treasury bonds, corporate bonds, bond funds</li>
</ul>

<h3>Real Estate</h3>
<p>Property investments for income and appreciation</p>
<ul>
  <li><strong>Potential Returns:</strong> 4-8% annually plus income</li>
  <li><strong>Risk Level:</strong> Medium</li>
  <li><strong>Best For:</strong> Diversification, inflation hedge</li>
  <li><strong>Examples:</strong> REITs, rental properties, real estate crowdfunding</li>
</ul>

<h3>Cash and Cash Equivalents</h3>
<p>Low-risk, highly liquid investments</p>
<ul>
  <li><strong>Potential Returns:</strong> 0.5-3% annually</li>
  <li><strong>Risk Level:</strong> Very Low</li>
  <li><strong>Best For:</strong> Emergency funds, short-term goals</li>
  <li><strong>Examples:</strong> Savings accounts, CDs, money market funds</li>
</ul>

<h3>Alternative Investments</h3>
<p>Non-traditional investment options</p>
<ul>
  <li><strong>Commodities:</strong> Gold, oil, agricultural products</li>
  <li><strong>Cryptocurrency:</strong> Bitcoin, Ethereum (high risk)</li>
  <li><strong>Collectibles:</strong> Art, wine, trading cards</li>
  <li><strong>Private Equity:</strong> Investments in private companies</li>
</ul>

<h3>Investment Vehicles</h3>

<h4>Individual Stocks and Bonds</h4>
<ul>
  <li>Direct ownership</li>
  <li>Requires more research and monitoring</li>
  <li>Higher risk due to lack of diversification</li>
</ul>

<h4>Mutual Funds</h4>
<ul>
  <li>Professional management</li>
  <li>Instant diversification</li>
  <li>Higher fees (expense ratios)</li>
</ul>

<h4>Exchange-Traded Funds (ETFs)</h4>
<ul>
  <li>Trade like stocks</li>
  <li>Lower fees than mutual funds</li>
  <li>Great for beginners</li>
</ul>

<h4>Target-Date Funds</h4>
<ul>
  <li>Automatically adjusts allocation based on age</li>
  <li>Perfect for retirement accounts</li>
  <li>Set-it-and-forget-it approach</li>
</ul>', 
'45 minutes', 2, null),

(2, 'Risk and Return', 'Learn about the relationship between investment risk and potential returns.', 
'<h2>Risk and Return</h2>
<p>Understanding the risk-return relationship is fundamental to making informed investment decisions.</p>

<h3>The Risk-Return Spectrum</h3>
<p>Generally, higher potential returns come with higher risk:</p>

<h4>Low Risk, Low Return</h4>
<ul>
  <li>Savings accounts: 0.5-1.5% return</li>
  <li>CDs: 1-3% return</li>
  <li>Treasury bonds: 2-4% return</li>
</ul>

<h4>Medium Risk, Medium Return</h4>
<ul>
  <li>Corporate bonds: 3-6% return</li>
  <li>Dividend stocks: 4-7% return</li>
  <li>Balanced funds: 5-8% return</li>
</ul>

<h4>High Risk, High Return Potential</h4>
<ul>
  <li>Growth stocks: 6-12% return (with high volatility)</li>
  <li>Small-cap stocks: 8-15% return (with high volatility)</li>
  <li>Emerging markets: 10-20% return (with very high volatility)</li>
</ul>

<h3>Types of Investment Risk</h3>

<h4>Market Risk</h4>
<ul>
  <li>Overall market movements affect your investments</li>
  <li>Cannot be eliminated through diversification</li>
  <li>Also called "systematic risk"</li>
</ul>

<h4>Company-Specific Risk</h4>
<ul>
  <li>Risk specific to individual companies</li>
  <li>Can be reduced through diversification</li>
  <li>Examples: poor management, product recalls</li>
</ul>

<h4>Inflation Risk</h4>
<ul>
  <li>Risk that returns won''t keep up with inflation</li>
  <li>Particularly affects bonds and cash</li>
  <li>Stocks historically provide inflation protection</li>
</ul>

<h4>Interest Rate Risk</h4>
<ul>
  <li>Rising interest rates reduce bond values</li>
  <li>Affects dividend stocks and REITs</li>
  <li>Longer-term bonds have higher interest rate risk</li>
</ul>

<h4>Liquidity Risk</h4>
<ul>
  <li>Difficulty selling an investment quickly</li>
  <li>Real estate and some bonds have liquidity risk</li>
  <li>May need to accept lower prices for quick sales</li>
</ul>

<h3>Risk Tolerance Assessment</h3>

<h4>Conservative Investor</h4>
<ul>
  <li>Prioritizes capital preservation</li>
  <li>Comfortable with 2-5% annual returns</li>
  <li>Portfolio: 20% stocks, 80% bonds/cash</li>
</ul>

<h4>Moderate Investor</h4>
<ul>
  <li>Balances growth and stability</li>
  <li>Comfortable with 5-8% annual returns</li>
  <li>Portfolio: 60% stocks, 40% bonds</li>
</ul>

<h4>Aggressive Investor</h4>
<ul>
  <li>Focuses on long-term growth</li>
  <li>Comfortable with 8-12% annual returns</li>
  <li>Portfolio: 80-100% stocks</li>
</ul>

<h3>Managing Risk</h3>

<h4>Diversification</h4>
<ul>
  <li>Don''t put all eggs in one basket</li>
  <li>Spread investments across asset classes</li>
  <li>International diversification</li>
</ul>

<h4>Dollar-Cost Averaging</h4>
<ul>
  <li>Invest a fixed amount regularly</li>
  <li>Reduces impact of market timing</li>
  <li>Builds discipline and consistency</li>
</ul>

<h4>Time Diversification</h4>
<ul>
  <li>Longer time horizons reduce risk</li>
  <li>Market volatility smooths out over time</li>
  <li>More time allows for recovery from losses</li>
</ul>', 
'40 minutes', 3, null),

(2, 'Building a Portfolio', 'Learn how to construct a diversified investment portfolio.', 
'<h2>Building a Portfolio</h2>
<p>A well-constructed portfolio balances risk and return while aligning with your financial goals and timeline.</p>

<h3>Asset Allocation Basics</h3>
<p>Asset allocation is how you divide your investments among different asset classes.</p>

<h4>Age-Based Rule of Thumb</h4>
<ul>
  <li>Stock percentage = 100 - your age</li>
  <li>Age 25: 75% stocks, 25% bonds</li>
  <li>Age 50: 50% stocks, 50% bonds</li>
  <li>Age 70: 30% stocks, 70% bonds</li>
</ul>

<h4>Goal-Based Allocation</h4>
<ul>
  <li><strong>Retirement (20+ years):</strong> 80-90% stocks</li>
  <li><strong>House Down Payment (5 years):</strong> 30-40% stocks</li>
  <li><strong>Emergency Fund:</strong> 100% cash/bonds</li>
</ul>

<h3>Sample Portfolio Allocations</h3>

<h4>Conservative Portfolio</h4>
<ul>
  <li>30% U.S. Stocks</li>
  <li>10% International Stocks</li>
  <li>50% Bonds</li>
  <li>10% Cash/REITs</li>
</ul>

<h4>Moderate Portfolio</h4>
<ul>
  <li>40% U.S. Stocks</li>
  <li>20% International Stocks</li>
  <li>30% Bonds</li>
  <li>10% REITs/Alternatives</li>
</ul>

<h4>Aggressive Portfolio</h4>
<ul>
  <li>60% U.S. Stocks</li>
  <li>30% International Stocks</li>
  <li>5% Bonds</li>
  <li>5% REITs/Alternatives</li>
</ul>

<h3>Implementation Strategies</h3>

<h4>Three-Fund Portfolio (Simple)</h4>
<ul>
  <li>Total Stock Market Index (60%)</li>
  <li>International Stock Index (20%)</li>
  <li>Bond Index (20%)</li>
</ul>

<h4>Target-Date Fund (Simplest)</h4>
<ul>
  <li>Single fund that adjusts allocation automatically</li>
  <li>Choose based on retirement year</li>
  <li>Perfect for beginners</li>
</ul>

<h3>Rebalancing</h3>
<p>Periodically adjust your portfolio back to target allocation</p>

<h4>When to Rebalance</h4>
<ul>
  <li>When allocation drifts 5-10% from target</li>
  <li>Annually or semi-annually</li>
  <li>When adding new money</li>
</ul>

<h4>How to Rebalance</h4>
<ul>
  <li>Sell high-performing assets</li>
  <li>Buy underperforming assets</li>
  <li>Or direct new contributions to underweight assets</li>
</ul>

<h3>Tax Considerations</h3>

<h4>Tax-Advantaged Accounts</h4>
<ul>
  <li><strong>401(k)/403(b):</strong> Traditional or Roth</li>
  <li><strong>IRA:</strong> Traditional or Roth</li>
  <li><strong>HSA:</strong> Triple tax advantage</li>
</ul>

<h4>Asset Location</h4>
<ul>
  <li>Hold tax-inefficient investments in tax-advantaged accounts</li>
  <li>Hold tax-efficient investments in taxable accounts</li>
  <li>Bonds and REITs → tax-advantaged accounts</li>
  <li>Index funds → taxable accounts</li>
</ul>

<h3>Getting Started</h3>
<ol>
  <li>Determine your risk tolerance and time horizon</li>
  <li>Choose target asset allocation</li>
  <li>Select low-cost index funds or ETFs</li>
  <li>Open accounts with reputable brokers</li>
  <li>Set up automatic investments</li>
  <li>Review and rebalance annually</li>
</ol>', 
'45 minutes', 4, null),

(2, 'Investment Accounts and Platforms', 'Understand different types of investment accounts and how to choose a broker.', 
'<h2>Investment Accounts and Platforms</h2>
<p>Choosing the right accounts and platforms can significantly impact your investment success through tax advantages and cost savings.</p>

<h3>Types of Investment Accounts</h3>

<h4>Tax-Advantaged Retirement Accounts</h4>

<h5>401(k) / 403(b) - Employer Plans</h5>
<ul>
  <li><strong>Contribution Limit:</strong> $22,500 (2023), $30,000 if 50+</li>
  <li><strong>Employer Match:</strong> Free money - always contribute enough to get full match</li>
  <li><strong>Traditional:</strong> Tax deduction now, pay taxes in retirement</li>
  <li><strong>Roth:</strong> No deduction now, tax-free in retirement</li>
</ul>

<h5>Individual Retirement Accounts (IRAs)</h5>
<ul>
  <li><strong>Contribution Limit:</strong> $6,500 (2023), $7,500 if 50+</li>
  <li><strong>Traditional IRA:</strong> Tax deduction now, pay taxes in retirement</li>
  <li><strong>Roth IRA:</strong> No deduction now, tax-free in retirement</li>
  <li><strong>Income Limits:</strong> Roth IRA has income limitations</li>
</ul>

<h5>Health Savings Account (HSA)</h5>
<ul>
  <li><strong>Triple Tax Advantage:</strong> Deductible, grows tax-free, tax-free withdrawals for medical</li>
  <li><strong>Contribution Limit:</strong> $3,850 individual, $7,750 family (2023)</li>
  <li><strong>After 65:</strong> Can withdraw for any purpose (pay taxes, no penalty)</li>
</ul>

<h4>Taxable Investment Accounts</h4>
<ul>
  <li><strong>No contribution limits</strong></li>
  <li><strong>No withdrawal restrictions</strong></li>
  <li><strong>Pay taxes on dividends and capital gains</strong></li>
  <li><strong>Good for:</strong> Goals before retirement, after maxing retirement accounts</li>
</ul>

<h3>Choosing an Investment Platform</h3>

<h4>Key Factors to Consider</h4>
<ul>
  <li><strong>Fees:</strong> Trading commissions, account fees, expense ratios</li>
  <li><strong>Investment Options:</strong> Stocks, bonds, funds, international markets</li>
  <li><strong>Minimum Investments:</strong> Account minimums, fund minimums</li>
  <li><strong>User Experience:</strong> Website, mobile app, research tools</li>
  <li><strong>Customer Service:</strong> Phone support, online chat, educational resources</li>
</ul>

<h4>Popular Brokers</h4>

<h5>Full-Service Brokers</h5>
<ul>
  <li><strong>Examples:</strong> Charles Schwab, Fidelity, Vanguard</li>
  <li><strong>Pros:</strong> Comprehensive services, research, personal advice</li>
  <li><strong>Cons:</strong> Higher fees for some services</li>
</ul>

<h5>Discount Brokers</h5>
<ul>
  <li><strong>Examples:</strong> TD Ameritrade, E*TRADE, Interactive Brokers</li>
  <li><strong>Pros:</strong> Lower fees, good trading platforms</li>
  <li><strong>Cons:</strong> Less personal service</li>
</ul>

<h5>Robo-Advisors</h5>
<ul>
  <li><strong>Examples:</strong> Betterment, Wealthfront, Schwab Intelligent Portfolios</li>
  <li><strong>Pros:</strong> Automated investing, low fees, tax-loss harvesting</li>
  <li><strong>Cons:</strong> Limited customization</li>
</ul>

<h3>Account Priority Strategy</h3>
<ol>
  <li><strong>Emergency Fund:</strong> High-yield savings account</li>
  <li><strong>401(k) Match:</strong> Contribute enough to get full employer match</li>
  <li><strong>High-Interest Debt:</strong> Pay off credit cards</li>
  <li><strong>Roth IRA:</strong> Max out if eligible ($6,500)</li>
  <li><strong>Max 401(k):</strong> Up to $22,500 limit</li>
  <li><strong>HSA:</strong> Max out if eligible</li>
  <li><strong>Taxable Account:</strong> Additional investments</li>
</ol>

<h3>Getting Started Checklist</h3>
<ol>
  <li>Research and choose a broker</li>
  <li>Open appropriate account types</li>
  <li>Set up automatic contributions</li>
  <li>Choose initial investments (target-date fund is fine)</li>
  <li>Review and adjust quarterly</li>
</ol>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li>Not taking advantage of employer 401(k) match</li>
  <li>Choosing actively managed funds with high fees</li>
  <li>Trying to time the market</li>
  <li>Not diversifying adequately</li>
  <li>Emotional investing (panic selling, FOMO buying)</li>
  <li>Not investing due to analysis paralysis</li>
</ul>', 
'40 minutes', 5, null);

-- Add some sample quizzes for the first few lessons
INSERT INTO education_quizzes (lesson_id, question, options, correct_option, explanation) VALUES
(1, 'What are the three main categories of expenses in budgeting?', 
 '["Fixed, Variable, Discretionary", "Needs, Wants, Emergency", "Monthly, Weekly, Daily", "Income, Savings, Spending"]', 
 0, 'Fixed expenses stay the same each month, variable expenses change but are necessary, and discretionary expenses are optional.'),

(1, 'Which tracking method is recommended for beginners?', 
 '["Complex spreadsheets", "Mobile apps or simple methods", "Only cash envelopes", "Mental tracking only"]', 
 1, 'Mobile apps or simple methods help beginners establish tracking habits without being overwhelming.'),

(2, 'What is the 50/30/20 budgeting rule?', 
 '["50% savings, 30% needs, 20% wants", "50% needs, 30% wants, 20% savings/debt", "50% wants, 30% needs, 20% emergency", "50% income, 30% expenses, 20% taxes"]', 
 1, 'The 50/30/20 rule allocates 50% for needs, 30% for wants, and 20% for savings and debt payoff.'),

(6, 'What is the main benefit of investing over keeping money in savings?', 
 '["Guaranteed returns", "Beating inflation and compound growth", "No risk involved", "Immediate access to funds"]', 
 1, 'Investing helps beat inflation and provides compound growth over time, unlike low-yield savings accounts.'),

(6, 'What should you do before you start investing?', 
 '["Quit your job", "Build an emergency fund and pay off high-interest debt", "Buy individual stocks immediately", "Wait until you have $10,000"]', 
 1, 'You should have an emergency fund and pay off high-interest debt before investing for long-term goals.');

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar, MessageSquare, Clock, Users, Bookmark, Share2, ArrowRightCircle, PlayCircle } from 'lucide-react';

const News = () => {
  const [activeTab, setActiveTab] = useState('news');

  const newsPosts = [
    {
      id: 1,
      title: "New NIL Rules for College Athletes: What You Need to Know",
      excerpt: "The latest updates on Name, Image, and Likeness regulations and how they affect your earning potential as a student athlete.",
      date: "June 8, 2023",
      readTime: "5 min read",
      category: "NIL Updates",
      image: "https://images.unsplash.com/photo-1569863959165-56c17d5b21b7?w=500&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      id: 2,
      title: "Tax Planning Strategies for Athletes with Multiple Income Streams",
      excerpt: "How to manage taxes efficiently when balancing athletic income, endorsements, and investments.",
      date: "June 5, 2023",
      readTime: "7 min read",
      category: "Tax Planning",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Investment Options for Young Athletes: Start Building Wealth Early",
      excerpt: "The best investment vehicles for athletes looking to secure their financial future while still early in their careers.",
      date: "June 1, 2023",
      readTime: "6 min read",
      category: "Investments",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      title: "Protecting Your Assets: Insurance Options for Athletes",
      excerpt: "A comprehensive guide to different insurance policies that can help safeguard your earning potential and assets.",
      date: "May 28, 2023",
      readTime: "8 min read",
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&auto=format&fit=crop&q=60"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Financial Planning for the Off-Season",
      date: "June 10, 2023",
      duration: "22 minutes",
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Your Athletic Scholarship",
      date: "June 3, 2023",
      duration: "18 minutes",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Building Credit as a Young Athlete",
      date: "May 27, 2023",
      duration: "15 minutes",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60"
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best banks for professional athletes?",
      author: "Marcus J.",
      date: "June 7, 2023",
      replies: 12,
      excerpt: "Looking for recommendations on banks that understand the unique needs of athletes with irregular income patterns."
    },
    {
      id: 2,
      title: "How are you handling NIL deal taxes?",
      author: "Taylor R.",
      date: "June 5, 2023",
      replies: 24,
      excerpt: "Just signed my first NIL deal and trying to figure out the tax implications. Any tips from those who've been through this?"
    },
    {
      id: 3,
      title: "Investment strategies post-career",
      author: "Jordan L.",
      date: "June 2, 2023",
      replies: 18,
      excerpt: "For those transitioning out of active sports, what investment shifts have you made to support long-term financial stability?"
    },
    {
      id: 4,
      title: "Financial advisors specializing in athlete finances",
      author: "Alex K.",
      date: "May 30, 2023",
      replies: 15,
      excerpt: "Can anyone recommend financial advisors who specifically work with college athletes navigating NIL deals?"
    }
  ];

  const tabs = [
    { id: 'news', label: 'News Articles' },
    { id: 'videos', label: 'Video Updates' },
    { id: 'community', label: 'Community Discussion' },
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-50 text-green rounded-full text-xs font-medium mb-2">
                News & Community
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold">Latest Updates</h1>
              <p className="text-green/70 mt-2">Stay informed with financial news relevant to athletes</p>
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={100}>
          <div className="flex overflow-x-auto mb-6 border-b border-green/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 font-medium transition-all
                  ${activeTab === tab.id
                    ? 'text-green border-b-2 border-green'
                    : 'text-green/70 hover:text-green'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* News Articles */}
        {activeTab === 'news' && (
          <>
            {/* Featured Article */}
            <FadeIn delay={200} className="mb-8">
              {newsPosts.filter(post => post.featured).map(featuredPost => (
                <div key={featuredPost.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5">
                  <div className="md:flex">
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col">
                      <div className="flex items-center mb-3">
                        <span className="bg-green-50 text-green text-xs font-semibold px-3 py-1 rounded-full">
                          {featuredPost.category}
                        </span>
                        <span className="text-green/60 text-sm ml-3 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {featuredPost.date}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-semibold mb-3">{featuredPost.title}</h2>
                      <p className="text-green/70 mb-4 flex-grow">{featuredPost.excerpt}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green/60 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.readTime}
                        </span>
                        
                        <button className="flex items-center text-green hover:text-green-600 transition-colors">
                          <span className="mr-1">Read Article</span>
                          <ArrowRightCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </FadeIn>
            
            {/* Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {newsPosts.filter(post => !post.featured).map((post, index) => (
                <FadeIn key={post.id} delay={300 + index * 100}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5 h-full flex flex-col">
                    <div className="h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center mb-3">
                        <span className="bg-green-50 text-green text-xs font-semibold px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-green/60 text-xs ml-2 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-green/70 mb-4 flex-grow">{post.excerpt}</p>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs text-green/60 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </span>
                        
                        <button className="text-sm flex items-center text-green hover:text-green-600 transition-colors">
                          Read More
                          <ArrowRightCircle className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}

        {/* Video Updates */}
        {activeTab === 'videos' && (
          <>
            {/* Featured Video */}
            <FadeIn delay={200} className="mb-8">
              {videos.filter(video => video.featured).map(featuredVideo => (
                <div key={featuredVideo.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5">
                  <div className="relative">
                    <img
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button className="w-16 h-16 rounded-full bg-green/90 text-white flex items-center justify-center hover:bg-green transition-colors button-hover">
                        <PlayCircle className="w-8 h-8" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="bg-green text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured Video
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3">{featuredVideo.title}</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green/60">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{featuredVideo.date}</span>
                      </div>
                      <div className="flex items-center text-green/60">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{featuredVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </FadeIn>
            
            {/* Other Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {videos.filter(video => !video.featured).map((video, index) => (
                <FadeIn key={video.id} delay={300 + index * 100}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button className="w-12 h-12 rounded-full bg-green/90 text-white flex items-center justify-center hover:bg-green transition-colors button-hover">
                          <PlayCircle className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green/60">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className="text-xs">{video.date}</span>
                        </div>
                        <div className="flex items-center text-green/60">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-xs">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}

        {/* Community Discussion */}
        {activeTab === 'community' && (
          <>
            <FadeIn delay={200} className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Community Discussions</h2>
                  <button className="px-4 py-2 bg-green text-white rounded-lg hover:bg-green-600 transition-colors button-hover">
                    New Topic
                  </button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="p-4 border border-green/10 rounded-lg hover:border-green/20 hover:bg-green-50/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{discussion.title}</h3>
                        <div className="flex items-center text-green bg-green-50 px-2 py-0.5 rounded text-sm">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {discussion.replies}
                        </div>
                      </div>
                      
                      <p className="text-green/70 text-sm mb-3">{discussion.excerpt}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-green/60">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{discussion.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{discussion.date}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-1 text-green/60 hover:text-green transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green/60 hover:text-green transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2 text-center text-green border border-green/20 rounded-lg hover:bg-green-50 transition-colors">
                  View All Discussions
                </button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5">
                <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['NIL Deals', 'Investments', 'Tax Planning', 'Budgeting', 'Career Transition', 'Saving Strategies', 'Insurance', 'Retirement'].map((category) => (
                    <button
                      key={category}
                      className="p-3 bg-green-50 text-green rounded-lg text-center hover:bg-green hover:text-white transition-all"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default News;

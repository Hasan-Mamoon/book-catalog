"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@radix-ui/themes";
import { Card} from '@radix-ui/themes'
import { 
  Search, 
  TrendingUp, 
  Users, 
  Star, 
  Heart, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  BookMarked,
  Library,
  Target
} from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signin');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  const features = [
    {
      icon: Sparkles,
      title: "Personalised Catalogue",
      description: "AI-powered recommendations based on your reading history, preferences, and mood. Discover your next favorite book with intelligent suggestions."
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Advanced search with filters by genre, author, rating, and reading time. Find exactly what you're looking for or explore something new."
    },
    {
      icon: BarChart3,
      title: "Reading Analytics",
      description: "Track your reading progress, set goals, and visualize your reading journey with beautiful charts and insights."
    },
    {
      icon: Heart,
      title: "Personal Collections",
      description: "Create custom reading lists, mark favorites, and organize your books into collections that matter to you."
    },
    {
      icon: Users,
      title: "Reading Community",
      description: "Connect with fellow book lovers, share reviews, and discover what others in your network are reading."
    },
    {
      icon: Target,
      title: "Reading Goals",
      description: "Set and achieve reading goals with progress tracking, reminders, and celebrating your milestones."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Readers" },
    { number: "2M+", label: "Books Catalogued" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "15M+", label: "Books Read" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Book Enthusiast",
      content: "This app completely transformed how I discover books. The personalized recommendations are spot-on!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Literature Professor",
      content: "Perfect for managing my extensive reading list. The analytics help me track my reading patterns.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Avid Reader",
      content: "Love the community features. I've discovered so many great books through other readers' recommendations.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Book Discovery
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Library</span>
              <br />
              Reimagined
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover, track, and enjoy your reading journey with AI-powered recommendations, 
              smart analytics, and a vibrant community of book lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="3" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={handleGetStarted}>
                Start Reading Today
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="3" variant="outline" className="px-8 py-3">
                Watch Demo
              </Button>
            </div>

            {/* Hero Image/Illustration Placeholder */}
            <div className="mt-16 relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mx-auto max-w-4xl shadow-2xl">
                <div className="bg-white rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <BookMarked className="h-12 w-12 text-blue-600" />
                    </div>
                    <div className="h-2 bg-blue-200 rounded"></div>
                    <div className="h-2 bg-blue-100 rounded w-3/4"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <Library className="h-12 w-12 text-purple-600" />
                    </div>
                    <div className="h-2 bg-purple-200 rounded"></div>
                    <div className="h-2 bg-purple-100 rounded w-2/3"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-12 w-12 text-indigo-600" />
                    </div>
                    <div className="h-2 bg-indigo-200 rounded"></div>
                    <div className="h-2 bg-indigo-100 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Love Reading
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to enhance your reading experience and help you discover your next favorite book.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
               
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-fit group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
               
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by Readers Everywhere
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied readers who have transformed their reading experience with BookVault.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-0">
               
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Reading Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of readers who have already discovered their next favorite books with BookVault.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="4" onClick={handleGetStarted}>
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="4" color="blue" variant="soft">
              Learn More
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Free forever plan
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No credit card required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}
// src/app/(public)/blog/page.tsx
"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { LatestContent } from '@/components/home/widgets/LatestContent'
import { useState } from 'react'
import { Search, Calendar, User, Tag, ChevronRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const categories = [
  { id: 'all', name: 'All Posts', count: 24 },
  { id: 'spotlights', name: 'Artist Spotlights', count: 8 },
  { id: 'industry', name: 'Industry Insights', count: 6 },
  { id: 'behind', name: 'Behind the Scenes', count: 5 },
  { id: 'events', name: 'Events & Tours', count: 3 },
  { id: 'tutorials', name: 'Music Tutorials', count: 2 },
]

const featuredPost = {
  id: 1,
  title: "The Rise of African Female Producers: Breaking the Glass Ceiling",
  excerpt: "An in-depth look at how African women are taking control behind the mixing boards and shaping the sound of contemporary African music.",
  category: "Industry Insights",
  author: "Amina Diallo",
  date: "Feb 12, 2026",
  readTime: "8 min read",
  featuredImage: "/api/placeholder/800/400",
}

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { currentDesign } = useDesign()

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          currentDesign === 'editorial' && "bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-black",
          currentDesign === 'gallery' && "bg-gradient-to-b from-black via-red-900/20 to-black",
          currentDesign === 'dynamic' && "bg-gradient-to-b from-black via-red-950/30 to-black"
        )} />
        
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30">
              <BookOpen className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Afroqueens Blog</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stories from the <span className="text-red-600">Frontline</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Dive into artist spotlights, industry insights, behind-the-scenes content, 
              and music tutorials from the Afroqueens universe.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, tutorials, or artist stories..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-3xl overflow-hidden",
              currentDesign === 'editorial' && "bg-gradient-to-r from-red-600 to-red-800",
              currentDesign === 'gallery' && "bg-gradient-to-r from-red-900 to-black",
              currentDesign === 'dynamic' && "bg-gradient-to-r from-red-800 via-red-900 to-black"
            )}
          >
            <div className="grid md:grid-cols-2">
              {/* Content */}
              <div className="p-8 md:p-12 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <span className="text-sm font-medium">Featured Post</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-red-100 mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className="text-sm text-red-200">{featuredPost.readTime}</div>
                </div>
                
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Read Article
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Image */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-red-900/50 to-red-900/80" />
                <div className="h-full bg-gradient-to-br from-red-600/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className={cn(
                "rounded-2xl p-6 sticky top-24",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                        selectedCategory === category.id
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <span>{category.name}</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        selectedCategory === category.id
                          ? "bg-white/20"
                          : "bg-gray-200 dark:bg-gray-800"
                      )}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-bold mb-3">Stay Updated</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Get the latest articles delivered to your inbox
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 text-sm"
                    />
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <select className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900">
                  <option>Sort by: Latest</option>
                  <option>Sort by: Popular</option>
                  <option>Sort by: Featured</option>
                </select>
              </div>

              <LatestContent 
                layout="grid"
                variant={currentDesign === 'gallery' || currentDesign === 'dynamic' ? 'dark' : 'light'}
              />

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        num === 1
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={cn(
            "rounded-3xl p-8 md:p-12 text-center",
            currentDesign === 'editorial' && "bg-gradient-to-r from-red-600 to-red-800",
            currentDesign === 'gallery' && "bg-gradient-to-r from-red-900 to-black",
            currentDesign === 'dynamic' && "bg-gradient-to-r from-red-800 via-red-900 to-black"
          )}>
            <h2 className="text-3xl font-bold text-white mb-4">Want to Write for Us?</h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Are you passionate about African music and women's empowerment? 
              We're always looking for talented writers to contribute to our blog.
            </p>
            <button className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Submit Pitch
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
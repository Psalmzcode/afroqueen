"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { motion } from 'framer-motion'
import { 
  Target, 
  Users, 
  Globe, 
  Award, 
  Mic2, 
  Music,
  Heart,
  TrendingUp,
  PlayCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const missionPoints = [
  {
    icon: Target,
    title: "70% Female Representation",
    description: "Our #FEMUP70% initiative ensures at least 70% female participation in all aspects of the music industry we influence."
  },
  {
    icon: Users,
    title: "Mentorship & Collaboration",
    description: "Pairing emerging artists with established mentors for guidance, skill development, and collaborative opportunities."
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Platforming African female talent on international stages through digital distribution and global partnerships."
  },
  {
    icon: Award,
    title: "Career Development",
    description: "Providing resources, training, and opportunities for sustainable careers in the music industry."
  }
]

const teamMembers = [
  {
    name: "Amina Diallo",
    role: "Founder & Executive Producer",
    image: "/api/placeholder/400/400",
    bio: "Former music executive with 15+ years experience in African music industry."
  },
  {
    name: "Chidi Okeke",
    role: "Creative Director",
    image: "/api/placeholder/400/400",
    bio: "Award-winning director specializing in music documentaries and artist development."
  },
  {
    name: "Fatima Bello",
    role: "Artist Relations",
    image: "/api/placeholder/400/400",
    bio: "Former artist manager with extensive network across African music scenes."
  },
  {
    name: "Kwame Mensah",
    role: "Technical Producer",
    image: "/api/placeholder/400/400",
    bio: "Audio engineer and producer with credits on multiple platinum records."
  }
]

const impactStats = [
  { icon: Mic2, value: "50+", label: "Artists Featured" },
  { icon: Music, value: "100M+", label: "Streams Generated" },
  { icon: Globe, value: "25+", label: "Countries Reached" },
  { icon: Award, value: "15+", label: "Awards & Nominations" },
  { icon: Heart, value: "200K+", label: "Community Members" },
  { icon: TrendingUp, value: "70%", label: "Female Representation" },
]

export default function AboutPage() {
  const { currentDesign } = useDesign()

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={cn(
            "absolute inset-0",
            currentDesign === 'editorial' && "bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-black",
            currentDesign === 'gallery' && "bg-gradient-to-b from-black via-red-900/30 to-black",
            currentDesign === 'dynamic' && "bg-gradient-to-b from-black via-red-950/50 to-black"
          )} />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30">
              <Target className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">#FEMUP70%</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className={cn(
                currentDesign === 'gallery' ? "text-white" : "text-black dark:text-white"
              )}>
                Amplifying
              </span>
              <span className="text-red-600 ml-3">African Female Voices</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Afroqueens is a revolutionary platform dedicated to elevating African female 
              musical talent through mentorship, collaboration, and global exposure. 
              We're changing the narrative, one artist at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors">
                Meet Our Artists
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-colors">
                Watch Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in creating sustainable pathways for African women in music through 
              comprehensive support systems and strategic partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-2xl border",
                  currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                  currentDesign === 'gallery' && "bg-gray-900 border-gray-800",
                  currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border-gray-800"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className={cn(
        "py-16",
        currentDesign === 'editorial' && "bg-gray-50 dark:bg-gray-900",
        currentDesign === 'gallery' && "bg-black",
        currentDesign === 'dynamic' && "bg-gradient-to-r from-red-900/20 to-black"
      )}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/10 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet The Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Passionate professionals dedicated to changing the African music landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={cn(
                  "rounded-2xl overflow-hidden mb-4",
                  currentDesign === 'editorial' && "bg-gray-200 dark:bg-gray-800",
                  currentDesign === 'gallery' && "bg-gray-800",
                  currentDesign === 'dynamic' && "bg-gradient-to-b from-gray-800 to-black"
                )}>
                  <div className="aspect-square bg-gradient-to-br from-red-600/20 to-transparent" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <div className="text-red-600 font-medium mb-2">{member.role}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
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
            <PlayCircle className="h-16 w-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make an Impact?</h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Join our movement to amplify African female voices. Whether you're an artist, 
              supporter, or partner, there's a place for you in the Afroqueens community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Apply as Artist
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}


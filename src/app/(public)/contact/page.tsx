"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@afroqueens.com", "partners@afroqueens.com", "artists@afroqueens.com"],
    description: "For general inquiries, partnerships, and artist applications"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+234 800 000 0000"],
    description: "Available Monday-Friday, 9AM-6PM WAT"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Music Avenue, Lagos, Nigeria", "456 Creative Hub, Accra, Ghana"],
    description: "Main offices in Lagos and Accra"
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
    description: "West Africa Time (WAT)"
  }
]

const socialMedia = [
  { icon: Instagram, label: "@afroqueens", handle: "@afroqueens", followers: "150K" },
  { icon: Twitter, label: "@afroqueensHQ", handle: "@afroqueensHQ", followers: "85K" },
  { icon: Facebook, label: "Afroqueens", handle: "Afroqueens", followers: "120K" },
  { icon: Youtube, label: "Afroqueens TV", handle: "AfroqueensTV", followers: "200K" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { currentDesign } = useDesign()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-red-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Whether you're an artist, partner, or supporter, we'd love to hear from you. 
              Let's collaborate to amplify African female voices together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-2xl",
                  currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                  currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                  currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={cn(
                "rounded-2xl p-6 md:p-8",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for reaching out. We'll get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="artist">Artist Application</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="technical">Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors",
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      )}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Social Media & FAQ */}
            <div className="space-y-6">
              {/* Social Media */}
              <div className={cn(
                "rounded-2xl p-6",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="space-y-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                          <social.icon className="h-5 w-5 text-red-600 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{social.label}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{social.handle}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{social.followers}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick FAQ */}
              <div className={cn(
                "rounded-2xl p-6",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h3 className="text-xl font-bold mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">How do I apply as an artist?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visit our Artists page and click "Apply Now" or email artists@afroqueens.com
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">What's the response time?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We typically respond within 24-48 hours for general inquiries.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Do you accept sponsorships?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Yes! Email partners@afroqueens.com for partnership opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={cn(
            "rounded-2xl overflow-hidden",
            currentDesign === 'editorial' && "border border-gray-200 dark:border-gray-800",
            currentDesign === 'gallery' && "border border-gray-800",
            currentDesign === 'dynamic' && "border border-gray-800"
          )}>
            <div className="h-64 bg-gradient-to-r from-red-600/10 to-red-800/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Locations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lagos, Nigeria • Accra, Ghana • Global Network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
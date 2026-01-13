"use client"

import { Facebook, Instagram, Twitter, Youtube, Music } from 'lucide-react'
import Link from 'next/link'
import { NewsletterWidget } from '@/components/home/widgets/NewsletterWidget'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const footerLinks = {
  Platform: [
    { name: 'About Us', href: '/about' },
    { name: 'Artists', href: '/artists' },
    { name: 'Episodes', href: '/episodes' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
  ],
  Support: [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  Connect: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'YouTube', href: 'https://youtube.com' },
  ]
}

export function Footer() {
  const { currentDesign } = useDesign()

  return (
    <footer className={cn(
      "mt-auto",
      currentDesign === 'editorial' && "bg-gray-50 dark:bg-gray-900",
      currentDesign === 'gallery' && "bg-black border-t border-gray-800",
      currentDesign === 'dynamic' && "bg-gradient-to-b from-black to-red-950/50"
    )}>
      {/* Newsletter Section */}
      <div className={cn(
        "py-12",
        currentDesign === 'editorial' && "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-black",
        currentDesign === 'gallery' && "bg-gradient-to-r from-red-900/20 to-black",
        currentDesign === 'dynamic' && "bg-gradient-to-r from-red-900/30 to-black"
      )}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to get updates on new artists, episodes, and exclusive content
            </p>
            <NewsletterWidget />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    <span className="text-black dark:text-white">Afro</span>
                    <span className="text-red-600">Queens</span>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Amplifying African female voices
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Empowering the next generation of African female musical talent through mentorship, 
                collaboration, and global exposure.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Youtube, label: 'YouTube' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-lg mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Afroqueens. All rights reserved. 
              <span className="text-red-600 font-bold ml-2">#FEMUP70%</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


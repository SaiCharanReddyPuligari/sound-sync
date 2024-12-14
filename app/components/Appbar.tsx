"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { RetroButton, RetroCard, WavyDivider, RetroHeading } from '@/app/components/retro-elements'
import { SoundSyncLogo } from '@/app/components/logo'
import { Github, ListMusic, ThumbsUp, ThumbsDown, Music, Users, Headphones, Check, ArrowRight } from 'lucide-react'

export default function Appbar() {
  const session= useSession();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="transform hover:scale-105 transition-transform">
            <SoundSyncLogo />
          </Link>
          <nav className="space-x-6 font-bold">
            <Link href="#features" className="hover:underline underline-offset-4">Features</Link>
            <Link href="#pricing" className="hover:underline underline-offset-4">Pricing</Link>
            <Link href="#about" className="hover:underline underline-offset-4">About</Link>
            <Link href="#contact" className="hover:underline underline-offset-4">Contact</Link>
            {session.data?.user && <button className= "hover:underline underline-offset-40" onClick={()=>signOut()}>Logout</button>} 
            {!session.data?.user && <button className= "hover:underline underline-offset-40" onClick={()=>signIn()}>SignIn</button>}
            <Link 
              href="https://github.com/SaiCharanReddyPuligari/sound-sync" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border-2 border-black p-1 hover:bg-black hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.4" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Sync Your Sound,
            <br />
            Shape the Playlist
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Create, vote, and discover playlists that evolve with the community's taste.
          </p>
          <div className="flex justify-center space-x-6">
            <RetroButton variant="secondary">
              Get Started
            </RetroButton>
            <RetroButton variant="primary" className="flex items-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </RetroButton>
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <RetroHeading>Key Features</RetroHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ListMusic className="w-12 h-12" />,
                title: "Create Playlists",
                description: "Curate and share your unique music collections with the community."
              },
              {
                icon: <ThumbsUp className="w-12 h-12" />,
                title: "Upvote Favorites",
                description: "Push the best tracks to the top by upvoting your favorites."
              },
              {
                icon: <ThumbsDown className="w-12 h-12" />,
                title: "Downvote to Refine",
                description: "Help improve playlists by downvoting mismatched tracks."
              }
            ].map((feature, index) => (
              <RetroCard key={index} className="text-center transform hover:-translate-y-1 transition-transform">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </RetroCard>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* How It Works Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <RetroHeading>How It Works</RetroHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music className="w-16 h-16" />,
                title: "1. Create a Playlist",
                description: "Curate your perfect playlist and share it with the community."
              },
              {
                icon: <Users className="w-16 h-16" />,
                title: "2. Community Votes",
                description: "Users upvote or downvote songs in the playlist."
              },
              {
                icon: <Headphones className="w-16 h-16" />,
                title: "3. Playlist Evolves",
                description: "Top-voted songs rise to the top, creating a community-curated experience."
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 border-2 border-white transform rotate-45" />
                  <div className="relative z-10">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <RetroHeading>Choose Your Plan</RetroHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Free",
                features: [
                  "Discover playlists",
                  "Vote on tracks",
                  "Limited playlist creation"
                ],
                buttonText: "Start Free"
              },
              {
                title: "Premium",
                features: [
                  "All Free features",
                  "Unlimited playlist creation",
                  "Advanced analytics",
                  "Ad-free experience"
                ],
                buttonText: "Go Premium"
              }
            ].map((plan, index) => (
              <RetroCard key={index} className="transform hover:-translate-y-1 transition-transform">
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <RetroButton variant={index === 0 ? 'primary' : 'secondary'} className="w-full">
                  {plan.buttonText}
                </RetroButton>
              </RetroCard>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* About Section */}
      <section id="about" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <RetroHeading>About SoundSync</RetroHeading>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 border-2 border-white transform translate-x-4 translate-y-4" />
            <p className="relative z-10 p-8 border-2 border-white text-center text-lg">
              SoundSync is a revolutionary platform that brings music lovers together. 
              We believe in the power of community-driven playlists, where every vote 
              shapes the listening experience. Our mission is to create a dynamic space 
              where music discovery is collaborative, exciting, and always evolving.
            </p>
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* Contact Section */}
      {/* <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <RetroHeading>Contact Us</RetroHeading>
          </div>
          <div className="max-w-md mx-auto">
            <RetroCard>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black" 
                />
                <textarea 
                  placeholder="Message" 
                  rows={4} 
                  className="w-full p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                <RetroButton variant="primary" className="w-full">
                  Send Message
                </RetroButton>
              </form>
            </RetroCard>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t-2 border-black py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2023 SoundSync. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:underline underline-offset-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline underline-offset-4">Terms of Service</Link>
            <Link href="#contact" className="hover:underline underline-offset-4">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


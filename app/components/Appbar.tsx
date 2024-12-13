"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
//import { Github, Music, ThumbsUp, ThumbsDown, Check, Headphones, ListMusic, Users } from 'lucide-react'
import { SoundSyncLogo } from './logo'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Music, ThumbsUp, ThumbsDown, Check, Headphones, ListMusic, Users } from "lucide-react";

export function Appbar(){
    const session = useSession();
    return <div>
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <header className="border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                <SoundSyncLogo />
              </Link>
              <nav className="space-x-4">
                <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                <Link href="#about" className="text-gray-300 hover:text-white">About</Link>
                <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
                {session.data?.user && <button onClick={()=>signOut()}>Logout</button>}
                {!session.data?.user && <button onClick={()=>signIn()}>SignIn</button>}
                <Link href="https://github.com/yourusername/soundsync" target="_blank" rel="noopener noreferrer">
                  <Github className="inline-block w-6 h-6" />
                </Link>
              </nav>
            </div>
          </header>
          <section className="py-20 text-center bg-gradient-to-b from-black to-gray-900">
            <h1 className="text-5xl font-bold mb-6">Sync Your Sound, Shape the Playlist</h1>
            <p className="text-xl mb-8 text-gray-400">Create, vote, and discover playlists that evolve with the community's taste.</p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
              Get Started
            </Button>
          </section>
    
          {/* Features Section */}
          <section id="features" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white border-gray-700">
                  <CardContent className="p-6 text-center">
                    <ListMusic className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Create Playlists</h3>
                    <p className="text-gray-800">Curate and share your unique music collections with the community.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-gray-700">
                  <CardContent className="p-6 text-center">
                    <ThumbsUp className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Upvote Favorites</h3>
                    <p className="text-gray-800">Push the best tracks to the top by upvoting your favorites.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-gray-700">
                  <CardContent className="p-6 text-center">
                    <ThumbsDown className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Downvote to Refine</h3>
                    <p className="text-gray-800">Help improve playlists by downvoting mismatched tracks.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
    
          {/* How It Works Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Music className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">1. Create a Playlist</h3>
                  <p className="text-gray-400">Curate your perfect playlist and share it with the community.</p>
                </div>
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">2. Community Votes</h3>
                  <p className="text-gray-400">Users upvote or downvote songs in the playlist.</p>
                </div>
                <div className="text-center">
                  <Headphones className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">3. Playlist Evolves</h3>
                  <p className="text-gray-400">Top-voted songs rise to the top, creating a community-curated experience.</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Free</h3>
                    <ul className="space-y-2 mb-6 text-gray-400">
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Discover playlists</li>
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Vote on tracks</li>
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Limited playlist creation</li>
                    </ul>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out">Start Free</Button>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Premium</h3>
                    <ul className="space-y-2 mb-6 text-gray-400">
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> All Free features</li>
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Unlimited playlist creation</li>
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Advanced analytics</li>
                      <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Ad-free experience</li>
                    </ul>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 transition duration-300 ease-in-out">Go Premium</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
    
          {/* About Section */}
          <section id="about" className="py-20 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">About SoundSync</h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto">
                SoundSync is a revolutionary platform that brings music lovers together. We believe in the power of community-driven playlists, where every vote shapes the listening experience. Our mission is to create a dynamic space where music discovery is collaborative, exciting, and always evolving.
              </p>
            </div>
          </section>
    
          {/* Contact Section */}
          <section id="contact" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
              <div className="max-w-md mx-auto">
                <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
                  <input type="email" placeholder="Email" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
                  <textarea placeholder="Message" rows={4} className="w-full p-2 bg-gray-800 border border-gray-700 rounded"></textarea>
                  {!session.data?.user && <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition duration-300 ease-in-out">Send Message</Button>}
                </form>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="border-t border-gray-800 py-8 bg-black">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-400">&copy; 2023 SoundSync. All rights reserved.</p>
              <div className="mt-4">
                <Link href="/privacy" className="text-gray-400 hover:text-white mr-4">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white mr-4">Terms of Service</Link>
                <Link href="#contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </div>
            </div>
          </footer>
        </div>
        </div>
}
'use client'

import { useState, useEffect } from 'react'
import { RetroCard, RetroButton, RetroInput, RetroHeading } from '@/app/components/retro-elements'
import { ShareButton } from '@/app/components/share-button'
import { ThumbsUp, ThumbsDown, Loader } from 'lucide-react'

interface Stream {
  id: string
  title: string
  videoUrl: string
  upvotes: number
}

const Refresh_Interval_ms = 3000 // 30 seconds

export default function VotingPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [streams, setStreams] = useState<Stream[]>([])
  const [currentStream, setCurrentStream] = useState<Stream | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function refreshStreams() {
    try {
      const res = await fetch('/api/streams/my', {
        credentials: "include"
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch streams');
      }
      
      const data = await res.json();
      setStreams(data.streams);
      
      if (data.streams.length > 0 && !currentStream) {
        setCurrentStream(data.streams[0]);
      }
      
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching streams:', err);
      setError('Failed to load streams. Please try again later.');
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(refreshStreams, Refresh_Interval_ms);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(videoUrl)
    if (videoId) {
      // In a real application, you'd send this to your backend
      // For now, we'll just add it to the local state
      const newStream: Stream = {
        id: Date.now().toString(), // temporary ID
        title: 'New Stream',
        videoUrl: videoUrl,
        upvotes: 0
      }
      setStreams([...streams, newStream])
      setVideoUrl('')
    }
  }

  const handleVote = async (id: string, increment: number) => {
    // In a real application, you'd send this to your backend
    // For now, we'll just update the local state
    setStreams(streams.map(stream => 
      stream.id === id ? { ...stream, upvotes: stream.upvotes + increment } : stream
    ).sort((a, b) => b.upvotes - a.upvotes))
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <RetroCard>
          <p className="text-xl font-bold mb-4">{error}</p>
          <RetroButton onClick={refreshStreams}>Try Again</RetroButton>
        </RetroCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="flex justify-between items-center mb-8">
        <RetroHeading>SoundSync Voting</RetroHeading>
        <ShareButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Currently Playing</h2>
          <RetroCard className="aspect-video">
            {currentStream ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractVideoId(currentStream.videoUrl)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-xl font-bold">No stream currently playing</p>
              </div>
            )}
          </RetroCard>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Add to Queue</h2>
          <RetroCard>
            <form onSubmit={handleSubmit} className="space-y-4">
              <RetroInput
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
              />
              <RetroButton type="submit" className="w-full">
                Add to Queue
              </RetroButton>
            </form>
            {videoUrl && extractVideoId(videoUrl) && (
              <div className="mt-4 aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </RetroCard>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Streams</h2>
        <RetroCard>
          {streams.length > 0 ? (
            <ul className="space-y-4">
              {streams.map((stream) => (
                <li key={stream.id} className="flex items-center justify-between p-2 border-b-2 border-black last:border-b-0">
                  <span className="font-bold">{stream.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{stream.upvotes}</span>
                    <RetroButton onClick={() => handleVote(stream.id, 1)} className="p-2">
                      <ThumbsUp className="w-5 h-5" />
                    </RetroButton>
                    <RetroButton onClick={() => handleVote(stream.id, -1)} className="p-2">
                      <ThumbsDown className="w-5 h-5" />
                    </RetroButton>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-4">No streams in the queue</p>
          )}
        </RetroCard>
      </div>
    </div>
  )
}


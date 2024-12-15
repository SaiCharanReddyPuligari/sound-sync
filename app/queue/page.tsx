'use client'

import { useState } from 'react';
import { VideoSubmissionForm } from '@/app/components/video-submission-form';
import { VideoQueue } from '@/app/components/video-queue';
import { VideoPlayer } from '@/app/components/video-player';
import { RetroHeading, WavyDivider, RetroButton } from '@/app/components/retro-elements';

interface Video {
  id: string;
  title: string;
  votes: number;
}

export default function QueuePage() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [queue, setQueue] = useState<Video[]>([]);

  const handleSubmit = async (videoId: string) => {
    // In a real application, you'd fetch the video title from YouTube API
    const newVideo: Video = { id: videoId, title: `Video ${videoId}`, votes: 0 };
    setQueue([...queue, newVideo]);
  };

  const handleVote = (id: string, direction: 'up' | 'down') => {
    setQueue(queue.map(video => 
      video.id === id 
        ? { ...video, votes: video.votes + (direction === 'up' ? 1 : -1) }
        : video
    ).sort((a, b) => b.votes - a.votes));
  };

  const playNextVideo = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id);
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <RetroHeading>SoundSync Queue</RetroHeading>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Video</h2>
          {currentVideo ? (
            <VideoPlayer videoId={currentVideo} />
          ) : (
            <div className="bg-gray-200 aspect-w-16 aspect-h-9 flex items-center justify-center border-2 border-black">
              <p className="text-xl font-bold">No video playing</p>
            </div>
          )}
        </section>

        <WavyDivider />

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Submit a Video</h2>
          <VideoSubmissionForm onSubmit={handleSubmit} />
        </section>

        <WavyDivider />

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Videos</h2>
          <VideoQueue videos={queue} onVote={handleVote} />
        </section>

        <div className="mt-8 text-center">
          <RetroButton onClick={playNextVideo} disabled={queue.length === 0}>
            Play Next Video
          </RetroButton>
        </div>
      </main>
    </div>
  );
}


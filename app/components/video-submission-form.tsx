import { useState } from 'react';
import { getYouTubeVideoId, getYouTubeThumbnailUrl } from "@/lib/youtube";
import { RetroButton } from './retro-elements';

export function VideoSubmissionForm({ onSubmit }: { onSubmit: (videoId: string) => void }) {
  const [url, setUrl] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      onSubmit(videoId);
      setUrl('');
      setPreviewId(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    const videoId = getYouTubeVideoId(e.target.value);
    setPreviewId(videoId);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter YouTube URL"
          className="flex-grow p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
        <RetroButton type="submit" disabled={!previewId}>
          Submit
        </RetroButton>
      </div>
      {previewId && (
        <div className="mt-4">
          <img
            src={getYouTubeThumbnailUrl(previewId)}
            alt="Video thumbnail"
            className="w-full max-w-md mx-auto border-2 border-black"
          />
        </div>
      )}
    </form>
  );
}


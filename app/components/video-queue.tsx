import { RetroButton } from './retro-elements';
import {getYouTubeThumbnailUrl} from "@/lib/youtube"

interface Video {
  id: string;
  title: string;
  votes: number;
}

export function VideoQueue({ videos, onVote }: { videos: Video[], onVote: (id: string, direction: 'up' | 'down') => void }) {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="flex items-center space-x-4 p-4 border-2 border-black">
          <img
            src={getYouTubeThumbnailUrl(video.id)}
            alt={video.title}
            className="w-24 h-18 object-cover border border-black"
          />
          <div className="flex-grow">
            <h3 className="font-bold">{video.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <RetroButton onClick={() => onVote(video.id, 'up')} className="px-2 py-1">
              ▲
            </RetroButton>
            <span className="font-bold">{video.votes}</span>
            <RetroButton onClick={() => onVote(video.id, 'down')} className="px-2 py-1">
              ▼
            </RetroButton>
          </div>
        </div>
      ))}
    </div>
  );
}


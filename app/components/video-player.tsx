export function VideoPlayer({ videoId }: { videoId: string }) {
    return (
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-2 border-black"
        ></iframe>
      </div>
    );
  }
  
  
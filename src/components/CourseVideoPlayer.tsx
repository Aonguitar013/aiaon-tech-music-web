'use client';

import React from 'react';

interface CourseVideoPlayerProps {
  videoUrl: string;
}

export function CourseVideoPlayer({ videoUrl }: CourseVideoPlayerProps) {
  // Simple check for youtube URLs
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  return (
    <div className="w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {isYouTube ? (
          <iframe
            src={videoUrl}
            title="Course Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        ) : (
          <video
            src={videoUrl}
            controls
            className="absolute top-0 left-0 w-full h-full"
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  type?: string;
  poster?: string;
  label: string;
};

export default function LazyVideo({ src, type, poster, label }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.src = src;
        video.preload = "auto";
        video.load();
        void video.play().catch(() => undefined);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video ref={videoRef} muted loop playsInline preload="none" poster={poster} aria-label={label} data-video-type={type} />
  );
}

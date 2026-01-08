import { useRef, useEffect } from "react";
import { iMiniVideoPanelProps } from "../../interfaces";

export function MiniVideoPanel({ stream }: iMiniVideoPanelProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) stream.attachToElement(ref.current);
  }, [stream]);

  return (
    <div className="relative rounded-lg border border-white/30 overflow-hidden">
      <video
        ref={ref}
        autoPlay
        playsInline
        className="h-full w-auto min-w-full object-cover"
      />

      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-3 py-1 rounded-md backdrop-blur-sm">
        {stream.ownerName}
      </div>
    </div>
  );
}

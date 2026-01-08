import { useEffect, useRef } from "react";
import { iStreamsDrawerProps } from "../../interfaces";
import { MiniVideoPanel } from "./MiniVideoPanel";

export function StreamPanel({ streams, setStreams }: iStreamsDrawerProps) {
  const MAX_COLS = 4;
  const MAX_ROWS = 3;
  const MAX_ITEMS = MAX_COLS * MAX_ROWS;
  const visibleStreams = streams.slice(0, MAX_ITEMS);

  useEffect(() => {
    //Look for our localStream
    streams.forEach((stream, index) => {
      if (stream.ownerId === "") {
        stream.localMuteAudio();
      } else {
        stream.localUnmuteAudio();
      }
    });

    console.log(streams.length);
  }, [streams]);

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
      <div
        className="
      grid grid-cols-4 grid-rows-3 gap-2
      sm:grid-cols-2 lg:grid-cols-4

      w-full max-w-[90%]
      h-full max-h-[75vh]
    "
      >
        {visibleStreams.map((stream, index) => (
          <MiniVideoPanel key={index} stream={stream} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { iStreamsDrawerProps } from "../../interfaces";
import { MiniVideoPanel } from "./MiniVideoPanel";

export function StreamPanel({ streams, setStreams }: iStreamsDrawerProps) {
  useEffect(() => {
    //Look for our localStream
    streams.forEach((stream, index) => {
      if (stream.ownerId === "") {
        stream.localMuteAudio();
      } else {
        stream.localUnmuteAudio();
      }
    });

    console.log(streams);
  }, [streams]);

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* remplacer par w-fit et centrer apres l'element*/}
      {streams.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-black/60 backdrop-blur-sm p-2 flex gap-2 overflow-x-auto">
          {streams.slice(1).map((stream, index) => (
            <MiniVideoPanel stream={stream} key={index}></MiniVideoPanel>
          ))}
        </div>
      )}
    </div>
  );
}

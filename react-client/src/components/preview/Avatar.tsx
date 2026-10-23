import { DeviceManager, Stream } from "mitmi";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MicOff, VideoOff, Mic, Video, ChevronDown } from "lucide-react";
import { iAvatar } from "../../interfaces";

export function Avatar({ localStreamRef, stream }: iAvatar) {
  const [isAudioEnable, setIsAudioEnable] = useState<Boolean>(false);
  const [isVideoEnable, setIsVideoEnable] = useState<Boolean>(false);

  function switchAudio() {
    setIsAudioEnable((prev) => !prev);
    if (isAudioEnable) {
      stream?.globalMuteAudio();
    } else {
      stream?.globalUnmuteAudio();
    }
  }

  function switchVideo() {
    setIsVideoEnable((prev) => !prev);
    if (isVideoEnable) {
      stream?.globalMuteVideo();
    } else {
      stream?.globalUnmuteVideo();
    }
  }

  function showWarning(type: "audio" | "video") {
    if (type == "audio" && !isAudioEnable) {
      return (
        <span
          className="
            absolute -right-1 -top-1
            w-6 h-6
            rounded-full
            bg-[#ff4549]
            text-white
            text-[11px]
            flex items-center justify-center
          "
        >
          !
        </span>
      );
    }

    if (type == "video" && !isVideoEnable) {
      return (
        <span
          className="
            absolute -right-1 -top-1
            w-6 h-6
            rounded-full
            bg-[#ff4549]
            text-white
            text-[11px]
            flex items-center justify-center
          "
        >
          !
        </span>
      );
    }
  }

  return (
    <div className="relative">
      <div
        className="
    relative
    h-[370px]
    rounded-[32px]
    bg-gradient-to-b from-[#5a3e30] to-[#35241c]
    overflow-hidden
  "
      >
        {/* Vidéo */}
        <video
          ref={localStreamRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          playsInline
        />

        {/* Avatar */}
        <div className="absolute inset-0 flex items-center justify-center z-5">
          <div className="w-20 h-20 rounded-full bg-[#ffb15b]" />
        </div>

        {/* Contrôles */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {/* Micro */}
          <div className="relative">
            <button
              className="
          w-[54px] h-[54px]
          rounded-full
          border border-[#77706c]
          bg-[#44372f]/70
          flex items-center justify-center
          text-white
          hover:bg-[#51433a]
          transition
        "
              onClick={() => {
                switchAudio();
              }}
            >
              <MicOff size={21} strokeWidth={1.8} />
            </button>
            {showWarning("audio")}
          </div>

          {/* Caméra */}
          <div className="relative">
            <button
              className="
          w-[54px] h-[54px]
          rounded-full
          border border-[#77706c]
          bg-[#44372f]/70
          flex items-center justify-center
          text-white
          hover:bg-[#51433a]
          transition
        "
              onClick={() => {
                switchVideo();
              }}
            >
              <VideoOff size={21} strokeWidth={1.8} />
            </button>
            {showWarning("video")}
          </div>
        </div>
      </div>
    </div>
  );
}

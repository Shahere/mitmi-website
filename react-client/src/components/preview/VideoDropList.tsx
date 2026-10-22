import { DeviceManager, Stream } from "mitmi";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MicOff, VideoOff, Mic, Video, ChevronDown } from "lucide-react";
import { iVideoDropList } from "../../interfaces";

export function VideoDropList({ setStream, videoInput }: iVideoDropList) {
  const [deviceManager, _] = useState<DeviceManager>(
    DeviceManager.createInstance(),
  );
  const [stringCurrentVideoInput, setStringCurrentVideoInput] = useState(
    "Autorisations non accordées.",
  );
  const [isVideoListOpen, setIsVideoListOpen] = useState(false);

  async function changeVideoInput(selectedDevice: MediaDeviceInfo) {
    if (!deviceManager) return;
    const newStream = await deviceManager.changeVideoDevice(selectedDevice);
    setStream(newStream);
  }

  return (
    <div className="relative">
      {isVideoListOpen && (
        <div
          className="
          absolute
          bottom-full
          left-0
          right-0
          mb-2
          z-50
          rounded-2xl
          border border-[#3c3c4d]
          bg-[#15151e]
          shadow-xl
          overflow-hidden
          py-1
        "
        >
          {videoInput.length > 0 ? (
            videoInput.map((camera, index) => (
              <button
                key={camera.deviceId || index}
                onClick={() => {
                  setStringCurrentVideoInput(camera.label);
                  setIsVideoListOpen(false);

                  console.log("Camera sélectionné :", camera);
                  changeVideoInput(camera);
                }}
                className={`
                w-full
                px-5
                py-3
                text-left
                text-[13px]
                transition
                hover:bg-[#252532]
                ${
                  stringCurrentVideoInput === camera.label
                    ? "text-[#a9c7f7] bg-[#1b1b25]"
                    : "text-[#c5c5d0]"
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <Video
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#a9a9b8]"
                  />

                  <span className="truncate">{camera.label}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-5 py-4 text-[13px] text-[#77778b]">
              Aucune Caméra disponible
            </div>
          )}
        </div>
      )}

      {/* Bouton Video */}
      <button
        type="button"
        className="
        w-full
        h-[83px]
        rounded-[42px]
        border border-[#3c3c4d]
        px-7
        flex items-center
        text-left
        hover:bg-[#1b1b25]
        transition
      "
        onClick={() => {
          setIsVideoListOpen((prev) => !prev);
        }}
      >
        <Video
          size={21}
          className="text-[#c5c5d0] mr-5 shrink-0"
          strokeWidth={1.8}
        />

        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-[#a9c7f7]">Vidéo</div>

          <div className="text-[14px] text-[#77778b] mt-0.5 truncate">
            {stringCurrentVideoInput || "Choisir une caméra"}
          </div>
        </div>

        <ChevronDown
          size={17}
          className={`
          text-[#c2c2cc]
          transition-transform
          ${isVideoListOpen ? "rotate-180" : ""}
        `}
        />
      </button>
    </div>
  );
}

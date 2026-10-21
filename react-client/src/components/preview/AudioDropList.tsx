import { DeviceManager, Stream } from "mitmi";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MicOff, VideoOff, Mic, Video, ChevronDown } from "lucide-react";
import { iAudioDropList } from "../../interfaces";

export function AudioDropList({ setStream, audioInput }: iAudioDropList) {
  const [deviceManager, _] = useState<DeviceManager>(
    DeviceManager.createInstance(),
  );
  const [stringCurrentAudioInput, setStringCurrentAudioInput] = useState(
    "Autorisations non accordées.",
  );
  const [isAudioListOpen, setIsAudioListOpen] = useState(false);

  async function changeAudioInput(selectedDevice: MediaDeviceInfo) {
    if (!deviceManager) return;
    const newStream = await deviceManager.changeAudioDevice(selectedDevice);
    setStream(newStream);
  }

  return (
    <div className="relative">
      {isAudioListOpen && (
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
          {audioInput.length > 0 ? (
            audioInput.map((mic, index) => (
              <button
                key={mic.deviceId || index}
                onClick={() => {
                  setStringCurrentAudioInput(mic.label);
                  setIsAudioListOpen(false);

                  console.log("Micro sélectionné :", mic);
                  changeAudioInput(mic);
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
                  stringCurrentAudioInput === mic.label
                    ? "text-[#a9c7f7] bg-[#1b1b25]"
                    : "text-[#c5c5d0]"
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <Mic
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#a9a9b8]"
                  />

                  <span className="truncate">{mic.label}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-5 py-4 text-[13px] text-[#77778b]">
              Aucun micro disponible
            </div>
          )}
        </div>
      )}

      {/* Bouton Audio */}
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
          setIsAudioListOpen((prev) => !prev);
        }}
      >
        <Mic
          size={21}
          className="text-[#c5c5d0] mr-5 shrink-0"
          strokeWidth={1.8}
        />

        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-[#a9c7f7]">Audio</div>

          <div className="text-[14px] text-[#77778b] mt-0.5 truncate">
            {stringCurrentAudioInput || "Choisir un micro"}
          </div>
        </div>

        <ChevronDown
          size={17}
          className={`
          text-[#c2c2cc]
          transition-transform
          ${isAudioListOpen ? "rotate-180" : ""}
        `}
        />
      </button>
    </div>
  );
}

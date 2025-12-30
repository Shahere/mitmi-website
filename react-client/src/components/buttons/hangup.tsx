import { PhoneOff } from "lucide-react";
import { ConferenceContext } from "../../App";
import React, { useContext } from "react";
import { iConferenceContext } from "../../interfaces";

export default function HangupButton() {
  const { stream }: iConferenceContext = useContext(ConferenceContext);

  function hangup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //Leave conference
  }

  return (
    <button
      className="
        p-3 rounded-full shadow 
        transition-all duration-200
        bg-red-500 hover:bg-red-600
        "
      onClick={(e) => {
        hangup(e);
      }}
    >
      <PhoneOff size={40} />
    </button>
  );
}

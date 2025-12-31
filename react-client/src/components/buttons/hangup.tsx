import { PhoneOff } from "lucide-react";
import { iLeaveConference } from "../../interfaces";

export default function HangupButton({ leaveConference }: iLeaveConference) {
  return (
    <button
      className="
        p-3 rounded-full shadow 
        transition-all duration-200
        bg-red-500 hover:bg-red-600
        "
      onClick={(e) => {
        leaveConference();
      }}
    >
      <PhoneOff size={40} />
    </button>
  );
}

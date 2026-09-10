import { useState } from "react";
import "./SoundToggle.css";
import { playScroll, isSoundMuted, toggleSound } from "../../lib/sound";

function SoundToggle() {
  const [muted, setMuted] = useState(isSoundMuted);

  const handleClick = () => {
    setMuted(toggleSound());
  };

  return (
    <button
      className={`sound-toggle${muted ? " sound-toggle--off" : ""}`}
      type="button"
      onClick={handleClick}
      onMouseEnter={playScroll}
      aria-pressed={!muted}
      title={muted ? "Sound off — click to enable" : "Sound on — click to mute"}
    >
      <svg
        viewBox="0 0 16 16"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 6v4h2.5L8 13V3L4.5 6H2z" fill="currentColor" stroke="none" />
        <path d="M10.5 5.5a3.5 3.5 0 0 1 0 5" />
        <path d="M12.5 3.5a6.5 6.5 0 0 1 0 9" />
      </svg>
    </button>
  );
}

export default SoundToggle;
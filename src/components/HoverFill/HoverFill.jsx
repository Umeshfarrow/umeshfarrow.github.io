import { useState } from "react";
import "./HoverFill.css";
import { playScroll, playSelect } from "../../lib/sound";

function HoverFill({ children, className = "" }) {
  const [activated, setActivated] = useState(false);

  return (
    <div
      className={`hover-fill ${
        activated ? "hover-fill--active" : ""
      } ${className}`}
      onMouseEnter={() => {
        setActivated(true);
        playScroll();
      }}
      onClick={playSelect}
    >
      <div className="hover-fill__content">
        {children}
      </div>
    </div>
  );
}

export default HoverFill;


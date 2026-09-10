import { useState } from "react";
import "./HoverFill.css";

function HoverFill({ children, className = "" }) {
  const [activated, setActivated] = useState(false);

  return (
    <div
      className={`hover-fill ${
        activated ? "hover-fill--active" : ""
      } ${className}`}
      onMouseEnter={() => setActivated(true)}
    >
      <div className="hover-fill__content">
        {children}
      </div>
    </div>
  );
}

export default HoverFill;


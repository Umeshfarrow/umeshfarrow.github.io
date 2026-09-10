import { useEffect, useState } from "react";
import "./TypingText.css";

function TypingText({
  text,
  speed = 100,
  delay = 0,
  className = "",
  cursor = false,
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout;
    let interval;

    // setDisplayText("");

    timeout = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index += 1;

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={`typing-text ${className}`}>
      {displayText}
      {cursor && <span className="typing-text__cursor">|</span>}
    </span>
  );
}

export default TypingText;

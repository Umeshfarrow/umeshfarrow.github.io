import TypingText from "../TypingText/TypingText";
import "./PageMeta.css";

function PageMeta({
  number = "0.0",
  label = "introducing",
}) {
  return (
    <div className="page-meta">
      <span className="page-meta__number">
        {number}
      </span>

      <span
        className="page-meta__slash"
        aria-hidden="true"
      >
        /
      </span>

      <TypingText
        text={label}
        speed={100}
      />
    </div>
  );
}

export default PageMeta;

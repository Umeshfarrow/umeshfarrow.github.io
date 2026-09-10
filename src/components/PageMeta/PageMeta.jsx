import TypingText from "../TypingText/TypingText";
import "./PageMeta.css";

function PageMeta({
  number = "0.0",
  label = "introducing",
  slashColor = "orange",
}) {
  return (
    <div className="page-meta">
      <span className="page-meta__number">
        {number}
      </span>

      <span
        className="page-meta__slash"
        style={{ color: slashColor }}
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

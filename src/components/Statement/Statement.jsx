import "./Statement.css";

function Statement({
  number,
  label,
  description,
  blue = false,
  children,
}) {
  const className = [
    "statement",
    blue ? "statement--blue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={className}
      id={number === "02" ? "work" : undefined}
    >
      <div className="statement__meta">
        <span>{number}</span>
        <span>{label}</span>
      </div>

      <h2 className="statement__title">
        {children}
      </h2>

      <p className="statement__description">
        {description}
      </p>
    </section>
  );
}

export default Statement;

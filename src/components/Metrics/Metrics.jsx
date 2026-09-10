import "./Metrics.css";
import HoverFill from "../HoverFill/HoverFill";

const metrics = [
  {
    name: "cost optimization",
    number: "0.0.1",
    value: "40%",
    title: "Cost optimization",
    detail: "Terraform right-sizing · Monitoring dashboards",
  },
  {
    name: "Zero downtime",
    number: "0.0.2",
    value: "99.99%",
    title: "Zero downtime",
    detail: "across all prod",
  },
  {
    name: "Container optimization",
    number: "0.0.3",
    value: "~50%",
    title: "Docker(container) optimization",
    detail: "Docker layer caching, Jenkins",
  },
  {
    name: "Operate and Monitor",
    number: "0.0.4",
    value: "92%",
    title: "Operate and Monitor",
    detail: "2-3h → <10min per statement",
  },
];

function Metrics() {
  return (
    <div className="metrics">
      {metrics.map((metric) => {
        const content = (
          <>
            <span className="metrics__label">
              {metric.name} / {metric.number}
            </span>

            <span className="metrics__value">
              {metric.value}
            </span>

            <span className="metrics__title">
              {metric.title}
            </span>

            <span className="metrics__detail">
              {metric.detail}
            </span>
          </>
        );

        return metric.number === "0.0.2" ? (
          <HoverFill key={metric.number}>
            <div className="metrics__cell">
              {content}
            </div>
          </HoverFill>
        ) : (
          <div className="metrics__cell" key={metric.number}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

export default Metrics;

const logBox = document.getElementById("log-box");
const logs = [
  "[INFO] Starting GitOps sync...",
  "[OK] Deployed microservices to Kubernetes cluster",
  "[WARN] High memory usage on pod-aicon-24xx",
  "[INFO] Prometheus scraped 204 targets successfully",
  "[OK] TLS cert renewed via Let's Encrypt"
];

let logIndex = 0;
setInterval(() => {
  if (logIndex < logs.length) {
    logBox.innerText += `\n${logs[logIndex]}`;
    logIndex++;
    logBox.scrollTop = logBox.scrollHeight;
  }
}, 3000);

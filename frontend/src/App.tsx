import { useEffect, useMemo, useState } from "react";

function App() {
  const [health, setHealth] = useState<string>("Loading...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.text())
      .then((data) => setHealth(data))
      .catch(() => setHealth("Failed to fetch"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Health Check</h1>
      <p>Status: {health}</p>
    </div>
  );
}

export default App;

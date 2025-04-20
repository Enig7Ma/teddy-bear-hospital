import { useEffect, useMemo, useRef, useState } from "react";
import Camera from "./components/Camera";

function App() {
  //   const [health, setHealth] = useState<string>("Loading...");

  //   useEffect(() => {
  //     fetch("/api/health")
  //       .then((res) => res.text())
  //       .then((data) => setHealth(data))
  //       .catch(() => setHealth("Failed to fetch"));
  //   }, []);

  //   return (
  //     <div style={{ padding: 20 }}>
  //       <h1>Health Check</h1>
  //       <p>Status: {health}</p>
  //     </div>
  //   );
  return <Camera />;
}

export default App;

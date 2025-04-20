import { useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const startCamera = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(s);
    if (videoRef.current) {
      videoRef.current.srcObject = s;
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setImageData(dataURL);
      }
    }
  };

  const uploadPhoto = async () => {
    if (!imageData) return;
    const blob = await (await fetch(imageData)).blob();
    const formData = new FormData();
    formData.append("file", blob, "photo.png");

    const response = await fetch("api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Uploaded!");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Buttons row */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button onClick={startCamera}>Start</button>
        <button onClick={stopCamera}>Stop</button>
        <button onClick={capturePhoto}>Capture</button>
        <button onClick={uploadPhoto}>Upload</button>
      </div>

      {/* Side-by-side layout */}
      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        {/* Camera preview box */}
        <div
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "480px", borderRadius: "4px" }}
          />
        </div>

        {/* Captured image preview box */}
        <div
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {imageData ? (
            <img
              src={imageData}
              alt="Captured"
              style={{ width: "480px", borderRadius: "4px" }}
            />
          ) : (
            <div
              style={{
                width: "480px",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontStyle: "italic",
              }}
            >
              No photo yet
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

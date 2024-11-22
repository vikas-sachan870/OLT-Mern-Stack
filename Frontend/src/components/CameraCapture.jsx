import  { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    // Cleanup: Stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Camera Capture</h1>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "500px" }}
        ></video>
      </div>
      <button onClick={captureImage} style={{ margin: "20px", padding: "10px 20px" }}>
        Capture Image
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

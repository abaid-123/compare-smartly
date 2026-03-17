import Webcam from "react-webcam";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CameraCapture() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // send image to visual search page
    navigate("/visual-search", { state: { image: imageSrc } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-xl w-[400px]"
      />

      <button
        onClick={capture}
        className="mt-4 px-6 py-2 bg-blue-600 rounded-lg"
      >
        Capture Image
      </button>
    </div>
  );
}
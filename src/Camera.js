// frontend/src/components/Camera.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [captured, setCaptured] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setCaptured(true);
  };

  return (
    <div>
      {!captured ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={{
              width: 350,
              height: 350,
              facingMode: "user",
            }}
          />
          <button onClick={capture}>Capturer l'image</button>
        </>
      ) : (
        <p>Image capturée. Traitement en cours...</p>
      )}
    </div>
  );
};

export default Camera;

// frontend/src/App.js
import React, { useState } from 'react';
import Camera from './Camera';
import './App.css';

function App() {
  const [audio, setAudio] = useState(null);
  const [objects, setObjects] = useState('');

  const handleCapture = async (imageSrc) => {
    try {
      const blob = await (await fetch(imageSrc)).blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        // Appel à la Function Orchestratrice
        const response = await fetch('https://objectRecognitionFunctionApp.azurewebsites.net/api/ProcessImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64data })
        });

        if (!response.ok) {
          throw new Error('Erreur lors du traitement de l\'image.');
        }

        const data = await response.json();
        setObjects(data.objects);

        // Jouer l'audio
        const audioSrc = `data:audio/mp3;base64,${data.audio}`;
        const audioElement = new Audio(audioSrc);
        audioElement.play();
      };
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors du traitement de l\'image.');
    }
  };

  return (
    <div className="App">
      <h1>Reconnaissance d'Objets pour Malvoyants</h1>
      <Camera onCapture={handleCapture} />
      {objects && <p>Objets reconnus : {objects}</p>}
    </div>
  );
}

export default App;

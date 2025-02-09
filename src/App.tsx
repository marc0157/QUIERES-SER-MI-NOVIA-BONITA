import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

// Romantic couple images from Unsplash
const IMAGES = [
 "https://subir-imagen.com/images/2025/02/08/photocollage_202392520749436.jpg", // Image 1
  "https://subir-imagen.com/images/2025/02/08/IMG_2024-03-18-11-02-37-126.jpg", // Image 2
  "https://subir-imagen.com/images/2025/02/08/IMG_2024-03-19-15-49-06-878.jpg", // Image 3
  "https://subir-imagen.com/images/2025/02/08/IMG_2024-03-18-12-23-10-029.jpg", // Image 4
  "https://subir-imagen.com/images/2025/02/08/IMG-20240513-WA0001.jpg"  // Image 5
];

const COVER_PHRASES = [
  "Abre mi Princesa ❤️🌹26🌹❤️",
  "Yganaste la apuesta 💝",
  "Un Regalo Especial 🎁",
  "Recuerdo de anillo💕",
  "Nuestro hijos 💖"
];

const LOVE_PHRASES = [
  "Para Mi Valentina ❤️",
  "Eres Mi Princesa 👑",
  "Te Amo Bonita 💝",
  "Siempre Juntos 🤗",
  "Nunca Cambiaré 💑"
];

const EXTRA_MESSAGES = [
"¿De verdad no quieres? 🥺",
  "Vamos, piénsalo mejor... 😊",
  "No me hagas poner triste 😢",
  "¡Dame una oportunidad! 💝",
  "¡Sé que en el fondo quieres decir sí! 💕",
  "¡No puedes resistirte a tanto amor! 🌹",
  "¡Última oportunidad! 💘",
   "Confía en mí, será increíble 🌈",
   "No puedo dejar de pensar en ti 💭",
   "Cada minuto sin ti es una eternidad ⏳",
"Vamos, toma mi mano y emprendamos juntos esta aventura 🚀"
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [showProposal, setShowProposal] = useState(true);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showAcceptanceMessage, setShowAcceptanceMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(LOVE_PHRASES[0]);
  const [coverPhrase, setCoverPhrase] = useState(COVER_PHRASES[0]);

  useEffect(() => {
    if (isOpen || !isOpen) {
      setShowPetals(true);
      const timer = setTimeout(() => setShowPetals(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNo = () => {
    if (dialogIndex < EXTRA_MESSAGES.length) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setDialogIndex(0);
    }
  };

  const handleYes = () => {
    setShowProposal(false);
    setShowAcceptanceMessage(true);
  };

  const handleAcceptanceClose = () => {
    setShowAcceptanceMessage(false);
  };

  const handleImageClick = () => {
    if (currentImageIndex < IMAGES.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setCurrentPhrase(LOVE_PHRASES[nextIndex]);
      setCoverPhrase(COVER_PHRASES[nextIndex]);
    } else {
      setShowImages(false);
      setCurrentImageIndex(0);
      setCurrentPhrase(LOVE_PHRASES[0]);
      setCoverPhrase(COVER_PHRASES[0]);
      setShowProposal(true);
    }
  };

  const Dialog = ({ show, onClose, children }: { show: boolean; onClose?: () => void; children: React.ReactNode }) => {
    if (!show) return null;
     // Added bg-white and bg-opacity-80 here
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white bg-opacity-40 rounded-2xl p-6 max-w-md w-full shadow-xl">
          <div className="flex justify-end">
            {onClose && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };

  const Button = ({ onClick, children, primary = false }: { onClick: () => void; children: React.ReactNode; primary?: boolean }) => (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition-all ${
        primary
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
          : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
      }`}
    >
      {children}
    </button>
  );

  if (showProposal) {
    return (
      <div
        className="min-h-screen min-w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url("https://subir-imagen.com/images/2025/02/08/fondo1.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Dialog show={true} onClose={handleNo}>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-pink-700">
              {dialogIndex === 0 ? "¿Quieres ser mi Novia?" : EXTRA_MESSAGES[dialogIndex - 1]}
            </h2>
            <div className="flex justify-center gap-4">
              <Button onClick={handleYes} primary>Sí</Button>
              <Button onClick={handleNo}>No</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  if (showAcceptanceMessage) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <Dialog show={true} onClose={handleAcceptanceClose}>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-pink-600">
              ¡Sabía que ibas a aceptar Mi Princesa! 🌹💗💗🌹
            </h2>
            <Button onClick={handleAcceptanceClose} primary>Continuar</Button>
          </div>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      {/* Falling Petals */}
      {showPetals && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div
                className="w-4 h-4 bg-pink-300 rounded-full opacity-80 rotate-45"
                style={{
                  animation: `rotate ${2 + Math.random() * 2}s linear infinite`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Card */}
      <div
        className={`relative w-full max-w-md aspect-[3/4] transition-transform duration-1000 transform-style-3d cursor-pointer ${
          isOpen ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden">
          <Heart className="w-24 h-24 text-white animate-pulse" />
          <h1 className="text-3xl font-bold text-white mt-4 text-center">
            Para Mi Valentina
          </h1>
          <p className="text-white mt-2 text-center">
            {coverPhrase}
          </p>
        </div>

        {/* Back of card (inside) */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 rotate-y-180 backface-hidden overflow-hidden">
          {showImages ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4" onClick={handleImageClick}>
              <img
                src={IMAGES[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                className="max-w-full max-h-[70%] object-contain transition-opacity duration-500 rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                {currentPhrase}
              </h2>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-2xl font-bold text-pink-600">
                Mi Querida Valentina
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En este día tan especial, quiero decirte que eres la luz que ilumina mi vida.
                Cada momento contigo es un regalo que atesoro en mi corazón.
                Te amo más de lo que las palabras pueden expresar.
              </p>
              <Heart
                className="w-12 h-12 cursor-pointer transition-colors duration-300 hover:text-pink-500"
                fill="currentColor"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImages(true);
                }}
                style={{
                  background: 'linear-gradient(45deg, #ef4444, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              />
              <p
                className="font-semibold cursor-pointer transition-all duration-300 hover:scale-110"
                style={{
                  background: 'linear-gradient(45deg, #ef4444, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImages(true);
                }}
              >
                Con todo mi amor ❤️
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

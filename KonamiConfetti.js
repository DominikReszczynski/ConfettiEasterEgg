// to get started use the command npm install react-confetti
// import and invoke the component into the main layout
"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function KonamiConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(500);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // the function collects data about the length and width of the dom
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.body.scrollHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiCodePosition = 0;

    function handleKeyDown(event) {
      if (event.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
          setShowConfetti(true);
          //   Reduce the number of pieces to 0 after 5 seconds
          setTimeout(() => setConfettiPieces(0), 5000);
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    showConfetti && (
      <Confetti
        //   We use the `confettiPieces` state to control the number of pieces
        numberOfPieces={confettiPieces}
        // We set `recycle` to `false` so that chunks stop regenerating
        recycle={false}
        // The width of the confetti is the width of the window
        width={dimensions.width}
        // The height of the confetti is the full height of the document
        height={dimensions.height}
      />
    )
  );
}

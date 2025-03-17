import { useEffect } from "react";
import Keyboard from "../assets/Keyboard.mp3"
const KeyboardSound: React.FC = () => {
  useEffect(() => {
    const audio = new Audio(Keyboard);

    const playSound = () => {
      audio.currentTime = 0; 
      audio.play().catch((err) => console.error("Audio play error:", err))
    }

    window.addEventListener("keydown", playSound)
    return () => window.removeEventListener("keydown", playSound)
  }, [])

  return null
}

export default KeyboardSound;

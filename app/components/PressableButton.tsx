import React, { useState, useEffect } from "react";
import Image from "next/image";
import unpressed from "@/public/buttonOff.png";
import pressed from "@/public/buttonOn.png";


interface ClawProps {
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
}

export default function PressableButton({ isPressed, setIsPressed }: ClawProps) {

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Image
      src={isPressed ? pressed : unpressed}
      alt="Pressable Button"
      draggable="false"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensure button is released when the mouse leaves the button
      style={{
        position: "absolute",
        left: "414px", // Adjust position as needed
        top: "678px", // Adjust position as needed
        cursor: "pointer",
      }}
      unoptimized={true}
    />
  );
}

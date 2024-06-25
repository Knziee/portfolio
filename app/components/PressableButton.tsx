import React, { useState, useEffect } from "react";
import Image from "next/image";
import unpressed from "@/public/buttonOff.png";
import pressed from "@/public/buttonOn.png";

interface ClawProps {
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
}

export default function PressableButton({
  isPressed,
  setIsPressed,
}: ClawProps) {
  const handleMouseDown = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 5000); // 5 seconds
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setIsPressed(true);
      // setTimeout(() => {
      //   setIsPressed(false);
      // }, 5000); // 5 seconds
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Image
      src={isPressed ? pressed : unpressed}
      alt="Pressable Button"
      draggable="false"
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        zIndex: 55,
        left: "414px", // Adjust position as needed
        top: "678px", // Adjust position as needed
        cursor: "pointer",
      }}
      unoptimized={true}
    />
  );
}

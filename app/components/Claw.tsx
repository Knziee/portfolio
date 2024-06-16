// components/Claw.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import clawStandard from "@/public/garra0.png";
import clawR1 from "@/public/garra1R.png";
import clawR2 from "@/public/garra2R.png";
import clawR3 from "@/public/garra3R.png";
import clawR4 from "@/public/garra4R.png";
import clawL1 from "@/public/garra1L.png";
import clawL2 from "@/public/garra2L.png";
import clawL3 from "@/public/garra3L.png";
import clawL4 from "@/public/garra4L.png";
import clawB1 from "@/public/garraB1.png";
import clawB2 from "@/public/garraB2.png";
import clawB3 from "@/public/garraB3.png";
import clawB4 from "@/public/garraB4.png";
import clawB5 from "@/public/garraB5.png";

interface ClawProps {
  position: number;
  clawPosition: number;
  setClawPosition: (clawPosition: number) => void;
  isPressed: boolean;
}

const Claw: React.FC<ClawProps> = ({
  position,
  clawPosition,
  setClawPosition,
  isPressed,
}) => {
  const [clawImage, setClawImage] = useState(clawStandard);

  useEffect(() => {
    let newClawPosition = clawPosition;

    if (position > 0) {
      // Decrease left position by 1 pixel per unit of position, but not below 65
      newClawPosition = Math.min(410, clawPosition + position * 0.1);
    } else if (position < 0) {
      // Increase left position by 1 pixel per unit of position, but not above 65
      newClawPosition = Math.max(65, clawPosition + position * 0.1);
    }

    // Ensure we don't exceed the update rate
    if (newClawPosition !== clawPosition) {
      setClawPosition(newClawPosition);
    }
  }, [position, clawPosition]);

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    if (isPressed) {
      const animationFrames = [clawB1, clawB2, clawB3, clawB4, clawB5];
      let currentFrame = 0;

      animationInterval = setInterval(() => {
        setClawImage(animationFrames[currentFrame]);
        currentFrame += 1;

        if (currentFrame === animationFrames.length) {
          clearInterval(animationInterval);
          setClawImage(clawB5);
        }
      }, 40); // Adjust the interval time for smooth animation
    } else {
      switch (position) {
        case 2:
          setClawImage(clawL4);
          break;
        case 1.5:
          setClawImage(clawL3);
          break;
        case 1:
          setClawImage(clawL2);
          break;
        case 0.5:
          setClawImage(clawL1);
          break;
        case -2:
          setClawImage(clawR4);
          break;
        case -1.5:
          setClawImage(clawR3);
          break;
        case -1:
          setClawImage(clawR2);
          break;
        case -0.5:
          setClawImage(clawR1);
          break;
        default:
          setClawImage(clawStandard);
      }
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [isPressed, position]);

  return (
    <Image
      src={clawImage}
      draggable="false"
      alt="Claw"
      style={{
        position: "absolute",
        left: `${clawPosition}px`,
        top: "190px",
        cursor: "pointer",
        transition: "left 0.1s linear", // Smooth transition for the movement
      }}
      unoptimized={true}
    />
  );
};

export default Claw;

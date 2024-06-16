"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import MachineBase from "@/public/maquinaBase.svg";
import alavancaStandart from "@/public/alavanca0.svg";
import alavancaR1 from "@/public/alavanca1R.svg";
import alavancaR2 from "@/public/alavanca2R.svg";
import alavancaL1 from "@/public/alavanca1L.svg";
import alavancaL2 from "@/public/alavanca2L.svg";

import styles from "./MachineBackground.module.css"; // Importa o CSS Module

export default function MachineBackground() {
  const [position, setPosition] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.clientX - startX.current;
        if (deltaX > 50 && deltaX <= 150) {
          setPosition(1);
        } else if (deltaX > 150) {
          setPosition(2);
        } else {
          setPosition(0);
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (position === 2) {
        setPosition(1); // Passa pelo estado 1 antes de voltar ao 0
        setTimeout(() => {
          setPosition(0);
        }, 900); // Ajuste o tempo conforme necessário para a transição
      } else {
        setPosition(0);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  let leverImage;
  switch (position) {
    case 0:
      leverImage = alavancaStandart;
      break;
    case 1:
      leverImage = alavancaR1;
      break;
    case 2:
      leverImage = alavancaR2;
      break;
    default:
      leverImage = alavancaStandart;
  }
  return (
    <div className="w-screen h-screen relative">
      <div className="bottom-0 right-20 absolute">
        {/* <Image src={MachineBase} alt="Machine Base" /> */}
        <img
          src={leverImage}
          alt="Alavanca"
          style={{
            width: "50px",
            height: "150px",
            position: "absolute",
            left: "0",
            top: "0",
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}

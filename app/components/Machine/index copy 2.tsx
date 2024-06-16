"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import MachineBase from "@/public/maquinaBase.svg";
import alavancaStandard from "@/public/alavanca0.svg";
import alavancaR1 from "@/public/alavanca1R.svg";
import alavancaR2 from "@/public/alavanca2R.svg";
import alavancaL1 from "@/public/alavanca1L.svg";
import alavancaL2 from "@/public/alavanca2L.svg";

import styles from "./MachineBackground.module.css"; // Importa o CSS Module

export default function MachineBackground() {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0); // 0 = central, -1 = L1, -2 = L2, 1 = R1, 2 = R2

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const newPosition = e.clientX - window.innerWidth / 2;

        if (newPosition > 100) {
          setPosition(2);
        } else if (newPosition > 50) {
          setPosition(1);
        // } else if (newPosition < -100) {
        //   setPosition(-2);
        // } else if (newPosition < -50) {
        //   setPosition(-1);
        } else {
          setPosition(0);
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setPosition(0); // Volta para a posição padrão ao soltar
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  let alavancaImage;
  switch (position) {
    case 2:
      alavancaImage = alavancaR2;
      break;
    case 1:
      alavancaImage = alavancaR1;
      break;
    // case -1:
    //   alavancaImage = alavancaL1;
    //   break;
    // case -2:
    //   alavancaImage = alavancaL2;
    //   break;
    default:
      alavancaImage = alavancaStandard;
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="bottom-0 right-20 absolute">
        <Image src={MachineBase} alt="Machine Base" />
        <Image
          src={alavancaImage}
          onMouseDown={handleMouseDown}
          draggable="false"
          alt="Alavanca"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
          }}
          // style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Image from "next/image";
import MachineBase from "@/public/maquinaBase.svg";
import MachineFrame from "@/public/maquinaBaseFrame.svg";
import PressableButton from "../PressableButton";
import Lever from "../Lever";
import Claw from "../Claw"; // Importa o Claw

import styles from "./MachineBackground.module.css"; // Importa o CSS Module

export default function MachineBackground() {
  const [position, setPosition] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [clawPosition, setClawPosition] = useState(410);

  return (
    <div className="w-screen h-screen relative">
      <div className="bottom-0 right-20 absolute flex justify-end items-end">
        <Image src={MachineBase} alt="Machine Base" />
        <Lever onChangePosition={setPosition} />
        <PressableButton isPressed={isPressed} setIsPressed={setIsPressed} />
        <Claw
          position={position}
          clawPosition={clawPosition}
          setClawPosition={setClawPosition}
          isPressed={isPressed}
        />{" "}
        {/* Passa a posição atual para o Claw */}
        <Image
          src={MachineFrame}
          alt="Machine Base"
          className="absolute z-50"
        />
      </div>
    </div>
  );
}

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
import clawExtended from "@/public/garraExtensora.png";
import toolbox from "@/public/toolbox.svg";
import diploma from "@/public/diploma.svg";
import folder from "@/public/folder.svg";
import card from "@/public/card.svg";
import trophy from "@/public/trophy.svg";

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
  const [clawCable, setClawCable] = useState(450);
  const [clawBase, setClawBase] = useState(false);
  const [clawCloseToItem, setClawCloseToItem] = useState(false);
  const [clawFoundItem, setClawFoundItem] = useState<any>({
    name: null,
    range: null,
  });
  const [clawHeight, setClawHeight] = useState(190);

  const [machineItems, setMachineItems] = useState([
    {
      name: "toolbox",
      src: toolbox,
      top: 245,
      left: 360,
      rotate: "rotate(350deg)",
      zIndex: 5,
      hookPosition: { left: 370, right: 420 },
      clawRange: 195,
    },

    {
      name: "folder",
      src: folder,
      top: 225,
      left: 285,
      rotate: "rotate(0deg)",
      zIndex: 3,
      hookPosition: { left: 280, right: 330 },
      clawRange: 235,
    },
    {
      name: "diploma",
      src: diploma,
      top: 290,
      left: 100,
      rotate: "rotate(0deg)",
      zIndex: 5,
      hookPosition: { left: 190, right: 190 },
      clawRange: 190,
    },
    {
      name: "card",
      src: card,
      top: 310,
      left: 80,
      rotate: "rotate(355deg)",
      zIndex: 5,
      hookPosition: { left: 65, right: 100 },
      clawRange: 190,
    },
    {
      name: "trophy",
      src: trophy,
      top: 255,
      left: 200,
      rotate: "rotate(25deg)",
      zIndex: 4,
      hookPosition: { left: 215, right: 265 },
      clawRange: 200,
    },
  ]);

  useEffect(() => {
    if (!isPressed) {
      let newClawPosition = clawPosition;

      if (position > 0) {
        newClawPosition = Math.min(410, clawPosition + position * 0.5);
      } else if (position < 0) {
        newClawPosition = Math.max(65, clawPosition + position * 0.5);
      }

      if (newClawPosition !== clawPosition) {
        setClawPosition(newClawPosition);
      }
    }
  }, [position, clawPosition]);

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    if (clawCloseToItem) {
      const animationFrames = [clawB1, clawB2, clawB3, clawB4, clawB5];
      let currentFrame = 0;

      animationInterval = setInterval(() => {
        setClawImage(animationFrames[currentFrame]);
        currentFrame += 1;

        if (currentFrame === animationFrames.length) {
          clearInterval(animationInterval);
          setClawImage(clawB5);
        }
      }, 80);
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
  }, [clawCloseToItem, position]);
  useEffect(() => {
    let cableInterval: NodeJS.Timeout;

    if (isPressed) {
      cableInterval = setInterval(() => {
        setClawBase(true);
        setClawCable((prevCable) => {
          //3
          // 140 e 140
          let cableRange =
            clawFoundItem.range === null ? 190 : clawFoundItem.range;

          const newCable = Math.max(prevCable - 3, cableRange);

          if (prevCable - cableRange <= 30) {
            setClawCloseToItem(true);
          }

          if (newCable === cableRange) clearInterval(cableInterval);
          return newCable;
        });
        setClawHeight((prevCable) => {
          //3
          //190 e 45
          const newCableHeight = Math.max(prevCable + 3, 145);

          if (newCableHeight === 445) clearInterval(cableInterval);
          return newCableHeight;
        });
      }, 40);
    }

    return () => {
      clearInterval(cableInterval);
    };
  }, [isPressed, clawFoundItem]);

  useEffect(() => {
    if (isPressed) {
      machineItems.forEach((item) => {
        const itemLeft = item.hookPosition.left;
        const itemRight = item.hookPosition.right; // Adicionar a largura do item
        const clawLeft = clawPosition;
        const clawRight = clawPosition + 10; // Valor final (left + width) da garra

        // console.log(`range do item ${item.name}`, itemLeft, itemRight);
        // console.log("range do da garra", clawLeft, clawRight);

        // Verificar se a garra está sobre o item
        if (clawLeft >= itemLeft && clawRight <= itemRight) {
          console.log(`Claw is on top of ${item.name}`);
          setClawFoundItem({ name: item.name, range: item.clawRange });
        }
      });
    } else {
      console.log("Não há nenhum item sob a garra.");
      setClawFoundItem({ name: null, range: null });
    }
  }, [isPressed, clawPosition, machineItems]);

  // useEffect(() => {
  //   console.log(`Valor Inicial (left): ${clawPosition + 18}`);
  //   console.log(`Valor Final (left + width): ${clawPosition + 18 + 40}`);
  // }, [clawPosition]);

  return (
    <>
      <Image
        src={clawImage}
        draggable="false"
        alt="Claw"
        style={{
          position: "absolute",
          left: `${clawPosition}px`,
          top: `${clawHeight}px`,
          transition: "left 0.1s linear",
          clipPath: `inset(${clawBase ? 73 : 0}px 0px 0px 0px)`,
          zIndex: 55,
        }}
        unoptimized={true}
        className="z-20"
      />
      {clawBase && (
        <Image
          src={clawExtended}
          draggable="false"
          alt="Claw"
          style={{
            position: "absolute",
            left: `${clawPosition}px`,
            top: `${190}px`,
            transition: "left 0.1s linear",
            clipPath: `inset(0px 0px ${clawCable}px 0px)`,
          }}
          unoptimized={true}
          className="z-20"
        />
      )}
      <div className=" h-[340px] w-[553px] absolute top-[285px] left-[88px]">
        <div
          className={`h-[340px] w-[10px] opacity-20 ${
            isPressed ? "bg-green-300" : "bg-red-300"
          } z-10`}
          style={{
            position: "absolute",
            left: `${clawPosition + 35}px`,
            transition: "left 0.1s linear",
          }}
        />
        {machineItems.map((item: any, index) => (
          <div
            style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              transition: "left 0.1s linear",
              transform: item.rotate,
              zIndex: item.zIndex,
            }}
            // className="relative border-2 border-color-red-300"
            key={index}
          >
            <Image
              src={item.src}
              draggable="false"
              alt="Claw"
              unoptimized={true}
              key={index}
              className="w-full h-full"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-400 h-5 w-5" />
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Claw;

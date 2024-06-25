import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import alavancaStandard from "@/public/alavanca0.png";
import alavancaR05 from "@/public/alavanca05R.png";
import alavancaR1 from "@/public/alavanca1R.png";
import alavancaR15 from "@/public/alavanca15R.png";
import alavancaR2 from "@/public/alavanca2R.png";
import alavancaL05 from "@/public/alavanca05L.png";
import alavancaL1 from "@/public/alavanca1L.png";
import alavancaL15 from "@/public/alavanca15L.png";
import alavancaL2 from "@/public/alavanca2L.png";
import chain1 from "@/public/correia1.svg";
import chain2 from "@/public/correia2.svg";

interface LeverProps {
  onChangePosition: (position: number) => void;
}

const Lever: React.FC<LeverProps> = ({ onChangePosition }) => {
  const [position, setPosition] = useState(0); // 0 = central, -2 = L2, -1.5 = L1.5, -1 = L1, -0.5 = L0.5, 1 = R1, 1.5 = R1.5, 2 = R2
  const [currentChainImage, setCurrentChainImage] = useState(chain1);
  const keyPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const isHoldingKey = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newPosition = e.clientX - window.innerWidth / 2;

        if (newPosition > 700) {
          setPosition(2);
        } else if (newPosition > 575) {
          setPosition(1.5);
        } else if (newPosition > 450) {
          setPosition(1);
        } else if (newPosition > 225) {
          setPosition(0.5);
        } else if (newPosition < -700) {
          setPosition(-2);
        } else if (newPosition < -575) {
          setPosition(-1.5);
        } else if (newPosition < -450) {
          setPosition(-1);
        } else if (newPosition < -225) {
          setPosition(-0.5);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (!isHoldingKey.current) {
          isHoldingKey.current = true;
          setPosition(0.5);
          keyPressTimeout.current = setTimeout(() => {
            if (isHoldingKey.current) {
              setPosition(1);
              keyPressTimeout.current = setTimeout(() => {
                if (isHoldingKey.current) {
                  setPosition(1.5);
                  keyPressTimeout.current = setTimeout(() => {
                    if (isHoldingKey.current) {
                      setPosition(2);
                    }
                  }, 40);
                }
              }, 40);
            }
          }, 40);
        }
      } else if (e.key === "ArrowLeft") {
        if (!isHoldingKey.current) {
          isHoldingKey.current = true;
          setPosition(-0.5);
          keyPressTimeout.current = setTimeout(() => {
            if (isHoldingKey.current) {
              setPosition(-1);
              keyPressTimeout.current = setTimeout(() => {
                if (isHoldingKey.current) {
                  setPosition(-1.5);
                  keyPressTimeout.current = setTimeout(() => {
                    if (isHoldingKey.current) {
                      setPosition(-2);
                    }
                  }, 40);
                }
              }, 40);
            }
          }, 40);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        isHoldingKey.current = false;
        clearTimeout(keyPressTimeout.current!); // Non-null assertion operator
        setPosition(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    onChangePosition(position);
  }, [position, onChangePosition]);

  useEffect(() => {
    let chainInterval: NodeJS.Timeout | null = null;

    if (isHoldingKey.current) {
      chainInterval = setInterval(() => {
        setCurrentChainImage((prev: any) =>
          prev === chain1 ? chain2 : chain1
        );
      }, 40);
    } else {
      if (chainInterval) {
        clearInterval(chainInterval);
      }
      setCurrentChainImage(chain1);
    }

    return () => {
      if (chainInterval) {
        clearInterval(chainInterval);
      }
    };
  }, [isHoldingKey.current]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  let alavancaImage;
  switch (position) {
    case 2:
      alavancaImage = alavancaR2;
      break;
    case 1.5:
      alavancaImage = alavancaR15;
      break;
    case 1:
      alavancaImage = alavancaR1;
      break;
    case 0.5:
      alavancaImage = alavancaR05;
      break;
    case -2:
      alavancaImage = alavancaL2;
      break;
    case -1.5:
      alavancaImage = alavancaL15;
      break;
    case -1:
      alavancaImage = alavancaL1;
      break;
    case -0.5:
      alavancaImage = alavancaL05;
      break;
    default:
      alavancaImage = alavancaStandard;
  }

  return (
    <>
      <Image
        src={alavancaImage}
        draggable="false"
        onMouseDown={handleMouseDown}
        alt="Alavanca"
        style={{
          position: "absolute",
          left: "164px",
          top: "622px",
          cursor: "pointer",
          zIndex: "55",
        }}
        unoptimized={true}
      />
      <Image
        src={currentChainImage}
        draggable="false"
        alt="Chain"
        style={{
          position: "absolute",
          left: "111px",
          top: "180px",
        }}
        unoptimized={true}
      />
    </>
  );
};

export default Lever;

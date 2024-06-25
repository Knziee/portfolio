import React from "react";
import useMatter from "../hooks/useMatter";

const InsideMachine: React.FC = () => {
  const sceneRef = useMatter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "absolute",
      }}
    >
      <div
        ref={sceneRef}
        style={{
          width: "600px",
          height: "600px",
          border: "5px solid",
          borderColor: "green yellow",
          position: "relative",
        }}
      />
    </div>
  );
};

export default InsideMachine;

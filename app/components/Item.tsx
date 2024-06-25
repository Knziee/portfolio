// components/Item.js
import React, { useEffect } from "react";
import Matter from "matter-js";

const Item = ({ x, y, width, height, options }) => {
  useEffect(() => {
    const body = Matter.Bodies.rectangle(x, y, width, height, options);
    Matter.World.add(engine.world, body);

    return () => {
      Matter.World.remove(engine.world, body);
    };
  }, [x, y, width, height, options]);

  return null;
};

export default Item;

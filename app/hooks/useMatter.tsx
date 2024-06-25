import { useEffect, useRef } from "react";
import Matter from "matter-js";

const useMatter = (): React.RefObject<HTMLDivElement> => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create());

  useEffect(() => {
    const engine = engineRef.current;
    const world = engine.world;

    // Create a renderer
    const render = Matter.Render.create({
      element: sceneRef.current as HTMLElement, // Assertion to HTMLElement
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false,
        background: "transparent",
      },
    });

    // Add ground (you can adjust these to your needs)
    const ground = Matter.Bodies.rectangle(300, 590, 600, 20, {
      isStatic: true,
    });
    Matter.World.add(world, ground);

    // Run the engine
    Matter.Engine.run(engine);

    // Run the renderer
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return sceneRef;
};

export default useMatter;

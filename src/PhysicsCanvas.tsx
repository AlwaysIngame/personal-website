import { useEffect, useRef } from "react"
import { Engine, Render, Composite, Runner, Bodies } from "matter-js"

function PhysicsCanvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let engine = Engine.create();
    let render = Render.create({
      canvas: canvasRef.current ? canvasRef.current : undefined,
      engine: engine,
      options: {
        background: 'transparent',
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight
      },
    })
    const initiate = () => { // Box spawning logic
      const items = [
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 1, window.innerWidth, 2, { isStatic: true }),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 80, 80),
      ];
      Composite.add(engine.world, items);
    }

    Runner.run(engine);
    Render.run(render);
    initiate();

    function handleResize() {
      Composite.clear(engine.world, false)
      render.bounds.max.x = window.innerWidth;
      render.bounds.max.y = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      initiate();
    }
    window.addEventListener('resize', handleResize)

  }, [])


  return (
    <canvas ref={canvasRef} className="absolute w-full h-full"></canvas>
  )
}

export default PhysicsCanvas;

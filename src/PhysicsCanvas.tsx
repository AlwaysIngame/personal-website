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

    var boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
    var ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 0.1, { isStatic: true });

    Composite.add(engine.world, [boxA, ground]);

    Runner.run(engine)
    Render.run(render)

    function handleResize() {
      Composite.clear(engine.world, false)
      boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
      ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 0.1, { isStatic: true });
      render.bounds.max.x = window.innerWidth;
      render.bounds.max.y = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Composite.add(engine.world, [boxA, ground]);
    }
    window.addEventListener('resize', handleResize)
  }, [])


  return (
    <canvas ref={canvasRef} className="absolute w-full h-full"></canvas>
  )
}

export default PhysicsCanvas;

import { useAppStore } from "@/stores/appStore";
import { Layer, Stage } from "react-konva";
import useDrawShapes from "./hooks/useDrawShapes";
import Rectangle from "./components/Rectangle";
import Circle from "./components/Circle";
import Line from "./components/Line";

const KonvaCanvas = () => {
  const shapes = useAppStore((state) => state.objects.shapes);

  const { startDrawing, whileDrawing, stopDrawing } = useDrawShapes();

  return (
    <Stage
      onPointerDown={startDrawing}
      onPointerMove={whileDrawing}
      onPointerUp={stopDrawing}
      style={{ backgroundColor: "white" }}
      className="konva-canvas"
      width={595}
      height={842}
    >
      <Layer>
        {Object.keys(shapes.rect).map((key) => {
          const s = shapes.rect[key];
          if (!s) return;
          return <Rectangle key={s.name} shape={s} />;
        })}
        {Object.keys(shapes.circle).map((key) => {
          const s = shapes.circle[key];
          if (!s) return;
          return <Circle key={s.name} shape={s} />;
        })}
        {Object.keys(shapes.line).map((key) => {
          const s = shapes.line[key];
          if (!s) return;
          return <Line key={s.name} shape={s} />;
        })}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

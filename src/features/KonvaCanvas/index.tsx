import { useAppStore } from "@/stores/appStore";
import { Layer, Stage } from "react-konva";
import useDrawShapes from "./hooks/useDrawShapes";
import Rectangle from "./components/Rectangle";
import Circle from "./components/Circle";
import Line from "./components/Line";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

const KonvaCanvas = () => {
  const objects = useAppStore((state) => state.objects);
  const update = useAppStore((state) => state.update);

  const { startDrawing, whileDrawing, stopDrawing } = useDrawShapes();

  const handleStageClick = (e: KonvaEventObject<PointerEvent>) => {
    if (!(e.target instanceof Konva.Stage)) return;
    update({ currentObject: undefined });
  };

  return (
    <Stage
      onClick={handleStageClick}
      onPointerDown={startDrawing}
      onPointerMove={whileDrawing}
      onPointerUp={stopDrawing}
      style={{ backgroundColor: "white" }}
      className="konva-canvas"
      width={595}
      height={842}
    >
      <Layer>
        {Object.keys(objects).map((key) => {
          const object = objects[key];
          if (object.type === "rect") return <Rectangle key={object.id} shape={object} />;
          else if (object.type === "circle") return <Circle key={object.id} shape={object} />;
          else if (object.type === "line") return <Line key={object.id} shape={object} />;
        })}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

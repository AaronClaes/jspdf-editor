import { useAppStore } from "@/stores/appStore";
import { LineShapeType } from "@/types/objects";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from "uuid";

const useDrawShapes = () => {
  const shapes = useAppStore((state) => state.objects.shapes);
  const action = useAppStore((state) => state.action);
  const drawAction = useAppStore((state) => state.drawAction);
  const currentShape = useAppStore((state) => state.currentShape);
  const isDrawing = useAppStore((state) => state.isDrawing);

  const update = useAppStore((state) => state.update);
  const createShape = useAppStore((state) => state.createShape);
  const updateShape = useAppStore((state) => state.updateShape);

  const canDrawShape = action === "shape";

  const startDrawing = (e: KonvaEventObject<PointerEvent>) => {
    if (!canDrawShape) return;
    const name = uuidv4();
    update({ isDrawing: true, currentShape: name });

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getPointerPosition();

    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      createShape(drawAction, { name, x: pointer.x, y: pointer.y, width: 1, height: 1 });
    } else if (drawAction === "circle") {
      createShape(drawAction, { name, x: pointer.x, y: pointer.y, radius: 1 });
    } else if (drawAction === "line") {
      createShape(drawAction, {
        name,
        x: 0,
        y: 0,
        point1: [pointer.x, pointer.y],
        point2: [pointer.x, pointer.y],
      });
    }
  };

  const whileDrawing = (e: KonvaEventObject<PointerEvent>) => {
    if (!isDrawing || !canDrawShape) return;
    const shape = shapes[drawAction][currentShape];
    if (!shape) return;

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getPointerPosition();
    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      updateShape(drawAction, currentShape, {
        width: pointer.x - shape.x,
        height: pointer.y - shape.y,
      });
    } else if (drawAction === "circle") {
      updateShape(drawAction, currentShape, {
        radius: Math.abs(pointer.x - shape.x),
      });
    } else if (drawAction === "line") {
      const lineShape = shape as LineShapeType;
      updateShape(drawAction, currentShape, {
        point1: lineShape.point1,
        point2: [pointer.x, pointer.y],
      });
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !canDrawShape) return;
    update({ isDrawing: false });
  };

  return { startDrawing, whileDrawing, stopDrawing };
};

export default useDrawShapes;

import { useAppStore } from "@/stores/appStore";
import { LineShapeType } from "@/types/objects";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from "uuid";

const useDrawShapes = () => {
  const objects = useAppStore((state) => state.objects);
  const action = useAppStore((state) => state.action);
  const drawAction = useAppStore((state) => state.drawAction);
  const currentObject = useAppStore((state) => state.currentObject);
  const isDrawing = useAppStore((state) => state.isDrawing);

  const update = useAppStore((state) => state.update);
  const createObject = useAppStore((state) => state.createObject);
  const updateObject = useAppStore((state) => state.updateObject);

  const canDrawShape = action === "shape";

  const startDrawing = (e: KonvaEventObject<PointerEvent>) => {
    if (!canDrawShape) return;
    const id = uuidv4();
    const name = "object";

    update({ isDrawing: true, currentObject: id });

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getPointerPosition();

    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      createObject({
        id,
        type: "rect",
        name,
        x: pointer.x,
        y: pointer.y,
        width: 1,
        height: 1,
        fill: "#ff0000",
        borderColor: "#000000",
        borderWidth: 2,
      });
    } else if (drawAction === "circle") {
      createObject({ id, type: "circle", name, x: pointer.x, y: pointer.y, radius: 1 });
    } else if (drawAction === "line") {
      createObject({
        id,
        type: "line",
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
    const shape = objects[currentObject];
    if (!shape) return;

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getPointerPosition();
    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      updateObject(currentObject, {
        width: pointer.x - shape.x,
        height: pointer.y - shape.y,
      });
    } else if (drawAction === "circle") {
      updateObject(currentObject, {
        radius: Math.abs(pointer.x - shape.x),
      });
    } else if (drawAction === "line") {
      const lineShape = shape as LineShapeType;
      updateObject(currentObject, {
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

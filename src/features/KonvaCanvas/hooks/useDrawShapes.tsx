import usePage from "@/hooks/usePage";
import { useAppStore } from "@/stores/appStore";
import { LineShapeType } from "@/types/objects";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from "uuid";

const useDrawShapes = () => {
  const { objects } = usePage();
  const drawAction = useAppStore((state) => state.drawAction);
  const currentObject = useAppStore((state) => state.currentObject);
  const isDrawing = useAppStore((state) => state.isDrawing);

  const update = useAppStore((state) => state.update);
  const createObject = useAppStore((state) => state.createObject);
  const updateObject = useAppStore((state) => state.updateObject);

  const startDrawing = (e: KonvaEventObject<PointerEvent>) => {
    const id = uuidv4();
    const name = "object";

    update({ isDrawing: true, currentObject: id });

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getRelativePointerPosition();

    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      createObject({
        id,
        type: "rect",
        name,
        position: { x: pointer.x, y: pointer.y },
        width: 1,
        height: 1,
        fill: "#ff0000",
        borderColor: "#000000",
        borderWidth: 2,
      });
    } else if (drawAction === "circle") {
      createObject({
        id,
        type: "circle",
        name,
        position: { x: pointer.x, y: pointer.y },
        radius: 1,
        fill: "#ff0000",
        borderColor: "#000000",
        borderWidth: 2,
      });
    } else if (drawAction === "line") {
      createObject({
        id,
        type: "line",
        name,
        position: { x: 0, y: 0 },
        point1: { x: pointer.x, y: pointer.y },
        point2: { x: pointer.x, y: pointer.y },
        color: "#000000",
        thickness: 1,
      });
    }
  };

  const whileDrawing = (e: KonvaEventObject<PointerEvent>) => {
    if (!isDrawing || !currentObject) return;
    const shape = objects[currentObject];
    if (!shape) return;

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getRelativePointerPosition();
    if (!stage || !pointer) return;

    if (drawAction === "rect") {
      updateObject(currentObject, {
        width: pointer.x - shape.position.x,
        height: pointer.y - shape.position.y,
      });
    } else if (drawAction === "circle") {
      const distanceX = Math.abs(pointer.x - shape.position.x);
      const distanceY = Math.abs(pointer.y - shape.position.y);

      updateObject(currentObject, {
        radius: Math.max(distanceX, distanceY),
      });
    } else if (drawAction === "line") {
      const lineShape = shape as LineShapeType;
      updateObject(currentObject, {
        point1: lineShape.point1,
        point2: { x: pointer.x, y: pointer.y },
      });
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    update({ isDrawing: false });
  };

  return { startDrawing, whileDrawing, stopDrawing };
};

export default useDrawShapes;

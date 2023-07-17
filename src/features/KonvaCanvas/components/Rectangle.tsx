import { useAppStore } from "@/stores/appStore";
import { RectShapeType } from "@/types/objects";
import { Rect } from "react-konva";
import { FC } from "react";

type RectangleType = {
  shape: RectShapeType;
};

const Rectangle: FC<RectangleType> = ({ shape }) => {
  const action = useAppStore((state) => state.action);
  const currentShape = useAppStore((state) => state.currentShape);
  const update = useAppStore((state) => state.update);

  const isActive = currentShape === shape.name;

  const setActive = () => {
    update({ currentShape: shape.name });
  };

  return (
    <Rect
      onClick={setActive}
      onPointerDown={setActive}
      x={shape.x}
      y={shape.y}
      draggable={action === "select"}
      width={shape.width}
      height={shape.height}
      fill="red"
      stroke="black"
      strokeWidth={2}
      strokeEnabled={isActive}
    />
  );
};

export default Rectangle;

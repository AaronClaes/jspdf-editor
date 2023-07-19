import { useAppStore } from "@/stores/appStore";
import { RectShapeType } from "@/types/objects";
import { Rect } from "react-konva";
import { FC } from "react";

type RectangleType = {
  shape: RectShapeType;
};

const Rectangle: FC<RectangleType> = ({ shape }) => {
  const action = useAppStore((state) => state.action);
  const currentObject = useAppStore((state) => state.currentObject);
  const update = useAppStore((state) => state.update);

  const isActive = currentObject === shape.id;

  const setActive = () => {
    update({ currentObject: shape.id });
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
      fill={shape.fill}
      stroke={shape.borderColor}
      strokeWidth={shape.borderWidth}
    />
  );
};

export default Rectangle;

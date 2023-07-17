import { useAppStore } from "@/stores/appStore";
import { CircleShapeType } from "@/types/objects";
import { Circle as KonvaCircle } from "react-konva";
import { FC } from "react";

type CircleType = {
  shape: CircleShapeType;
};

const Circle: FC<CircleType> = ({ shape }) => {
  const action = useAppStore((state) => state.action);
  const currentShape = useAppStore((state) => state.currentShape);
  const update = useAppStore((state) => state.update);

  const isActive = currentShape === shape.name;

  const setActive = () => {
    if (action !== "select") return;
    update({ currentShape: shape.name });
  };

  return (
    <KonvaCircle
      onClick={setActive}
      onPointerDown={setActive}
      x={shape.x}
      y={shape.y}
      draggable={action === "select"}
      radius={shape.radius}
      fill="red"
      stroke="black"
      strokeWidth={2}
      strokeEnabled={isActive}
    />
  );
};

export default Circle;

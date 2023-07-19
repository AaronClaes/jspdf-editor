import { useAppStore } from "@/stores/appStore";
import { CircleShapeType } from "@/types/objects";
import { Circle as KonvaCircle } from "react-konva";
import { FC } from "react";

type CircleType = {
  shape: CircleShapeType;
};

const Circle: FC<CircleType> = ({ shape }) => {
  const action = useAppStore((state) => state.action);
  const currentObject = useAppStore((state) => state.currentObject);
  const update = useAppStore((state) => state.update);

  const isActive = currentObject === shape.id;

  const setActive = () => {
    if (action !== "select") return;
    update({ currentObject: shape.id });
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

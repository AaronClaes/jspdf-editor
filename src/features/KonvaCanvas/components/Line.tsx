import { useAppStore } from "@/stores/appStore";
import { LineShapeType } from "@/types/objects";
import { Line as KonvaLine } from "react-konva";
import { FC } from "react";

type LineType = {
  shape: LineShapeType;
};

const Line: FC<LineType> = ({ shape }) => {
  const action = useAppStore((state) => state.action);
  const currentShape = useAppStore((state) => state.currentShape);
  const update = useAppStore((state) => state.update);

  const isActive = currentShape === shape.name;

  const setActive = () => {
    update({ currentShape: shape.name });
  };

  return (
    <KonvaLine
      onClick={setActive}
      onPointerDown={setActive}
      points={[...shape.point1, ...shape.point2]}
      draggable={action === "select"}
      fill="red"
      stroke="black"
      strokeWidth={isActive ? 3 : 2}
    />
  );
};

export default Line;

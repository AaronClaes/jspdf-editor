import { useAppStore } from "@/stores/appStore";
import { LineShapeType } from "@/types/objects";
import { Line as KonvaLine } from "react-konva";
import { FC } from "react";
import useObject from "../hooks/useObject";

type LineProps = {
  shape: LineShapeType;
};

const Line: FC<LineProps> = ({ shape }) => {
  const objectBinds = useObject(shape);
  const currentObject = useAppStore((state) => state.currentObject);

  const isActive = currentObject === shape.id;

  return (
    <KonvaLine
      {...objectBinds}
      points={[...shape.point1, ...shape.point2]}
      fill="red"
      stroke="black"
      strokeWidth={isActive ? 3 : 2}
    />
  );
};

export default Line;

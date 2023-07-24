import { useAppStore } from "@/stores/appStore";
import { CircleShapeType } from "@/types/objects";
import { Circle as KonvaCircle } from "react-konva";
import { FC } from "react";
import useObject from "../hooks/useObject";

type CircleProps = {
  shape: CircleShapeType;
};

const Circle: FC<CircleProps> = ({ shape }) => {
  const objectBinds = useObject(shape);
  const action = useAppStore((state) => state.action);
  const currentObject = useAppStore((state) => state.currentObject);

  const isActive = currentObject === shape.id;

  return (
    <KonvaCircle
      {...objectBinds}
      draggable={action === "select"}
      radius={shape.radius}
      fill={shape.fill}
      stroke={shape.borderColor}
      strokeWidth={shape.borderWidth}
    />
  );
};

export default Circle;

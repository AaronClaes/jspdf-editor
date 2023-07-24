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

  return (
    <KonvaLine
      {...objectBinds}
      points={[shape.point1.x, shape.point1.y, shape.point2.x, shape.point2.y]}
      stroke={shape.color}
      strokeWidth={shape.thickness}
    />
  );
};

export default Line;

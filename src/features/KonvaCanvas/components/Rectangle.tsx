import { RectShapeType } from "@/types/objects";
import { Rect } from "react-konva";
import { FC } from "react";
import useObject from "../hooks/useObject";

type RectangleProps = {
  shape: RectShapeType;
};

const Rectangle: FC<RectangleProps> = ({ shape }) => {
  const objectBinds = useObject(shape);

  return (
    <Rect
      {...objectBinds}
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={shape.borderColor}
      strokeWidth={shape.borderWidth}
    />
  );
};

export default Rectangle;

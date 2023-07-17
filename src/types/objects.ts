export type ShapeTypeType = "rect";

export type ShapeType = {
  name: string;
  x: number;
  y: number;
};

export type RectShapeType = ShapeType & {
  width: number;
  height: number;
};

export type CircleShapeType = ShapeType & {
  radius: number;
};

export type LineShapeType = ShapeType & {
  point1: [number, number];
  point2: [number, number];
};

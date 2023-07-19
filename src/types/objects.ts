export type ObjectType = {
  id: string;
  name: string;
  x: number;
  y: number;
};

export type RectShapeType = ObjectType & {
  type: "rect";
  width: number;
  height: number;
  fill: string;
  borderWidth: number;
  borderColor: string;
};

export type CircleShapeType = ObjectType & {
  type: "circle";
  radius: number;
};

export type LineShapeType = ObjectType & {
  type: "line";
  point1: [number, number];
  point2: [number, number];
};

const globalFields = {
  id: {
    type: "string",
    isEditable: false,
    label: null,
  },
  name: {
    type: "string",
    isEditable: true,
    label: "Object name",
  },
  type: {
    type: "string",
    isEditable: false,
    label: null,
  },
  x: {
    type: "number",
    isEditable: true,
    label: null,
  },
  y: {
    type: "number",
    isEditable: true,
    label: null,
  },
};

export const objectFields = {
  rect: {
    ...globalFields,
    width: {
      type: "number",
      isEditable: true,
      label: null,
    },
    height: {
      type: "number",
      isEditable: true,
      label: null,
    },
    fill: {
      type: "color",
      isEditable: true,
      label: null,
    },
    borderWidth: {
      type: "number",
      isEditable: true,
      label: "border width",
    },
    borderColor: {
      type: "color",
      isEditable: true,
      label: "border color",
    },
  },
  circle: { ...globalFields },
  line: { ...globalFields },
};

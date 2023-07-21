export type ObjectType = {
  id: string;
  name: string;
  position: { x: number; y: number };
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

export type TextType = ObjectType & {
  type: "text";
  value: string;
};

const globalFields: {
  [key: string]: fieldSettings;
} = {
  id: {
    type: "text",
    isEditable: false,
    label: null,
  },
  name: {
    type: "text",
    isEditable: true,
    label: "Object name",
  },
  type: {
    type: "text",
    isEditable: false,
    label: null,
  },
  position: {
    type: "vector2",
    isEditable: true,
    label: null,
  },
};

export type fieldSettings = {
  type: "number" | "text" | "color" | "vector2";
  isEditable: boolean;
  label: string | null;
};

export const objectFields: {
  [key: string]: {
    [key: string]: fieldSettings;
  };
} = {
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

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
  fill: string;
  borderWidth: number;
  borderColor: string;
};

export type LineShapeType = ObjectType & {
  type: "line";
  point1: { x: number; y: number };
  point2: { x: number; y: number };
  thickness: number;
  color: string;
};

export type TextType = ObjectType & {
  type: "text";
  value: string;
  color: string;
  fontSize: number;
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
  invert?: boolean;
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
      invert: true,
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
  circle: {
    ...globalFields,
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
  line: {
    ...globalFields,
    point1: {
      type: "vector2",
      isEditable: true,
      label: null,
    },
    point2: {
      type: "vector2",
      isEditable: true,
      label: null,
    },
    thickness: {
      type: "number",
      isEditable: true,
      label: null,
    },
    color: {
      type: "color",
      isEditable: true,
      label: null,
    },
  },
  text: {
    ...globalFields,
    value: { type: "text", isEditable: true, label: null },
    color: { type: "color", isEditable: true, label: null },
    fontSize: { type: "number", isEditable: true, label: null },
  },
};

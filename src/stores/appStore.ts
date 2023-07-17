import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { produce } from "immer";
import { BooleanKeys } from "@/types/helpers";
import { CircleShapeType, LineShapeType, RectShapeType, ShapeType } from "@/types/objects";

type CreateShapeType = {
  (type: "rect", shape: RectShapeType): void;
  (type: "circle", shape: CircleShapeType): void;
  (type: "line", shape: LineShapeType): void;
};

type UpdateShapeType = {
  (type: "rect", name: string, values: Partial<RectShapeType>): void;
  (type: "circle", name: string, values: Partial<CircleShapeType>): void;
  (type: "line", name: string, values: Partial<LineShapeType>): void;
};

export interface AppState {
  action: "select" | "shape" | "text";
  drawAction: "rect" | "circle" | "line";
  objects: {
    shapes: {
      rect: { [key: string]: RectShapeType };
      circle: { [key: string]: CircleShapeType };
      line: { [key: string]: LineShapeType };
    };
  };
  isDrawing: boolean;
  currentShape: string;
  showCode: boolean;
  createShape: CreateShapeType;
  updateShape: UpdateShapeType;
  update: (options: Partial<AppStateValues>) => void;
  toggle: (option: BooleanKeys<AppStateValues>) => void;
  clearObjects: () => void;
  clearStore: () => void;
}

type AppStateValues = Omit<
  AppState,
  "createShape" | "updateShape" | "update" | "toggle" | "clearObjects" | "clearStore"
>;

const initialState: AppStateValues = {
  action: "select",
  drawAction: "rect",
  objects: {
    shapes: {
      rect: {},
      circle: {},
      line: {},
    },
  },
  isDrawing: false,
  currentShape: "",
  showCode: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  createShape: (type, shape) =>
    set(
      produce((state: AppState) => {
        state.objects.shapes[type][shape.name] = shape;
      })
    ),
  updateShape: (type, name, values) =>
    set(
      produce((state: AppState) => {
        let shape = state.objects.shapes[type][name];
        if (!shape) return;

        for (const key in values) {
          let shapeKey = key as keyof ShapeType;

          shape[shapeKey] = values[shapeKey] as never;
        }
      })
    ),
  update: (options) => set((state) => ({ ...state, ...options })),
  toggle: (option) => set((state) => ({ [option]: !state[option] })),
  clearObjects: () =>
    set(
      produce((state: AppState) => {
        state.objects = {
          shapes: {
            rect: {},
            circle: {},
            line: {},
          },
        };
      })
    ),
  clearStore: () => set(() => initialState),
}));

// download the react devtools extension to debug your store
mountStoreDevtool("AppStore", useAppStore);

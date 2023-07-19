import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { produce } from "immer";
import { BooleanKeys } from "@/types/helpers";
import { CircleShapeType, LineShapeType, RectShapeType, ObjectType } from "@/types/objects";

type CreateObjectType = {
  (object: RectShapeType): void;
  (object: CircleShapeType): void;
  (object: LineShapeType): void;
};

type UpdateObjectType = {
  (name: string, values: Partial<RectShapeType>): void;
  (name: string, values: Partial<CircleShapeType>): void;
  (name: string, values: Partial<LineShapeType>): void;
};

export interface AppState {
  action: "select" | "shape" | "text";
  drawAction: "rect" | "circle" | "line";
  objects: { [key: string]: RectShapeType | CircleShapeType | LineShapeType };
  isDrawing: boolean;
  currentObject: string;
  createObject: CreateObjectType;
  updateObject: UpdateObjectType;
  update: (options: Partial<AppStateValues>) => void;
  toggle: (option: BooleanKeys<AppStateValues>) => void;
  clearObjects: () => void;
  clearStore: () => void;
}

type AppStateValues = Omit<
  AppState,
  "createObject" | "updateObject" | "update" | "toggle" | "clearObjects" | "clearStore"
>;

const initialState: AppStateValues = {
  action: "select",
  drawAction: "rect",
  objects: {},
  isDrawing: false,
  currentObject: "",
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  createObject: (object) =>
    set(
      produce((state: AppState) => {
        state.objects[object.id] = object;
      })
    ),
  updateObject: (id, values) =>
    set(
      produce((state: AppState) => {
        let object = state.objects[id];
        if (!object) return;

        for (const key in values) {
          let objectKey = key as keyof ObjectType;

          object[objectKey] = values[objectKey] as never;
        }
      })
    ),
  update: (options) => set((state) => ({ ...state, ...options })),
  toggle: (option) => set((state) => ({ [option]: !state[option] })),
  clearObjects: () =>
    set(
      produce((state: AppState) => {
        state.objects = {};
      })
    ),
  clearStore: () => set(() => initialState),
}));

// download the react devtools extension to debug your store
mountStoreDevtool("AppStore", useAppStore);

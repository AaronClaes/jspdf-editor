import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { produce } from "immer";
import { BooleanKeys, NonFunctionKeys } from "@/types/helpers";
import { CircleShapeType, LineShapeType, RectShapeType, ObjectType } from "@/types/objects";

type CreateObjectType = {
  (object: RectShapeType): void;
  (object: CircleShapeType): void;
  (object: LineShapeType): void;
};

type UpdateObjectType = {
  (id: string, values: Partial<RectShapeType>): void;
  (id: string, values: Partial<CircleShapeType>): void;
  (id: string, values: Partial<LineShapeType>): void;
};

type PageType = {
  thumbnail: string;
  objects: { [key: string]: RectShapeType | CircleShapeType | LineShapeType };
};

export interface AppState {
  action: "select" | "shape" | "text";
  drawAction: "rect" | "circle" | "line";
  currentPage: number;
  pages: PageType[];
  isDrawing: boolean;
  currentObject: string;
  sidePanelTab: number;
  createPage: () => void;
  updatePage: (pageIndex: number, values: Partial<PageType>) => void;
  createObject: CreateObjectType;
  updateObject: UpdateObjectType;
  update: (options: Partial<AppStateValues>) => void;
  toggle: (option: BooleanKeys<AppStateValues>) => void;
  clearObjects: (pageIndex: number) => void;
  clearStore: () => void;
}

type AppStateValues = NonFunctionKeys<AppState>;

const initialState: AppStateValues = {
  action: "select",
  drawAction: "rect",
  currentPage: 0,
  pages: [{ thumbnail: "", objects: {} }],
  isDrawing: false,
  currentObject: "",
  sidePanelTab: -1,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  createPage: () => set((state) => ({ pages: [...state.pages, { thumbnail: "", objects: {} }] })),
  updatePage: (pageIndex, values) =>
    set(
      produce((state: AppState) => {
        let page = state.pages[pageIndex];
        if (!page) return;

        for (const key in values) {
          let objectKey = key as keyof PageType;
          page[objectKey] = values[objectKey] as never;
        }
      })
    ),
  createObject: (object) =>
    set(
      produce((state: AppState) => {
        state.pages[state.currentPage].objects[object.id] = object;
      })
    ),
  updateObject: (id, values) =>
    set(
      produce((state: AppState) => {
        let object = state.pages[state.currentPage].objects[id];
        if (!object) return;

        for (const key in values) {
          let objectKey = key as keyof ObjectType;

          object[objectKey] = values[objectKey] as never;
        }
      })
    ),
  update: (options) => set((state) => ({ ...state, ...options })),
  toggle: (option) => set((state) => ({ [option]: !state[option] })),
  clearObjects: (pageIndex) =>
    set(
      produce((state: AppState) => {
        state.pages[pageIndex].objects = {};
      })
    ),
  clearStore: () => set(() => initialState),
}));

// download the react devtools extension to debug your store
mountStoreDevtool("AppStore", useAppStore);

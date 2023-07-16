import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { produce } from "immer";
import { BooleanKeys } from "@/types/helpers";

// initial state of the store

export interface AppState {
  action: "select" | "shape" | "text";
  drawAction: "draw_rect" | "draw_circle" | "draw_line";
  update: (options: Partial<AppStateValues>) => void;
  toggle: (option: BooleanKeys<AppStateValues>) => void;

  clearStore: () => void;
}

type AppStateValues = Omit<AppState, "update" | "toggle" | "clearStore">;

const initialState: AppStateValues = {
  action: "select",
  drawAction: "draw_rect",
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  update: (options) => set((state) => ({ ...state, ...options })),
  toggle: (option) => set((state) => ({ [option]: !state[option] })),
  clearStore: () => set(() => initialState),
}));

// download the react devtools extension to debug your store
mountStoreDevtool("AppStore", useAppStore);

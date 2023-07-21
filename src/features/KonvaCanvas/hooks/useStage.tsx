import { useAppStore } from "@/stores/appStore";
import { KonvaPointerEvent } from "@/types/events";
import Konva from "konva";
import useDrawShapes from "./useDrawShapes";
import useAddText from "./useAddText";

const useStage = () => {
  const { startDrawing, whileDrawing, stopDrawing } = useDrawShapes();
  const action = useAppStore((state) => state.action);
  const update = useAppStore((state) => state.update);
  const { AddText } = useAddText();

  const onClick = (e: KonvaPointerEvent) => {
    if (action === "select") {
      if (!(e.target instanceof Konva.Stage)) return;
      update({ currentObject: undefined });
    } else if (action === "text") {
      AddText(e);
    }
  };

  const onPointerDown = (e: KonvaPointerEvent) => {
    if (action === "shape") {
      startDrawing(e);
    }
  };
  const onPointerMove = (e: KonvaPointerEvent) => {
    if (action === "shape") {
      whileDrawing(e);
    }
  };
  const onPointerUp = (e: KonvaPointerEvent) => {
    if (action === "shape") {
      stopDrawing();
    }
  };

  return { onClick, onPointerDown, onPointerMove, onPointerUp };
};

export default useStage;

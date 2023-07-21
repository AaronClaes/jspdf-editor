import { useAppStore } from "@/stores/appStore";
import { KonvaPointerEvent } from "@/types/events";
import { v4 as uuidv4 } from "uuid";

const useAddText = () => {
  const update = useAppStore((state) => state.update);
  const createObject = useAppStore((state) => state.createObject);

  const AddText = (e: KonvaPointerEvent) => {
    const id = uuidv4();
    const name = "text";

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getPointerPosition();

    if (!stage || !pointer) return;

    createObject({ id, name, type: "text", position: { x: pointer.x, y: pointer.y }, value: "" });
    update({ currentObject: id });
  };
  return { AddText };
};

export default useAddText;

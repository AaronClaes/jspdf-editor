import { useAppStore } from "@/stores/appStore";
import { KonvaPointerEvent } from "@/types/events";
import { v4 as uuidv4 } from "uuid";

const useAddText = () => {
  const update = useAppStore((state) => state.update);
  const createObject = useAppStore((state) => state.createObject);
  const fontSize = useAppStore((state) => state.fontSize);

  const AddText = (e: KonvaPointerEvent) => {
    const id = uuidv4();
    const name = "text";

    const stage = e.currentTarget.getStage();
    const pointer = stage?.getRelativePointerPosition();

    if (!stage || !pointer) return;

    createObject({
      id,
      name,
      type: "text",
      position: { x: pointer.x, y: pointer.y },
      value: "",
      color: "#000000",
      fontSize,
    });
    update({ currentObject: id });
  };
  return { AddText };
};

export default useAddText;

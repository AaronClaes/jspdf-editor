import { useAppStore } from "@/stores/appStore";
import { ObjectType } from "@/types/objects";

const useObject = <T extends ObjectType>(object: T) => {
  const action = useAppStore((state) => state.action);
  const update = useAppStore((state) => state.update);

  const setActive = () => {
    if (action !== "select") return;
    update({ currentObject: object.id });
  };

  return {
    onClick: setActive,
    onPointerDown: setActive,
    x: object.position.x,
    y: object.position.y,
    draggable: action === "select",
  };
};

export default useObject;

import { useAppStore } from "@/stores/appStore";

const usePage = () => {
  const currentObject = useAppStore((state) => state.currentObject);
  const currentPage = useAppStore((state) => state.currentPage);
  const objects = useAppStore((state) => state.pages[currentPage].objects);

  const currentObjectData = currentObject ? objects[currentObject] : undefined;
  return { currentPage, objects, currentObject: currentObjectData };
};

export default usePage;

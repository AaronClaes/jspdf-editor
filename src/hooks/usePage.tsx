import { useAppStore } from "@/stores/appStore";

const usePage = () => {
  const currentObject = useAppStore((state) => state.currentObject);
  const currentPage = useAppStore((state) => state.currentPage);
  const objects = useAppStore((state) => state.pages[currentPage].objects);

  return { currentPage, objects, currentObject: objects[currentObject] };
};

export default usePage;

import { useAppStore } from "@/stores/appStore";

const usePage = () => {
  const currentPage = useAppStore((state) => state.currentPage);
  const objects = useAppStore((state) => state.pages[currentPage].objects);

  return { currentPage, objects };
};

export default usePage;

import NumberField from "@/components/NumberField";
import usePage from "@/hooks/usePage";
import { useAppStore } from "@/stores/appStore";
import { Stack } from "@mui/material";

const TextOptions = () => {
  const fontSize = useAppStore((state) => state.fontSize);
  const updateObject = useAppStore((state) => state.updateObject);
  const update = useAppStore((state) => state.update);
  const { currentObject } = usePage();

  const handleFontChange = (value: string | number) => {
    const newFontSize = typeof value === "string" ? parseInt(value) : value;
    if (newFontSize.toString().length > 3) return;

    update({ fontSize: newFontSize });

    if (currentObject?.type === "text") {
      updateObject(currentObject.id, { fontSize: newFontSize });
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <NumberField value={fontSize} onChange={handleFontChange} />
    </Stack>
  );
};

export default TextOptions;

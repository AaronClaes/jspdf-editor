import { Stack, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";

type Vector2InputProps = PanelOptionProps;

const Vector2Input: FC<Vector2InputProps> = ({ value, objectId }) => {
  const vectorValue = value as { x: number; y: number };

  const updateObject = useAppStore((state) => state.updateObject);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof typeof vectorValue
  ) => {
    updateObject(objectId, { position: { ...vectorValue, [key]: e.target.value } });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        onChange={(e) => handleChange(e, "x")}
        label="x"
        placeholder="x"
        fullWidth
        value={vectorValue.x}
        type="number"
      />
      <TextField
        onChange={(e) => handleChange(e, "y")}
        label="y"
        placeholder="y"
        fullWidth
        value={vectorValue.y}
        type="number"
      />
    </Stack>
  );
};

export default Vector2Input;

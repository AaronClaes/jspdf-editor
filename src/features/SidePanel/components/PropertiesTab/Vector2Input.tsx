import { Stack } from "@mui/material";
import { FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";
import NumberField from "@/components/NumberField";
import { invertNumber } from "@/helpers/invertNumber";

type Vector2InputProps = PanelOptionProps;

const Vector2Input: FC<Vector2InputProps> = ({ field, value, objectId }) => {
  const vectorValue = value as { x: number; y: number };

  const updateObject = useAppStore((state) => state.updateObject);
  const handleChange = (value: number, key: keyof typeof vectorValue) => {
    updateObject(objectId, { [field]: { ...vectorValue, [key]: value } });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <NumberField
        onChange={(value) => handleChange(value, "x")}
        label="x"
        placeholder="x"
        fullWidth
        value={vectorValue.x}
        size="small"
      />
      <NumberField
        onChange={(value) => handleChange(invertNumber(value), "y")}
        label="y"
        placeholder="y"
        fullWidth
        value={invertNumber(vectorValue.y)}
        size="small"
      />
    </Stack>
  );
};

export default Vector2Input;

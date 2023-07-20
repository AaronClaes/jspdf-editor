import { TextField } from "@mui/material";
import { FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";

type NumberInputProps = PanelOptionProps;

const NumberInput: FC<NumberInputProps> = ({ settings, field, value, objectId }) => {
  const updateObject = useAppStore((state) => state.updateObject);

  return (
    <TextField
      onChange={(e) => updateObject(objectId, { [field]: parseFloat(e.target.value) })}
      label={settings.label || field}
      placeholder={settings.label || field}
      fullWidth
      value={value}
      type="number"
    />
  );
};

export default NumberInput;

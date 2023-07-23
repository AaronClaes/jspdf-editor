import { TextField } from "@mui/material";
import { FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";

type TextInputProps = PanelOptionProps;

const TextInput: FC<TextInputProps> = ({ settings, field, value, objectId }) => {
  const updateObject = useAppStore((state) => state.updateObject);

  return (
    <TextField
      onChange={(e) => updateObject(objectId, { [field]: e.target.value })}
      label={settings.label || field}
      placeholder={settings.label || field}
      fullWidth
      value={value}
      type="text"
      size="small"
    />
  );
};

export default TextInput;

import { FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";
import NumberField from "@/components/NumberField";

type NumberInputProps = PanelOptionProps & {
  value: number;
};

const NumberInput: FC<NumberInputProps> = ({ settings, field, value, objectId }) => {
  const updateObject = useAppStore((state) => state.updateObject);

  return (
    <NumberField
      onChange={(value) => updateObject(objectId, { [field]: value })}
      label={settings.label || field}
      placeholder={settings.label || field}
      fullWidth
      value={value}
      size="small"
    />
  );
};

export default NumberInput;

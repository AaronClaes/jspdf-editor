import { FC } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";
import NumberField from "@/components/NumberField";
import { invertNumber } from "@/helpers/invertNumber";

type NumberInputProps = PanelOptionProps & {
  value: number;
};

const NumberInput: FC<NumberInputProps> = ({ settings, field, value, objectId }) => {
  const updateObject = useAppStore((state) => state.updateObject);

  const numberValue = settings.invert ? invertNumber(value) : value;

  const handleChange = (value: number) => {
    const newValue = settings.invert ? invertNumber(value) : value;
    updateObject(objectId, { [field]: newValue });
  };

  return (
    <NumberField
      onChange={handleChange}
      label={settings.label || field}
      placeholder={settings.label || field}
      fullWidth
      value={numberValue}
      size="small"
    />
  );
};

export default NumberInput;

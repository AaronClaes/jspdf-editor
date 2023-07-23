import { Box, Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import { PanelOptionProps } from ".";
import { useAppStore } from "@/stores/appStore";
import { HexColorPicker } from "react-colorful";
import { useOnClickOutside } from "usehooks-ts";

type ColorInputProps = PanelOptionProps;

const ColorInput: FC<ColorInputProps> = ({ settings, field, value, objectId }) => {
  const colorValue = value as string;
  const updateObject = useAppStore((state) => state.updateObject);

  const [showPicker, setShowPicker] = useState(false);

  const colorPickerRef = useRef(null);
  useOnClickOutside(colorPickerRef, () => setShowPicker(false));

  return (
    <Box position="relative">
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          onChange={(e) => updateObject(objectId, { [field]: e.target.value })}
          label={settings.label || field}
          placeholder={settings.label || field}
          fullWidth
          value={value}
          type="text"
          size="small"
        />
        <Box
          borderRadius={1}
          minWidth="42px"
          height="42px"
          bgcolor={colorValue}
          onClick={() => setShowPicker((p) => !p)}
        />
      </Stack>
      {showPicker && (
        <Box
          ref={colorPickerRef}
          position="absolute"
          padding={1}
          bgcolor="background.paper"
          bottom="52px"
          right={0}
        >
          <HexColorPicker
            color={colorValue}
            onChange={(c) => updateObject(objectId, { [field]: c })}
          />
        </Box>
      )}
    </Box>
  );
};

export default ColorInput;

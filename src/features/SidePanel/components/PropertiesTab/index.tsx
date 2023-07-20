import { useAppStore } from "@/stores/appStore";
import { fieldSettings, objectFields } from "@/types/objects";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { FaRegSquareFull } from "react-icons/fa6";
import PanelHeader from "../PanelHeader";
import Vector2Input from "./Vector2Input";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import ColorInput from "./ColorInput";
import usePage from "@/hooks/usePage";

const PropertiesTab = () => {
  const currentObject = useAppStore((state) => state.currentObject);
  const { objects } = usePage();

  const activeObject = objects[currentObject];
  const activeObjectFields = activeObject ? objectFields[activeObject.type] : undefined;

  return (
    <Box width="100%">
      <PanelHeader title="Settings" />
      {activeObjectFields ? (
        <>
          <Stack p={1} direction="row" spacing={1} alignItems="center">
            <FaRegSquareFull size="22" />
            <Typography
              maxWidth="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              mb={1}
              variant="h6"
              fontSize="1rem"
            >
              {activeObject.name || "Object"}
            </Typography>
          </Stack>
          <Stack
            bgcolor="background.paper"
            p={2}
            borderRadius={1}
            m={2}
            spacing={2}
            alignItems="center"
          >
            {Object.keys(activeObjectFields).map((key) => {
              const fieldSettings = activeObjectFields[key as keyof typeof activeObjectFields];
              if (!fieldSettings.isEditable) return;

              return (
                <PanelOption
                  key={key}
                  objectId={activeObject.id}
                  settings={fieldSettings}
                  field={key}
                  value={activeObject[key as keyof typeof activeObject]}
                />
              );
            })}
          </Stack>
        </>
      ) : (
        "No object selected"
      )}
    </Box>
  );
};

export type PanelOptionProps = {
  objectId: string;
  settings: fieldSettings;
  value: unknown;
  field: string;
};

const PanelOption: FC<PanelOptionProps> = (props) => {
  const { settings } = props;

  return (
    <Box width="100%">
      {settings.type === "vector2" && <Vector2Input {...props} />}
      {settings.type === "text" && <TextInput {...props} />}
      {settings.type === "number" && <NumberInput {...props} />}
      {settings.type === "color" && <ColorInput {...props} />}
    </Box>
  );
};

export default PropertiesTab;

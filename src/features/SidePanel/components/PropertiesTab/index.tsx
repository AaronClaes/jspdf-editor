import { fieldSettings, objectFields } from "@/types/objects";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FaRegSquareFull } from "react-icons/fa6";
import PanelHeader from "../PanelHeader";
import Vector2Input from "./Vector2Input";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import ColorInput from "./ColorInput";
import usePage from "@/hooks/usePage";

const PropertiesTab = () => {
  const { currentObject } = usePage();

  const currentObjectFields = currentObject ? objectFields[currentObject.type] : undefined;

  return (
    <Box width="100%">
      <PanelHeader title="Settings" />
      {currentObject && currentObjectFields ? (
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
              {currentObject?.name || "Object"}
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
            {Object.keys(currentObjectFields).map((key) => {
              const fieldSettings = currentObjectFields[key as keyof typeof currentObjectFields];
              if (!fieldSettings.isEditable) return;

              return (
                <PanelOption
                  key={key}
                  objectId={currentObject.id}
                  settings={fieldSettings}
                  field={key}
                  value={currentObject[key as keyof typeof currentObject]}
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

const PanelOption: FC<PanelOptionProps> = ({ value, ...props }) => {
  const { settings } = props;

  return (
    <Box width="100%">
      {settings.type === "vector2" && <Vector2Input {...props} value={value} />}
      {settings.type === "text" && <TextInput {...props} value={value} />}
      {settings.type === "number" && typeof value === "number" && (
        <NumberInput {...props} value={value} />
      )}
      {settings.type === "color" && <ColorInput {...props} value={value} />}
    </Box>
  );
};

export default PropertiesTab;

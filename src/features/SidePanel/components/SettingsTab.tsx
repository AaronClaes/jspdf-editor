import { useAppStore } from "@/stores/appStore";
import { objectFields } from "@/types/objects";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC } from "react";
import { FaRegSquareFull } from "react-icons/fa6";
import PanelHeader from "./PanelHeader";

const SettingsTab = () => {
  const currentObject = useAppStore((state) => state.currentObject);
  const objects = useAppStore((state) => state.objects);

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
                  object={activeObject.id}
                  label={fieldSettings.label || key}
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

type PanelOptionProps = {
  object: string;
  label: string;
  value: unknown;
  field: string;
};

const PanelOption: FC<PanelOptionProps> = ({ object, label, field, value }) => {
  const updateObject = useAppStore((state) => state.updateObject);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateObject(object, { [field]: e.target.value });
  };

  return (
    <Box width="100%">
      <Box>
        <Typography textTransform="capitalize" color="GrayText">
          {label}
        </Typography>
      </Box>
      <Box>
        <TextField
          onChange={handleChange}
          variant="standard"
          placeholder={label}
          fullWidth
          value={value}
        />
      </Box>
    </Box>
  );
};

export default SettingsTab;

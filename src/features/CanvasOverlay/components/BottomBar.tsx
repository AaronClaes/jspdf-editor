"use client";
import LayoutIconButton from "@/components/LayoutIconButton";
import { AppState, useAppStore } from "@/stores/appStore";
import { Box, IconButton, Stack } from "@mui/material";
import { Fragment, ReactNode, cloneElement } from "react";
import { IconBaseProps } from "react-icons";
import { FaArrowPointer, FaHeading, FaMinus, FaRegCircle, FaRegSquareFull } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

const buttons: { icon: ReactNode; subOptions?: ReactNode; action: AppState["action"] }[] = [
  { icon: <FaArrowPointer />, subOptions: null, action: "select" },
  { icon: <FaRegSquareFull />, subOptions: <ShapesSubOptions />, action: "shape" },
  { icon: <FaHeading />, subOptions: null, action: "text" },
];

const BottomBar = () => {
  const update = useAppStore((state) => state.update);
  const action = useAppStore((state) => state.action);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      bottom={4}
      left={0}
      right={0}
      sx={{ pointerEvents: "none" }}
    >
      <Box p={1} bgcolor="background.paper" borderRadius={2} sx={{ pointerEvents: "auto" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          {buttons.map((button) => (
            <LayoutIconButton
              key={button.action}
              active={action === button.action}
              size="medium"
              subOptions={button.subOptions}
              onClick={() => update({ action: button.action })}
            >
              {cloneElement(button.icon as React.ReactElement<IconBaseProps>, {
                size: "18",
              })}
            </LayoutIconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

function ShapesSubOptions() {
  return (
    <Box p={1} bgcolor="background.paper" borderRadius={2}>
      <Stack direction="column" spacing={1} alignItems="center">
        <IconButton size="medium">
          <FaRegSquareFull size="18" />
        </IconButton>
        <IconButton size="medium">
          <FaRegCircle size="18" />
        </IconButton>
        <IconButton size="medium">
          <FaMinus size="18" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default BottomBar;

"use client";
import LayoutIconButton from "@/components/LayoutIconButton";
import { AppState, useAppStore } from "@/stores/appStore";
import { Box, IconButton, Stack } from "@mui/material";
import { ReactNode, cloneElement, useState } from "react";
import { IconBaseProps } from "react-icons";
import {
  FaArrowPointer,
  FaHeading,
  FaMinus,
  FaRegCircle,
  FaRegSquareFull,
  FaTrashCan,
} from "react-icons/fa6";
import ConfirmDialog from "./ConfirmDialog";

type IconButtonValuesType = {
  icon: ReactNode;
  subOptions?: ReactNode;
  action: AppState["action"];
};

type SubIconButtonValuesType = {
  icon: ReactNode;
  action: AppState["drawAction"];
};

const buttons: IconButtonValuesType[] = [
  { icon: <FaArrowPointer />, subOptions: null, action: "select" },
  { icon: <ShapeIcon />, subOptions: <ShapesSubOptions />, action: "shape" },
  { icon: <FaHeading />, subOptions: null, action: "text" },
];

const BottomBar = () => {
  const update = useAppStore((state) => state.update);
  const action = useAppStore((state) => state.action);
  const clearObjects = useAppStore((state) => state.clearObjects);

  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        sx={{ pointerEvents: "none" }}
      >
        <Box p={1} bgcolor="background.paper" borderRadius={2} sx={{ pointerEvents: "auto" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {buttons.map((button) => {
              const isActive = action === button.action ? "true" : "false";
              return (
                <LayoutIconButton
                  key={button.action}
                  isActive={isActive}
                  size="medium"
                  subOptions={button.subOptions}
                  onClick={() => update({ action: button.action })}
                >
                  {cloneElement(button.icon as React.ReactElement<IconBaseProps>, {
                    size: "18",
                  })}
                </LayoutIconButton>
              );
            })}
          </Stack>
        </Box>
        <Box p={1} bgcolor="background.paper" borderRadius={2} sx={{ pointerEvents: "auto" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LayoutIconButton onClick={() => setConfirmClear(true)} size="medium">
              <FaTrashCan size="18" />
            </LayoutIconButton>
          </Stack>
        </Box>
      </Box>
      <ConfirmDialog
        isOpen={confirmClear}
        handleClose={() => setConfirmClear(false)}
        handleConfirm={() => {
          clearObjects();
          setConfirmClear(false);
        }}
      />
    </>
  );
};

const shapeButtons: SubIconButtonValuesType[] = [
  { icon: <FaRegSquareFull />, action: "rect" },
  { icon: <FaRegCircle />, action: "circle" },
  { icon: <FaMinus />, action: "line" },
];

function ShapesSubOptions() {
  const update = useAppStore((state) => state.update);
  const drawAction = useAppStore((state) => state.drawAction);

  return (
    <Box p={1} bgcolor="background.paper" borderRadius={2}>
      <Stack direction="column" spacing={1} alignItems="center">
        {shapeButtons.map((button) => {
          const isActive = drawAction === button.action ? "true" : "false";
          return (
            <LayoutIconButton
              key={button.action}
              isActive={isActive}
              size="medium"
              onClick={() => {
                update({ action: "shape", drawAction: button.action });
              }}
            >
              {cloneElement(button.icon as React.ReactElement<IconBaseProps>, {
                size: "18",
              })}
            </LayoutIconButton>
          );
        })}
      </Stack>
    </Box>
  );
}

function ShapeIcon() {
  const drawAction = useAppStore((state) => state.drawAction);
  return (
    <>
      {cloneElement(
        shapeButtons.find((s) => s.action === drawAction)
          ?.icon as React.ReactElement<IconBaseProps>,
        {
          size: "18",
        }
      )}
    </>
  );
}

export default BottomBar;

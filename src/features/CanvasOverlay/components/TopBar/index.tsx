"use client";
import usePage from "@/hooks/usePage";
import { useAppStore } from "@/stores/appStore";
import { Box, Stack, TextField } from "@mui/material";
import TextOptions from "./TextOptions";

const TopBar = () => {
  const action = useAppStore((state) => state.action);
  const updateObject = useAppStore((state) => state.updateObject);
  const sidePanelTab = useAppStore((state) => state.sidePanelTab);
  const { currentObject } = usePage();

  const left = sidePanelTab === -1 ? "250px" : "-100px";

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        position="absolute"
        top="76px"
        left={left}
        right={0}
        sx={{ pointerEvents: "none", transition: "left 0.4s ease" }}
      >
        <Box p={1} bgcolor="background.paper" borderRadius={2} sx={{ pointerEvents: "auto" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {action === "text" || currentObject?.type === "text" ? (
              <TextOptions />
            ) : (
              "No action available"
            )}
          </Stack>
        </Box>
        {currentObject?.type === "text" && (
          <Box p={1} bgcolor="background.paper" borderRadius={2} sx={{ pointerEvents: "auto" }}>
            <Stack width="300px" direction="row" spacing={1} alignItems="center">
              <>
                <TextField
                  fullWidth
                  multiline
                  autoFocus
                  maxRows={10}
                  onChange={(e) => updateObject(currentObject.id, { value: e.target.value })}
                  placeholder="Text"
                  value={currentObject.value}
                  size="small"
                />
              </>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default TopBar;

"use client";
import usePage from "@/hooks/usePage";
import { useAppStore } from "@/stores/appStore";
import { Box, Stack, TextField, TextareaAutosize } from "@mui/material";

const TopBar = () => {
  const updateObject = useAppStore((state) => state.updateObject);
  const sidePanelTab = useAppStore((state) => state.sidePanelTab);

  const left = sidePanelTab === -1 ? "250px" : "-100px";

  const { currentObject } = usePage();

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

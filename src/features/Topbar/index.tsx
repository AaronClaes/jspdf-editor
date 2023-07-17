"use client";
import { useAppStore } from "@/stores/appStore";
import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { FaChevronLeft, FaCode, FaFloppyDisk } from "react-icons/fa6";

const Topbar = () => {
  const toggle = useAppStore((state) => state.toggle);
  return (
    <Toolbar
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "background.paper",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" alignItems="center">
        <IconButton size="large">
          <FaChevronLeft size="20" />
        </IconButton>
        <Typography sx={{ paddingLeft: 2, paddingRight: 2 }}>Filename here</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton size="large">
          <FaFloppyDisk size="20" />
        </IconButton>
        <IconButton onClick={() => toggle("showCode")} size="large">
          <FaCode size="20" />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default Topbar;

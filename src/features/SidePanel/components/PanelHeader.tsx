import { useAppStore } from "@/stores/appStore";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FaXmark } from "react-icons/fa6";

type PanelHeaderProps = {
  title: string;
};

const PanelHeader: FC<PanelHeaderProps> = ({ title }) => {
  const update = useAppStore((state) => state.update);
  return (
    <>
      <Stack p={1} direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography>{title}</Typography>
        <IconButton onClick={() => update({ sidePanelTab: -1 })}>
          <FaXmark size="18" />
        </IconButton>
      </Stack>
      <Divider light sx={{ mb: 1 }} />
    </>
  );
};

export default PanelHeader;

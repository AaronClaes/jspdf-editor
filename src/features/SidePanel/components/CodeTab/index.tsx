import { Box, Typography } from "@mui/material";
import Code from "./components/Code";
import PanelHeader from "../PanelHeader";

const CodeTab = () => {
  return (
    <>
      <PanelHeader title="Code" />
      <Box m={2}>
        <Code />
      </Box>
    </>
  );
};

export default CodeTab;

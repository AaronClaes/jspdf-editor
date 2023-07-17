import { Box, Typography } from "@mui/material";
import Code from "./components/Code";

const CodePanel = () => {
  return (
    <Box p={2} borderRadius={1} bgcolor="background.paper" width="100%">
      <Typography variant="subtitle1">Code: </Typography>
      <Code />
    </Box>
  );
};

export default CodePanel;

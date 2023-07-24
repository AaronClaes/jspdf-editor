"use client";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { FaCode, FaSliders } from "react-icons/fa6";
import PropertiesTab from "./components/PropertiesTab";
import CodeTab from "./components/CodeTab";
import { useAppStore } from "@/stores/appStore";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SidePanel = () => {
  const sidePanelTab = useAppStore((state) => state.sidePanelTab);
  const update = useAppStore((state) => state.update);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    update({ sidePanelTab: newValue });
  };

  const width = sidePanelTab === -1 ? "50px" : "400px";

  return (
    <Box
      display="flex"
      bgcolor="background.default"
      minWidth={width}
      maxWidth={width}
      sx={{
        transition: "min-width 0.4s ease, max-width 0.4s ease",
        borderLeft: 1,
        borderColor: "divider",
      }}
    >
      <StyledTabs
        orientation="vertical"
        variant="scrollable"
        value={sidePanelTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ minWidth: "50px" }}
      >
        <StyledTab icon={<FaSliders />} {...a11yProps(0)} />
        <StyledTab icon={<FaCode />} {...a11yProps(1)} />
      </StyledTabs>
      <Box width="calc(100% - 50px)" height="calc(100vh - 64px)" sx={{ overflowY: "auto" }}>
        {sidePanelTab === 0 && <PropertiesTab />}
        {sidePanelTab === 1 && <CodeTab />}
      </Box>
    </Box>
  );
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  ".MuiTabs-indicator": {
    left: 0,
    right: "auto",
  },
  width: "min-content",
  height: "calc(100dvh - 64px)",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  maxWidth: "50px",
  minWidth: "50px",
}));

export default SidePanel;

"use client";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { useState } from "react";
import { FaCode, FaSliders } from "react-icons/fa6";
import SettingsTab from "./components/SettingsTab";
import CodeTab from "./components/CodeTab";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(-1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" bgcolor="background.default" minWidth="400px" maxWidth="400px">
      <StyledTabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderLeft: 1, borderColor: "divider", minWidth: "50px" }}
      >
        <StyledTab icon={<FaSliders />} {...a11yProps(0)} />
        <StyledTab icon={<FaCode />} {...a11yProps(1)} />
      </StyledTabs>
      <Box width="calc(100% - 50px)" py={2} pr={2}>
        {value === 0 && <SettingsTab />}
        {value === 1 && <CodeTab />}
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

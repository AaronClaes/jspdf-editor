"use client";
import usePage from "@/hooks/usePage";
import { useAppStore } from "@/stores/appStore";
import { Box, Button, ButtonBase, Icon, Stack, styled } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const PagesPanel = () => {
  const { currentPage } = usePage();
  const pages = useAppStore((state) => state.pages);
  const createPage = useAppStore((state) => state.createPage);
  const update = useAppStore((state) => state.update);
  return (
    <Box
      display="flex"
      bgcolor="background.default"
      minWidth="300px"
      maxWidth="300px"
      sx={{
        transition: "min-width 0.4s ease, max-width 0.4s ease",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Stack width="100%" alignItems="center" p={4} spacing={2}>
        {pages.map((page, i) => (
          <Page
            onClick={() => update({ currentPage: i })}
            key={i}
            isActive={i === currentPage}
            thumbnail={page.thumbnail}
          />
        ))}
        <Button onClick={createPage} variant="outlined" fullWidth>
          Add new page
        </Button>
      </Stack>
    </Box>
  );
};

const Page = styled(ButtonBase)<{ isActive: boolean; thumbnail: string }>(
  ({ theme, isActive, thumbnail }) => ({
    width: "238px",
    height: "336.8px",
    backgroundColor: "white",
    border: isActive ? "5px solid" : "",
    borderColor: theme.palette.primary.main,
    cursor: "pointer",

    ...(thumbnail && {
      backgroundImage: `url(${thumbnail})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
    }),
  })
);

export default PagesPanel;

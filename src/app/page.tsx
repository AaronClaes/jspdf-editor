"use client";
import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("../features/KonvaCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KonvaCanvas />
      </Box>
    </main>
  );
}

"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("../features/KonvaCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Box p={4} justifyContent="center" display="flex" gap={4}>
        <KonvaCanvas />
      </Box>
    </main>
  );
}

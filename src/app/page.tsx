"use client";
import CodePanel from "@/features/CodePanel";
import { useAppStore } from "@/stores/appStore";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("../features/KonvaCanvas"), {
  ssr: false,
});

export default function Home() {
  const showCode = useAppStore((state) => state.showCode);
  return (
    <main>
      <Box p={4} justifyContent="center" display="flex" gap={4}>
        <KonvaCanvas />
        {showCode && <CodePanel />}
      </Box>
    </main>
  );
}

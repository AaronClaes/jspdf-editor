import { Box, Container } from "@mui/material";
import { Layer, Rect, Stage } from "react-konva";

const KonvaCanvas = () => {
  return (
    <Stage style={{ backgroundColor: "white" }} className="konva-canvas" width={595} height={842}>
      <Layer>
        <Rect draggable width={50} height={50} fill="red" />
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

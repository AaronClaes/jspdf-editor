import { useAppStore } from "@/stores/appStore";
import { Layer, Stage } from "react-konva";
import Rectangle from "./components/Rectangle";
import Circle from "./components/Circle";
import Line from "./components/Line";
import Text from "./components/Text";
import Konva from "konva";
import usePage from "@/hooks/usePage";
import { useEffect, useRef } from "react";
import { useDebounce } from "usehooks-ts";
import useStage from "./hooks/useStage";

const KonvaCanvas = () => {
  const updatePage = useAppStore((state) => state.updatePage);

  const stageBinding = useStage();
  const { objects, currentPage } = usePage();
  const debounceObjects = useDebounce<typeof objects>(objects, 500);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (stageRef.current) {
      const thumbnail = stageRef.current.toDataURL();
      updatePage(currentPage, { thumbnail });
    }
  }, [debounceObjects, currentPage, updatePage]);

  return (
    <Stage
      ref={stageRef}
      {...stageBinding}
      style={{ backgroundColor: "white" }}
      className="konva-canvas"
      width={595}
      height={842}
    >
      <Layer>
        {Object.keys(objects).map((key) => {
          const object = objects[key];
          if (object.type === "rect") return <Rectangle key={object.id} shape={object} />;
          else if (object.type === "circle") return <Circle key={object.id} shape={object} />;
          else if (object.type === "line") return <Line key={object.id} shape={object} />;
          else if (object.type === "text") return <Text key={object.id} object={object} />;
        })}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

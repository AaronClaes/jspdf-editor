import { FC, useEffect, useRef } from "react";
import { TextType } from "@/types/objects";
import { Text as KonvaText, Rect } from "react-konva";
import { useAppStore } from "@/stores/appStore";
import Konva from "konva";
import useObject from "../hooks/useObject";
import { theme } from "@/features/ThemeRegistry/theme";

type TextProps = {
  object: TextType;
};

let interval: NodeJS.Timer | null;

const Text: FC<TextProps> = ({ object }) => {
  const objectBinds = useObject(object);
  const currentObject = useAppStore((state) => state.currentObject);
  const rectRef = useRef<Konva.Rect>(null);
  const textRef = useRef<Konva.Text>(null);

  const isActive = currentObject === object.id;

  useEffect(() => {
    const rect = rectRef.current;
    if (!isActive || !rect || !textRef.current) return;
    rect.strokeEnabled(true);

    const offset = 10;

    const position = textRef.current.getPosition();
    const width = textRef.current.getWidth();
    const height = textRef.current.getHeight();
    rect.setPosition({ x: position.x - offset / 2, y: position.y - offset / 2 });
    rect.width(width + offset);
    rect.height(height + offset);

    return () => void rect?.strokeEnabled(false);
  }, [object.value, object.fontSize, isActive]);

  return (
    <>
      <KonvaText
        fontSize={object.fontSize}
        ref={textRef}
        {...objectBinds}
        text={object.value}
        fill={object.color}
      />
      {isActive && (
        <Rect scaleX={1.1} stroke={theme.palette.primary.main} strokeWidth={2} ref={rectRef} />
      )}
    </>
  );
};

export default Text;

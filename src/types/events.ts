import { KonvaEventObject } from "konva/lib/Node";
import { ChangeEvent } from "react";

export type KonvaPointerEvent = KonvaEventObject<PointerEvent>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

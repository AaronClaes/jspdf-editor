import { hexToRgb } from "@/helpers/hexToRgb";
import { invertNumber } from "@/helpers/invertNumber";
import { CircleShapeType, LineShapeType, RectShapeType, TextType } from "@/types/objects";

export class PdfLibConverter {
  constructor() {}

  public createRect(object: RectShapeType): string {
    const { position, width, height, borderColor, borderWidth, fill } = object;

    const borderRgb = hexToRgb(borderColor);
    const fillRgb = hexToRgb(fill);

    const objectString = `page.drawRectangle({
  x: ${position.x},
  y: ${invertNumber(position.y)},
  width: ${width},
  height: ${invertNumber(height)},
  borderWidth: ${borderWidth},
  borderColor: rgb(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}),
  color: rgb(${fillRgb.r}, ${fillRgb.g}, ${fillRgb.b}),
});\n`;
    return "\n" + `// ${object.type}: ${object.name}\n` + objectString;
  }

  public createCircle(object: CircleShapeType): string {
    const { position, radius, fill, borderColor, borderWidth } = object;

    const borderRgb = hexToRgb(borderColor);
    const fillRgb = hexToRgb(fill);

    const objectString = `page.drawCircle({
  x: ${position.x},
  y: ${invertNumber(position.y)},
  size: ${radius},
  borderWidth: ${borderWidth},
  borderColor: rgb(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}),
  color: rgb(${fillRgb.r}, ${fillRgb.g}, ${fillRgb.b}),
});\n`;
    return "\n" + `// ${object.type}: ${object.name}\n` + objectString;
  }

  public createLine(object: LineShapeType): string {
    const { point1, point2, thickness, color } = object;

    const colorRgb = hexToRgb(color);

    const objectString = `page.drawLine({
  start: { x: ${point1.x}, y: ${invertNumber(point1.y)} },
  end: { x: ${point2.x}, y: ${invertNumber(point2.y)} },
  thickness: ${thickness},
  color: rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}),
});\n`;
    return "\n" + `// ${object.type}: ${object.name}\n` + objectString;
  }

  public createText(object: TextType): string {
    const { position, fontSize, color, value } = object;
    // Enters in a text area create a new line, this will visualize the new lines
    const valueWithNewLines = value.replace(/[\r\n]/g, "\\n");

    const colorRgb = hexToRgb(color);

    const objectString = `page.drawText("${valueWithNewLines}",
{
  x: ${position.x},
  y: ${invertNumber(position.y) - fontSize * 0.8},
  size: ${fontSize},
  color: rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}),
  lineHeight: ${fontSize}
})\n`;
    return "\n" + `// ${object.type}: ${object.name}\n` + objectString;
  }
}

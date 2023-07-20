import { RectShapeType } from "@/types/objects";

export class jsPDFConverter {
  constructor() {}

  public createRect(object: RectShapeType): string {
    const { position, width, height, borderColor, borderWidth, fill } = object;
    const fillString = `doc.setFillColor("${fill}");\n`;
    const borderString = `doc.setDrawColor("${borderColor}");\n`;
    const borderWidthString = `doc.setLineWidth("${borderWidth}");\n`;
    const objectString = `doc.rect(${position.x},${position.y},${width},${height}, "FD");\n`;
    return (
      "\n" +
      `// ${object.type}: ${object.name}\n` +
      fillString +
      borderString +
      borderWidthString +
      objectString
    );
  }
}

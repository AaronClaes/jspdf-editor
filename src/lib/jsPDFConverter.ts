import { RectShapeType, TextType } from "@/types/objects";

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

  public createText(object: TextType): string {
    const { position, fontSize, color, value } = object;

    // Enters in a text area create a new line, this will visualize the new lines
    const valueWithNewLines = value.replace(/[\r\n]/g, "\\n");

    const fillString = `doc.setTextColor("${color}");\n`;
    const fontSizeString = `doc.setFontSize(${fontSize});\n`;
    const objectString = `doc.text("${valueWithNewLines}",${position.x},${position.y},{}, "FD");\n`;
    return (
      "\n" + `// ${object.type}: ${object.name}\n` + fillString + fontSizeString + objectString
    );
  }
}

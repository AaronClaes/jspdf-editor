export class jsPDFConverter {
  constructor() {}

  public createRect(x: number, y: number, width: number, height: number): string {
    return `doc.rect(${x},${y},${width},${height});\n`;
  }
}

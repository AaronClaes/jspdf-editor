"use client";
import { Button, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsPDF as jsPDFClass } from "jspdf";
import { useAppStore } from "@/stores/appStore";
import { useMemo } from "react";
import { jsPDFConverter } from "@/lib/jsPDFConverter";

const converter = new jsPDFConverter();

const Code = () => {
  const shapes = useAppStore((state) => state.objects.shapes);

  const rectString = useMemo(() => {
    let string = "";
    for (const key in shapes.rect) {
      const rect = shapes.rect[key];
      const rectString = converter.createRect(rect.x, rect.y, rect.width, rect.height);
      string += rectString;
    }
    return string;
  }, [shapes]);

  const fullCode =
    `const doc = new jsPDF({
    unit: "pt",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
});\n` +
    rectString +
    `\ndoc.save("a4.pdf");`;
  return (
    <>
      <SyntaxHighlighter language="js" style={prism}>
        {fullCode}
      </SyntaxHighlighter>
      <Button onClick={() => test(fullCode)}>Test</Button>
    </>
  );
};

const test = (code: string) => {
  const jsPDF = jsPDFClass;
  eval(code);
  //   const doc = new jsPDF({
  //     unit: "pt",
  //     format: "a4",
  //     putOnlyUsedFonts: true,
  //     floatPrecision: 16,
  //   });

  //   doc.setFillColor(255, 0, 0);
  //   doc.rect(14.21875, 131.984375, 562.6328125, 52.98828125, "F");
  //   doc.save("a4.pdf");
};

export default Code;

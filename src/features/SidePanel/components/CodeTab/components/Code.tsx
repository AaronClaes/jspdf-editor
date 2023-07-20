"use client";
import { Button, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsPDF as jsPDFClass } from "jspdf";
import { useAppStore } from "@/stores/appStore";
import { useMemo } from "react";
import { jsPDFConverter } from "@/lib/jsPDFConverter";

const converter = new jsPDFConverter();

const Code = () => {
  const objects = useAppStore((state) => state.objects);

  const rectString = useMemo(() => {
    let string = "";
    for (const key in objects) {
      const object = objects[key];
      if (object.type === "rect") {
        const newRectString = converter.createRect(object);
        string += newRectString;
      }
    }
    return string;
  }, [objects]);

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
      <SyntaxHighlighter language="js" style={vscDarkPlus}>
        {fullCode}
      </SyntaxHighlighter>
      <Button onClick={() => test(fullCode)}>Test</Button>
    </>
  );
};

const test = (code: string) => {
  const jsPDF = jsPDFClass;
  eval(code);
};

export default Code;

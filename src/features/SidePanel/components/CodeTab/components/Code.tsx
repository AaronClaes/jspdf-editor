"use client";
import { Alert, Button, ButtonGroup, Snackbar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsPDF as jsPDFClass } from "jspdf";
import { useAppStore } from "@/stores/appStore";
import { useMemo, useState } from "react";
import { jsPDFConverter } from "@/lib/jsPDFConverter";
import { useCopyToClipboard } from "usehooks-ts";
import { useSnackbar } from "notistack";
import usePage from "@/hooks/usePage";

const converter = new jsPDFConverter();

const Code = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { objects } = usePage();

  const [_, copy] = useCopyToClipboard();

  const objectsString = useMemo(() => {
    let string = "";
    for (const key in objects) {
      const object = objects[key];
      if (object.type === "rect") {
        const newRectString = converter.createRect(object);
        string += newRectString;
      } else if (object.type === "circle") {
        const newCircleString = converter.createCircle(object);
        string += newCircleString;
      } else if (object.type === "text") {
        const newTextString = converter.createText(object);
        string += newTextString;
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
    objectsString +
    `\ndoc.save("a4.pdf");`;

  const handleCopy = () => {
    copy(fullCode);
    enqueueSnackbar("Copied code to clipboard!", { variant: "success" });
  };

  return (
    <>
      <ButtonGroup sx={{ mb: 1 }} variant="outlined" fullWidth>
        <Button onClick={() => test(fullCode)}>Execture</Button>
        <Button onClick={handleCopy}>Copy</Button>
      </ButtonGroup>
      <SyntaxHighlighter language="js" style={vscDarkPlus}>
        {fullCode}
      </SyntaxHighlighter>
    </>
  );
};

const test = (code: string) => {
  const jsPDF = jsPDFClass;
  eval(code);
};

export default Code;

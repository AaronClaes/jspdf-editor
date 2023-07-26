"use client";
import { Button, ButtonGroup } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMemo } from "react";
import { PdfLibConverter } from "@/lib/PdfLibConverter";
import { useCopyToClipboard } from "usehooks-ts";
import { useSnackbar } from "notistack";
import usePage from "@/hooks/usePage";
import * as PDFLib from "pdf-lib";
import downloadjs from "downloadjs";

const converter = new PdfLibConverter();

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
      } else if (object.type === "line") {
        const newLineString = converter.createLine(object);
        string += newLineString;
      } else if (object.type === "text") {
        const newTextString = converter.createText(object);
        string += newTextString;
      }
    }
    return string;
  }, [objects]);

  const fullCode =
    `const pdfDoc = await pdfLib.PDFDocument.create();\nconst page = pdfDoc.addPage();\n` +
    objectsString +
    `\nconst pdfBytes = await pdfDoc.save();\ndownload(pdfBytes, "file.pdf", "application/pdf");`;

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

const test = async (code: string) => {
  const pdfLib = PDFLib;
  const download = downloadjs;
  const rgb = pdfLib.rgb;
  const PDFDocument = pdfLib.PDFDocument;

  eval("(async () => {" + code + "})()");
};

export default Code;

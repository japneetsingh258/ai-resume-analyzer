import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    console.log("Starting PDF conversion...");

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    console.log("PDF loaded");

    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas context not available");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    console.log("Page rendered");

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve({
            imageUrl: "",
            file: null,
            error: "Blob creation failed",
          });
          return;
        }

        const imageFile = new File([blob], "resume.png", {
          type: "image/png",
        });

        resolve({
          imageUrl: URL.createObjectURL(blob),
          file: imageFile,
        });
      }, "image/png");
    });

  } catch (err) {
    console.error("PDF CONVERSION ERROR:", err);

    return {
      imageUrl: "",
      file: null,
      error: String(err),
    };
  }
}
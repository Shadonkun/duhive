// viewer.js

const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get("file");
const container = document.getElementById("container");

if (!fileUrl) {
  container.innerHTML = "<p style='color:red'>No PDF URL provided.</p>";
  throw new Error("Missing PDF URL");
}

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.js';

async function fetchAndRenderPDF() {
  try {
    const response = await fetch(fileUrl, { mode: 'cors' });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    container.innerHTML = ""; // Clear loading text

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      container.appendChild(canvas);
    }
  } catch (err) {
    console.error("PDF rendering error:", err);
    container.innerHTML = `<p style='color:red'>Error loading PDF: ${err.message}</p>`;
  }
}

fetchAndRenderPDF();

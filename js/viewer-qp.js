const fileUrl = new URLSearchParams(window.location.search).get("file");
const container = document.getElementById("pdf-viewer");
let currentScale = 1.2;
let pdf = null;

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.js';

async function fetchAndRenderPDF() {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.href = URL.createObjectURL(blob);
}

    renderAllPages();
  } catch (err) {
    container.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}

async function renderAllPages() {
  container.innerHTML = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: currentScale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    container.appendChild(canvas);
  }

  document.getElementById("zoomDisplay").value = `${Math.round(currentScale * 100)}%`;
}

fetchAndRenderPDF();

let lastScrollTop = 0;
const docDescription = document.getElementById("docDescription");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) return;

  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && currentScroll > 80) {
    // Scrolling down
    header.classList.add("hidden");
    docDescription.classList.add("stuck");
  } else {
    // Scrolling up
    header.classList.remove("hidden");

    // Only remove 'stuck' class if scroll is at top
    if (currentScroll <= 0) {
      docDescription.classList.remove("stuck");
    }
  }

  lastScrollTop = currentScroll;
});

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title") || "Unknown Document";
const course = urlParams.get("course") || "Unknown Course";
const semester = urlParams.get("semester") || "N/A";

const descBox = document.getElementById("docDescription");

if (descBox) {
  descBox.innerHTML = `
    <h2>Previous Year Paper</h2>
    <p><strong>Semester:</strong> ${semester}</p>
  `;
}

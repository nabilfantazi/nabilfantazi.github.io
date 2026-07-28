const printPageButton = document.getElementById("printPage");
const saveAsImageButton = document.getElementById("saveAsImage");

const copyInput = document.getElementById("copyInput");
const copyFeedback = document.getElementById("copyFeedback");
/////////////////////////////////////
function parseJiraXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  const fields = {};
  const customFields = xmlDoc.querySelectorAll("customfield");

  customFields.forEach((field) => {
    const nameTag = field.querySelector("customfieldname");
    const valueTag = field.querySelector("customfieldvalue");

    const name = nameTag?.textContent?.trim();
    const value = valueTag?.textContent?.trim();

    fields[name] = value;
  });

  return fields;
}

printPageButton.addEventListener("click", () => {
  window.print();
});

// const captureElement = async (selector) => {
//   const element = document.querySelector(selector);
//   if (!element) {
//     console.warn(`Element not found: ${selector}`);
//     return null;
//   }

//   const rect = element.getBoundingClientRect();

//   const canvas = await html2canvas(document.body, {
//     x: rect.left + window.scrollX,
//     y: rect.top + window.scrollY,
//     width: rect.width,
//     height: rect.height,
//     scrollX: -window.scrollX,
//     scrollY: -window.scrollY,
//   });

//   return canvas.toDataURL("image/png");
// };

// window.addEventListener("load", async () => {
//   const img = await captureElement(".page");
//   if (img) {
//     console.log("Captured image URL:", img);
//   }
// });
function changeDpiDataUrl(base64Image, dpi) {
  const dataParts = base64Image.split(",");
  if (!dataParts[0].includes("image/jpeg")) return base64Image;

  let decodedString = atob(dataParts[1]);

  // Find the APP0 (JFIF) marker in the JPEG header (0xFF 0xE0)
  const app0Index = decodedString.indexOf(String.fromCharCode(0xff, 0xe0));

  if (app0Index > -1) {
    // Split the string and inject the new DPI units
    const before = decodedString.slice(0, app0Index + 11);

    const units = String.fromCharCode(1); // 1 = dots per inch
    const xDpi = String.fromCharCode(Math.floor(dpi / 256), dpi % 256);
    const yDpi = String.fromCharCode(Math.floor(dpi / 256), dpi % 256);

    const after = decodedString.slice(app0Index + 16);

    decodedString = before + units + xDpi + yDpi + after;
  }

  return dataParts[0] + "," + btoa(decodedString);
}
saveAsImageButton.addEventListener("click", () => {
  const exportAsJpeg = (element, filename, ppiScale = 1.5625, quality = 0.75) => {
    htmlToImage
      .toJpeg(element, { cacheBust: true, pixelRatio: ppiScale, quality })
      .then((dataUrl) => {
        const dataUrlWithDpi = changeDpiDataUrl(dataUrl, targetDpi);

        element.classList.add("page");
        element.classList.remove("pagetoimage");

        const link = document.createElement("a");
        link.href = dataUrlWithDpi;
        link.download = filename;
        link.click();
      })
      .catch((err) => console.error("Failed to capture element:", err));
  };

  const [ficheNode, factureNode] = document.querySelectorAll(".page");
  ficheNode.classList.add("pagetoimage");
  ficheNode.classList.remove("page");
  factureNode.classList.add("pagetoimage");
  factureNode.classList.remove("page");

  const ppiScale = 3.125;
  const jpegQuality = 0.75;
  const targetDpi = 300;

  exportAsJpeg(ficheNode, `Fiche d'intervention - ${document.title}.jpg`, ppiScale, jpegQuality);
  exportAsJpeg(factureNode, `Facture - ${document.title}.jpg`, ppiScale, jpegQuality);
});

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

const captureElement = async (selector) => {
  const element = document.querySelector(selector);
  const rect = element.getBoundingClientRect();

  const canvas = await html2canvas(document.body, {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
  });

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl;
};

captureElement("#myElement").then((img) => {
  console.log("Captured image URL:", img);
});

saveAsImageButton.addEventListener("click", () => {
  const exportAsJpeg = (element, filename, ppiScale = 1.5625, quality = 0.75) => {
    htmlToImage
      .toJpeg(element, { cacheBust: true, pixelRatio: ppiScale, quality })
      .then((dataUrl) => {
        element.classList.add("page");
        element.classList.remove("pagetoimage");
        const link = document.createElement("a");
        link.href = dataUrl;
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

  const ppiScale = 1.5625;
  const jpegQuality = 0.75;

  exportAsJpeg(ficheNode, `Fiche d'intervention - ${document.title}.jpg`, ppiScale, jpegQuality);
  exportAsJpeg(factureNode, `Facture - ${document.title}.jpg`, ppiScale, jpegQuality);
});

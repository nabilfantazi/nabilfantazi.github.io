const textarea = document.querySelector("#invoiceProductText");
console.log(textarea.scrollHeight);
textarea.style.height = `${textarea.scrollHeight}px`;

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

const dateRDV = document.getElementById("date");

// const prestataireInput = document.getElementById("prestataire");
// const prestataireAresseInput = document.getElementById("adresse");
// const prestataireTelInput = document.getElementById("tel");

const dossierInput = document.getElementById("dossier");
const sinistreInput = document.getElementById("sinistre");
const vitreInput = document.getElementById("vitre");

const nameInput = document.getElementById("name");
const clientAdresseInput = document.getElementById("clientAdresse");
const clientTelInput = document.getElementById("clientTel");
const marqueInput = document.getElementById("marque");
const immatInput = document.getElementById("immat");
const policeInput = document.getElementById("police");
const effectdateInput = document.getElementById("effectdate");
const effectdate2Input = document.getElementById("effectdate2");
const dateFactureInput = document.getElementById("dateFacture");

//facture
// const RCNInput = document.getElementById("RCN");
// const MFNInput = document.getElementById("MFN");
// const AINInput = document.getElementById("AIN");
// const adresseFactureInput = document.getElementById("adresseFacture");
// const HTInput = document.getElementById("HT");
// const TVAInput = document.getElementById("TVA");
// const TTCInput = document.getElementById("TTC");

const clientNameFactureInput = document.getElementById("clientNameFacture");
const invoiceNumberInput = document.getElementById("invoiceNumber");
const invoiceProductTextInput = document.getElementById("invoiceProductText");
const invoiceQInput = document.getElementById("invoiceQ");
const invoicePUInput = document.getElementById("invoicePU");
const invoiceMInput = document.getElementById("invoiceM");

window.addEventListener("message", (event) => {
  const data = event.data;

  dateRDV.value = data.date;
  // prestataireInput.value = data.prestataire;
  // prestataireAresseInput.value = data.prestataireAdresse;
  // prestataireTelInput.value = data.prestataireTel;
  dossierInput.value = data.dossier;
  sinistreInput.value = data.sinistre;
  vitreInput.value = data.vitre;

  nameInput.value = data.clientName;
  clientAdresseInput.value = data.clientAdresse;
  clientTelInput.value = data.clientTel;
  marqueInput.value = data.marque;
  immatInput.value = data.immat;
  policeInput.value = data.police;
  effectdateInput.value = data.effectdate;
  effectdate2Input.value = data.effectdate2;
  dateFactureInput.value = data.dateFacture;

  clientAdresseInput.value = data.name;
  invoiceNumberInput.value = data.invoiceNumber;
  invoiceProductTextInput.value = data.invoiceProductText;

  invoiceQInput.value = data.invoiceQ;
  invoicePUInput.value = data.invoicePU;
  invoiceMInput.value = data.invoiceM;
});

const SOURCEURL = "https://portail.alloassistance.dz";

// const textarea = document.querySelector("#invoiceProductText");
// console.log(textarea.scrollHeight);
// textarea.style.height = `${textarea.scrollHeight}px`;

// textarea.addEventListener("input", () => {
//   textarea.style.height = "auto";
//   textarea.style.height = `${textarea.scrollHeight}px`;
// });

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

/////////////////////////////////////////////////////////////////
// const clientNameFactureInput = document.getElementById("clientNameFacture");
// const invoiceNumberInput = document.getElementById("invoiceNumber");
// const invoiceProductTextInput = document.getElementById("invoiceProductText");
// const invoiceQInput = document.getElementById("invoiceQ");
// /////////////////////////////////////////////////////
// const invoicePUInput = document.getElementById("invoicePU");
// const invoiceMInput = document.getElementById("invoiceM");
// const htInput = document.getElementById("HT");
// const ttcInput = document.getElementById("TTC");

// function recalctulateMontant() {
//   invoiceMInput.value =
//     ttcInput.value =
//     htInput.value =
//       invoiceQInput.value * invoicePUInput.value;
// }
// invoicePUInput.addEventListener("input", recalctulateMontant);
// invoiceQInput.addEventListener("input", recalctulateMontant);

window.addEventListener(
  "message",
  (event) => {
    const data = event.data;
    document.title = `${data.lastname} ${data.firstname}`;
    dateRDV.value = data.dateRDV;
    // prestataireInput.value = data.prestataire;
    // prestataireAresseInput.value = data.prestataireAdresse;
    // prestataireTelInput.value = data.prestataireTel;
    dossierInput.value = data.dossier;
    sinistreInput.value = data.sinis;
    vitreInput.value = data.vitre;
    //////////////////// fiche /////////////////////////
    nameInput.value = `${data.lastname} ${data.firstname}`;
    clientAdresseInput.value = data.clientAddress;
    clientTelInput.value = data.phone; //
    marqueInput.value = data.brand; //
    immatInput.value = data.license; //
    policeInput.value = data.police; //
    effectdateInput.value = data.date1; //
    effectdate2Input.value = data.date2; //
    //////////////////// invoice /////////////////////////
    // dateFactureInput.value = data.dateRDV;
    // clientNameFactureInput.value = `${data.lastname} ${data.firstname}`;
    // invoiceNumberInput.value = "1/C/2025";
    // invoiceProductTextInput.value = `Montage ${data.vitre} ${data.brand} (ADAP)\nIMM: ${data.license}`;

    // invoicePUInput.value = data.invoicePU;
    // recalctulateMontant();

    window.print();
  },
  { once: true }
);

window.addEventListener("load", (event) => {
  window.opener.postMessage("ready!", SOURCEURL);
});

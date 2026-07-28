const SOURCEURL = "https://portail.alloassistance.dz";
// const SOURCEURL = "http://192.168.1.5:5502";

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

/////////////////////facture//////////////////////////////////////////
const clientNameFactureInput = document.getElementById("clientNameFacture");
const invoiceNumberInput = document.getElementById("invoiceNumber");
const invoiceProductTextInput = document.getElementById("invoiceProductText");
const invoiceQInput = document.getElementById("invoiceQ");
/////////////////////////////////////////////////////
const invoicePUInput = document.getElementById("invoicePU");
const invoiceMInput = document.getElementById("invoiceM");
const htInput = document.getElementById("HT");
const tvaInput = document.getElementById("TVA");
const ttcInput = document.getElementById("TTC");
const numDossier = document.getElementById("dossierFacture");
const vehichule = document.getElementById("modelFacture");
const immatriculation = document.getElementById("ImmatriculationFacture");
const toLetters = document.getElementById("toletters");
//
function recalctulateMontant() {
  invoiceMInput.value = ttcInput.value = htInput.value = invoicePUInput.value;
}

invoicePUInput.addEventListener("input", recalctulateMontant);
invoiceQInput.addEventListener("input", recalctulateMontant);

const resizeTextArea = () => {
  invoiceProductTextInput.style.height = "auto"; // Reset height to recalculate
  invoiceProductTextInput.style.height =
    invoiceProductTextInput.scrollHeight + "px"; // Set height to fit content
};

function formatDZD(number) {
  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(number);
}

function NumberToLetter(nombre, U = null, D = null) {
  var letter = {
    0: "zéro",
    1: "un",
    2: "deux",
    3: "trois",
    4: "quatre",
    5: "cinq",
    6: "six",
    7: "sept",
    8: "huit",
    9: "neuf",
    10: "dix",
    11: "onze",
    12: "douze",
    13: "treize",
    14: "quatorze",
    15: "quinze",
    16: "seize",
    17: "dix-sept",
    18: "dix-huit",
    19: "dix-neuf",
    20: "vingt",
    30: "trente",
    40: "quarante",
    50: "cinquante",
    60: "soixante",
    70: "soixante-dix",
    80: "quatre-vingt",
    90: "quatre-vingt-dix",
  };

  var i, j, n, quotient, reste, nb;
  var ch;
  var numberToLetter = "";
  //__________________________________

  if (nombre.toString().replace(/ /gi, "").length > 15)
    return "dépassement de capacité";
  if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

  nb = parseFloat(nombre.toString().replace(/ /gi, ""));
  //if (Math.ceil(nb) != nb) return "Nombre avec virgule non géré.";
  if (Math.ceil(nb) != nb) {
    nb = nombre.toString().split(".");
    //return NumberToLetter(nb[0]) + " virgule " + NumberToLetter(nb[1]);
    return (
      NumberToLetter(nb[0]) +
      (U ? " " + U + " et " : " virgule ") +
      NumberToLetter(nb[1]) +
      (D ? " " + D : "")
    );
  }

  n = nb.toString().length;
  switch (n) {
    case 1:
      numberToLetter = letter[nb];
      break;
    case 2:
      if (nb > 19) {
        quotient = Math.floor(nb / 10);
        reste = nb % 10;
        if (nb < 71 || (nb > 79 && nb < 91)) {
          if (reste == 0) numberToLetter = letter[quotient * 10];
          if (reste == 1)
            numberToLetter = letter[quotient * 10] + "-et-" + letter[reste];
          if (reste > 1)
            numberToLetter = letter[quotient * 10] + "-" + letter[reste];
        } else
          numberToLetter =
            letter[(quotient - 1) * 10] + "-" + letter[10 + reste];
      } else numberToLetter = letter[nb];
      break;
    case 3:
      quotient = Math.floor(nb / 100);
      reste = nb % 100;
      if (quotient == 1 && reste == 0) numberToLetter = "cent";
      if (quotient == 1 && reste != 0)
        numberToLetter = "cent" + " " + NumberToLetter(reste);
      if (quotient > 1 && reste == 0)
        numberToLetter = letter[quotient] + " cents";
      if (quotient > 1 && reste != 0)
        numberToLetter = letter[quotient] + " cent " + NumberToLetter(reste);
      break;
    case 4:
    case 5:
    case 6:
      quotient = Math.floor(nb / 1000);
      reste = nb - quotient * 1000;
      if (quotient == 1 && reste == 0) numberToLetter = "mille";
      if (quotient == 1 && reste != 0)
        numberToLetter = "mille" + " " + NumberToLetter(reste);
      if (quotient > 1 && reste == 0)
        numberToLetter = NumberToLetter(quotient) + " mille";
      if (quotient > 1 && reste != 0)
        numberToLetter =
          NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
      break;
    case 7:
    case 8:
    case 9:
      quotient = Math.floor(nb / 1000000);
      reste = nb % 1000000;
      if (quotient == 1 && reste == 0) numberToLetter = "un million";
      if (quotient == 1 && reste != 0)
        numberToLetter = "un million" + " " + NumberToLetter(reste);
      if (quotient > 1 && reste == 0)
        numberToLetter = NumberToLetter(quotient) + " millions";
      if (quotient > 1 && reste != 0)
        numberToLetter =
          NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
      break;
    case 10:
    case 11:
    case 12:
      quotient = Math.floor(nb / 1000000000);
      reste = nb - quotient * 1000000000;
      if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
      if (quotient == 1 && reste != 0)
        numberToLetter = "un milliard" + " " + NumberToLetter(reste);
      if (quotient > 1 && reste == 0)
        numberToLetter = NumberToLetter(quotient) + " milliards";
      if (quotient > 1 && reste != 0)
        numberToLetter =
          NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
      break;
    case 13:
    case 14:
    case 15:
      quotient = Math.floor(nb / 1000000000000);
      reste = nb - quotient * 1000000000000;
      if (quotient == 1 && reste == 0) numberToLetter = "un billion";
      if (quotient == 1 && reste != 0)
        numberToLetter = "un billion" + " " + NumberToLetter(reste);
      if (quotient > 1 && reste == 0)
        numberToLetter = NumberToLetter(quotient) + " billions";
      if (quotient > 1 && reste != 0)
        numberToLetter =
          NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
      break;
  } //fin switch
  /*respect de l'accord de quatre-vingt*/
  if (
    numberToLetter.substr(
      numberToLetter.length - "quatre-vingt".length,
      "quatre-vingt".length,
    ) == "quatre-vingt"
  )
    numberToLetter = numberToLetter + "s";

  return numberToLetter;
}

// Helper to parse dates and format them as dd/mm/yyyy
const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);

  // If the date is invalid, return the original string as a fallback
  if (isNaN(d.getTime())) return dateString;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

function fillInterventionForm(data) {
  // =========================================================
  // 1. GENERAL DATES
  // =========================================================
  // Note: These are set to today's date by default, but can be updated manually.
  
  if (document.getElementById("date")) {
    document.getElementById("date").value = data.dateRDV;
  }
  if (document.getElementById("dateClient")) {
    document.getElementById("dateClient").value = data.dateRDV;
  }

  // =========================================================
  // 2. MAPPED FIELDS (Populated directly from JSON data)
  // =========================================================
  
  // --- Accident & Dossier Details ---
  if (document.getElementById("fiche_dossier")) {
    document.getElementById("fiche_dossier").value = data.dossier || "";
  }
  if (document.getElementById("fiche_sinistre")) {
    document.getElementById("fiche_sinistre").value = data.sinis || "";
  }

  // --- Dynamic Checkboxes (Nature of Intervention) ---
  // Checks boxes based on exact text matches between the JSON array and HTML labels.
  if (data.nature && Array.isArray(data.vitre)) {
    const checklistLabels = document.querySelectorAll(".checklist-item");

    data.nature.forEach((natureItem) => {
      const itemToMatch = natureItem.trim().toUpperCase();

      checklistLabels.forEach((label) => {
        const labelText = label.textContent.trim().toUpperCase();

        // If the label text matches the data item, find and check the associated checkbox
        if (labelText === itemToMatch) {
          const checkbox = label.querySelector('input[type="checkbox"]');
          if (checkbox) {
            checkbox.checked = true;
          }
        }
      });
    });
  }

  // --- Client / Assuré Information ---
  if (document.getElementById("fiche_assure")) {
    // Fallbacks to fname + lname if full_name is missing
    document.getElementById("fiche_assure").value = `${data.lastname} ${data.firstname}`;
  }
  // --- Client Address & Phone ---
   if (document.getElementById("fiche_adresse")) {
    document.getElementById("fiche_adresse").value = data.clientAddress || "";
  }
  if (document.getElementById("fiche_telephone")) {
    // Strips out any non-numeric characters (e.g., dots, spaces)
    document.getElementById("fiche_telephone").value = (data.phone || "").replace(/[^\d/]/g, "").replace(/\//g, " / ");
  }

  // --- Vehicle Identification ---

  if (document.getElementById("fiche_marque_vehicule")) {
    document.getElementById("fiche_marque_vehicule").value = data.marque;
  }
  if (document.getElementById("fiche_modele_vehicule")) {
    document.getElementById("fiche_modele_vehicule").value = data.modele;
  }
  if (document.getElementById("fiche_immatriculation")) {
    document.getElementById("fiche_immatriculation").value = data.license || "";
  }

  // --- Insurance Policy Information ---
  if (document.getElementById("fiche_police")) {
    document.getElementById("fiche_police").value = data.police || "";
  }
  if (document.getElementById("fiche_date_effet")) {
    // Requires the 'formatDate' helper function to be present in the script
    document.getElementById("fiche_date_effet").value = formatDate(data.date1);
  }
  if (document.getElementById("fiche_date_echeance")) {
    document.getElementById("fiche_date_echeance").value = formatDate(data.date2);
  }

  // =========================================================
  // 3. UNMAPPED FIELDS (Placeholders)
  // =========================================================
  // These fields are not provided in the JSON and are filled with placeholder text.

  // --- Accident Context ---
  if (document.getElementById("fiche_date_accident")) {
    document.getElementById("fiche_date_accident").value = "";
  }
  if (document.getElementById("fiche_heure_accident")) {
    document.getElementById("fiche_heure_accident").value = "";
  }
  if (document.getElementById("fiche_lieu_accident")) {
    document.getElementById("fiche_lieu_accident").value = "";
  }
  if (document.getElementById("fiche_ville_accident")) {
    document.getElementById("fiche_ville_accident").value = "";
  }
  
  // --- Miscellaneous ---
  if (document.getElementById("fiche_marque_produit")) {
    document.getElementById("fiche_marque_produit").value = "";
  }
 
  if (document.getElementById("fiche_chassis")) {
    document.getElementById("fiche_chassis").value = "";
  }
}
window.addEventListener(
  "message",
  (event) => {
    const data = event.data;
    if (!data || typeof data !== "object" || !data.lastname) return;
    console.log(data);
    document.title = `${data.lastname} ${data.firstname}`;
 fillInterventionForm(data);
    //////////////////// invoice /////////////////////////
    dateFactureInput.value = data.dateRDV;
    clientNameFactureInput.value = `${data.lastname} ${data.firstname}`;
    numDossier.value = data.dossier;
    vehichule.value = data.brand;
    immatriculation.value = data.license;

    invoiceNumberInput.value = `${data.number}/${data.assurance.charAt(
      0,
    )}/${new Date().getFullYear()}`;

    invoiceProductTextInput.value = `Montage ${data.vitre} ${data.brand} (${data.product})`;
    resizeTextArea();

    invoicePUInput.value = formatDZD(data.invoicePU);
    recalctulateMontant();
    toLetters.value = NumberToLetter(data.invoicePU) + " dinars algérien";
    window.print();
  },
  { once: true },
);

invoiceProductTextInput.addEventListener("input", resizeTextArea);

window.addEventListener("load", () => {
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage("ready!", SOURCEURL);
    console.log("ready sent!");
  } else {
    console.log("No opener window; skipping ready message.");
  }
});


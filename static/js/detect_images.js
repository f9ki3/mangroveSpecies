let species_list = [
  {
    name: "acanthus ilicifolius",
    description:
      "Acanthus ilicifolius, commonly known as holly-leaved acanthus, sea holly, and holy mangrove, is a species of shrubs or herbs, of the plant family Acanthaceae, native to Australia, Australasia, and Southeast Asia. It is used as medicine in asthma and rheumatism.",
    googleSearch: "https://www.google.com/search?q=Acanthus+ilicifolius",
  },
  {
    name: "aegiceras corniculatum",
    description:
      "Aegiceras corniculatum or River Mangrove is a short tree or shrub that grows to 6 m tall. It has elliptic to spoon-shaped leaves, pointed white flower buds which bloom into fragrant, 5-petalled, tubular flowers. The fruit is a crescent-shaped, single-seeded capsule which resembles a chili.",
    googleSearch:
      "https://www.google.com/search?q=Aegiceras+corniculatum+%28Saging-Saging%29",
  },
  {
    name: "avicennia alba",
    description:
      "Avicennia alba is a species of tropical mangrove in the family Acanthaceae. It is found growing in coastal and estuarine locations in India, Southeast Asia, Australia, and Oceania. Avicennia alba. Conservation status. Least Concern (IUCN 3.1)",
    googleSearch:
      "https://www.google.com/search?q=Avicennia+alba+%28Api-api%29",
  },
  {
    name: "avicennia marina",
    description:
      "Avicennia marina is a historic plant, well known for many centuries in traditional and folk medicine. - The genus name Avicennia honors the famous physician Avicenna or Ibn Sina. - Native to the Philippines.",
    googleSearch:
      "https://www.google.com/search?q=Avicennia+marina+%28Api-api%29",
  },
  {
    name: "avicennia officinalis",
    description:
      "Avicennia officinalis is a species of mangrove also known as Indian mangrove. The genus Avicennia is named after the famous Persian scientist Ibn Sina. Avicennia officinalis. Indian mangrove. Conservation status.",
    googleSearch:
      "https://www.google.com/search?q=Avicennia+officinalis+%28Bungalon%29",
  },
  {
    name: "avicennia rumphiana",
    description:
      "Medium-sized to big tree, reaching up to 30 m tall. Dark grey and smooth bark, not buttressed but cylindrical, straight trunk when growing in a closed stand. Pencil-like pneumatophores emerge above ground from long shallow underground roots.",
    googleSearch:
      "https://www.google.com/search?q=Avicennia+rumphiana+%28Api-api%29",
  },
  {
    name: "bruguiera cylindrica",
    description:
      "Bruguiera cylindrica is a small tree growing up to 20 metres (66 ft) tall but often grows as a bush. The bark is smooth and grey, with corky raised patches containing lenticels which are used in gas exchange and the trunk is buttressed by roots.",
    googleSearch:
      "https://www.google.com/search?q=Bruguiera+cylindrica+%28Pototan%29",
  },
  {
    name: "bruguiera sexangula",
    description:
      "Bruguiera sexangula may grow as a single-stemmed tree or multi-stemmed shrub. It has short buttresses at the base of the trunk, and knee-like air-breathing roots, or pneumatophores. The bark is a smooth grey-brown colour.",
    googleSearch: "https://www.google.com/search?q=Bruguiera+sexangula",
  },
  {
    name: "camptostemon philippinense",
    description:
      "Camptostemon philippinensis, found in mangrove forests in Indonesia and the Philippines, is listed as endangered on the International Union for Conservation of Nature (IUCN) Red List. It is found primarily in isolated mangrove forests in Kalimantan (Indonesian Borneo) and Sulawesi in Indonesia.",
    googleSearch:
      "https://www.google.com/search?q=Camptostemon+philippinense+%28Gapas-gapas%29",
  },
  {
    name: "ceriops decandra",
    description:
      "Ceriops decandra is a mangrove plant of tropical Asia in the family Rhizophoraceae. The specific epithet decandra is from the Greek meaning 'ten male', referring to the flower having ten stamens. Ceriops decandra. Flowers. Conservation status.",
    googleSearch:
      "https://www.google.com/search?q=Ceriops+decandra+%28Baras-baras%29",
  },
  {
    name: "ceriops tagal",
    description:
      "Ceriops tagal, commonly known as spurred mangrove or Indian mangrove, is a mangrove tree species in the family Rhizophoraceae. It is a protected tree in South Africa. The specific epithet tagal is a plant name from the Tagalog language.",
    googleSearch:
      "https://www.google.com/search?q=Ceriops+tagal+%28Tangal%2C+Tongog%29",
  },
  {
    name: "excoecaria agallocha",
    description:
      "Excoecaria agallocha, a mangrove species, belongs to the genus Excoecaria of the family Euphorbiaceae. The species has many common names, including blind-your-eye mangrove, blinding tree, buta buta tree, milky mangrove, poisonfish tree, and river poison tree.",
    googleSearch:
      "https://www.google.com/search?q=Excoecaria+agallocha+%28Alipata%29",
  },
  {
    name: "heritiera littoralis",
    description:
      "The flowers have a fused perianth tube with usually 5 teeth and are bell-shaped (hence the common name Tulip oak). They are greenish-pink or dull purple, around 6 mm (0.24 in) wide and long. The fruit is a flattened, ellipsoid, indehiscent, brown woody pod which is derived from the carpel, and contains a single seed.",
    googleSearch:
      "https://www.google.com/search?q=Heritiera+littoralis+%28Dungon%29",
  },
  {
    name: "lumnitzera racemosa",
    description:
      "Lumnitzera racemosa, commonly known as the white-flowered black mangrove, is a species of mangrove in the family Combretaceae. It is found on the eastern coast of Africa and other places in the western Indo-Pacific region.",
    googleSearch: "https://www.google.com/search?q=Lumnitzera+racemosa",
  },
  {
    name: "nypa fruticans",
    description:
      "Juice from young shoots is used to treat herpes and the ash of the burned plant is used to treat toothache and headache. Others: Sap also used to fatten up pigs in parts of Indonesia during dry season when fodder is scarce. Sugar-rich sap can also be distilled into industrial ethanol and biofuel.",
    googleSearch: "https://www.google.com/search?q=Nypa+fructicans+%28Nipa%29",
  },
  {
    name: "rhizophora apiculata",
    description:
      "The tall-stilt mangrove (Rhizophora apiculata) belongs to the Plantae kingdom under the Rhizophoraceae family. R. apiculata is distributed throughout Southeast Asia and the western Pacific islands. Tall-stilt mangrove. Flower.",
    googleSearch:
      "https://www.google.com/search?q=Rhizophora+apiculata+%28Bakauan+lalaki%29",
  },
  {
    name: "rhizophora mucronata",
    description:
      "Rhizophora mucronata (loop-root mangrove, red mangrove or Asiatic mangrove) is a species of mangrove found on coasts and river banks in East Africa and the Indo-Pacific region.",
    googleSearch:
      "https://www.google.com/search?q=Rhizophora+mucronata+%28Bakauan+babae%29",
  },
  {
    name: "rhizophora stylosa",
    description:
      "Rhizophora stylosa, the spotted mangrove, red mangrove, small stilted mangrove or stilt-root mangrove, is a small to medium-sized evergreen tree in the family Rhizophoraceae. The specific epithet stylosa is from the Latin meaning 'stylus form', referring to the flower.",
    googleSearch:
      "https://www.google.com/search?q=Rhizophora+stylosa+%28Bakauan%29",
  },
  {
    name: "sonneratia alba",
    description:
      "Sonneratia alba is a mangrove tree in the family Lythraceae. The specific epithet alba is from the Latin meaning 'white', referring to the flowers.",
    googleSearch:
      "https://www.google.com/search?q=Sonneratia+alba+%28Pagatpat%29",
  },
  {
    name: "xylocarpus granatum",
    description:
      "Xylocarpus granatum, commonly known as the cannonball mangrove, cedar mangrove, or puzzlenut tree, is a species of mangrove in the mahogany family (Meliaceae). It is found in Africa, Asia, Australasia and the Pacific Islands.",
    googleSearch:
      "https://www.google.com/search?q=Xylocarpus+granatum+%28Tabigi%29",
  },
  {
    name: "xylocarpus mekongensis",
    description:
      "Xylocarpus mekongensis is the most valuable timber species of the Sundarbans mangrove forest of Bangladesh and found to grow well in moderate saline areas. This species occurs in association with Heritiera fomes, Avicennia ofﬁcinalis, or Bruguiera gymnorrhiza (Mahmood, 2015).",
    googleSearch: "https://www.google.com/search?q=Xylocarpus+mekongensis",
  },
  {
    name: "xylocarpus moluccensis",
    description:
      "Xylocarpus moluccensis is a tree in the family Meliaceae. It is named for the Moluccas archipelago (now Maluku Islands). Xylocarpus moluccensis. Young tree with fruit and flower buds. Conservation status.",
    googleSearch: "https://www.google.com/search?q=xylocarpus+moluccensis",
  },
  {
    name: "dolichandrone spathacea",
    description:
      "Dolichandrone spathacea, also known as tui or mangrove trumpet tree (Thai: แคทะเล or แคป่า, khae thale or khae pa; Tagalog: tui, tue or tuy), is a species of plant in the family Bignoniaceae. It is found from South India, Sri Lanka to New Caledonia.",
    googleSearch: "https://www.google.com/search?q=dolichandrone+spathacea",
  },
];

document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onload = function (e) {
        // Display the image preview and hide the icon
        const previewContainer = document.getElementById("image-preview");
        const previewImg = document.getElementById("preview-img");
        const previewIcon = document.getElementById("preview-icon");
        const loadingSpinner = document.getElementById("loading-spinner");

        previewIcon.style.display = "none"; // Hide the icon
        previewImg.src = e.target.result; // Set the image source
        previewImg.style.display = "block"; // Show the image

        // Show loading spinner before prediction
        loadingSpinner.classList.remove("d-none");

        // Load image into model prediction
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          predict(img);
        };
      };
      reader.readAsDataURL(file); // Convert the file to a Data URL
    }
  });

const URL = "/static/mangrove_model/";
let model, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
}
async function predict(imageElement) {
  const prediction = await model.predict(imageElement);
  const bestPrediction = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );

  const labelContainer = document.getElementById("label-container");
  const statusLabel = document.getElementById("status-label");
  const loadingSpinner = document.getElementById("loading-spinner");
  const saveChangesBtn = document.querySelector(".modal-footer .btn-primary");

  const speciesInfo = document.getElementById("species-info");
  const speciesDescription = document.getElementById("species-description");
  const speciesLink = document.getElementById("species-link");

  loadingSpinner.classList.add("d-none");

  if (bestPrediction.probability < 0.99) {
    // Changed from 0.97 to 0.90
    statusLabel.innerText = "Not Detected";
    statusLabel.style.backgroundColor = "rgb(239, 189, 189)";
    statusLabel.style.color = "red";
    statusLabel.style.border = "2px solid red";

    labelContainer.style.display = "none";
    saveChangesBtn.disabled = true;
    speciesInfo.classList.add("d-none"); // Hide species info
  } else {
    const detectedSpecies = bestPrediction.className;
    const speciesFound = species_list.find(
      (species) => species.name === detectedSpecies
    );

    if (speciesFound) {
      statusLabel.innerText = "Detected";
      statusLabel.style.backgroundColor = "rgb(189, 239, 189)";
      statusLabel.style.color = "green";
      statusLabel.style.border = "2px solid green";

      labelContainer.innerHTML = `
        ${detectedSpecies}: ${(bestPrediction.probability * 100).toFixed(
        2
      )}%<br>
      `;
      labelContainer.style.display = "block";

      // Update species info section
      speciesDescription.innerText =
        speciesFound.description || "No description available.";
      speciesLink.href = speciesFound.googleSearch;

      speciesInfo.classList.remove("d-none"); // Show species info

      saveChangesBtn.disabled = false;
    } else {
      statusLabel.innerText = "Species Not in List";
      statusLabel.style.backgroundColor = "rgb(255, 215, 100)";
      statusLabel.style.color = "orange";
      statusLabel.style.border = "2px solid orange";

      labelContainer.innerHTML = `Detected: ${detectedSpecies}, but not in the species list.`;
      labelContainer.style.display = "block";

      saveChangesBtn.disabled = true;
      speciesInfo.classList.add("d-none"); // Hide species info
    }
  }
}

init();

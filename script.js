const geneDefs = [
  { id: "extension", label: "Extension", locus: ["E", "e"] },
  { id: "agouti", label: "Agouti", locus: ["A", "a"] },
  { id: "cream", label: "Cream", locus: ["Cr", "N"] },
  { id: "dun", label: "Dun", locus: ["D", "d"] },
  { id: "gray", label: "Gray", locus: ["G", "g"] },
  { id: "roan", label: "Roan", locus: ["R", "n"] },
  { id: "leopard complex", label: "leopard complex", locus: ["Lp", "n"] },
  { id: "tobino", label: "tobino", locus: ["To", "n"] }
];

const resultEl = document.getElementById("result");
const herdEl = document.getElementById("herd");
const breedButton = document.getElementById("breed-button");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");

let currentFoal = null;

function parseGenotype(value, geneId) {
  if (geneId === "cream") {
    if (value === "CrCr") return ["Cr", "Cr"];
    if (value === "CrN") return ["Cr", "N"];
    return ["N", "N"];
  }
  return value.split("");
}

function canonicalGene(geneId, alleles) {
  const orderMap = {
    extension: ["E", "e"],
    agouti: ["A", "a"],
    cream: ["Cr", "N"],
    dun: ["D", "d"],
    gray: ["G", "g"]
  };
  const order = orderMap[geneId];
  return [...alleles].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

function readHorse(prefix) {
  const horse = {
    name: document.getElementById(`${prefix}-name`).value.trim() || (prefix === "mare" ? "Unnamed Mare" : "Unnamed Stallion")
  };

  geneDefs.forEach((gene) => {
    const value = document.getElementById(`${prefix}-${gene.id}`).value;
    horse[gene.id] = parseGenotype(value, gene.id);
  });

  return horse;
}

function pickAllele(pair) {
  return pair[Math.floor(Math.random() * pair.length)];
}

function geneString(geneId, alleles) {
  const sorted = canonicalGene(geneId, alleles);
  return sorted.join("");
}

function hasAllele(alleles, allele) {
  return alleles.includes(allele);
}

function countAllele(alleles, allele) {
  return alleles.filter((a) => a === allele).length;
}

function calculatePhenotype(genes) {
  const ext = genes.extension;
  const agouti = genes.agouti;
  const cream = genes.cream;
  const dun = genes.dun;
  const gray = genes.gray;

  const isGray = hasAllele(gray, "G");
  const isChestnut = countAllele(ext, "e") === 2;
  const hasAgouti = hasAllele(agouti, "A");
  const creamCount = countAllele(cream, "Cr");
  const isDun = hasAllele(dun, "D");

  let base;
  if (isChestnut) {
    base = "Chestnut";
  } else if (hasAgouti) {
    base = "Bay";
  } else {
    base = "Black";
  }

  let color = base;

  if (creamCount === 1) {
    if (base === "Chestnut") color = "Palomino";
    else if (base === "Bay") color = "Buckskin";
    else color = "Smoky Black";
  } else if (creamCount === 2) {
    if (base === "Chestnut") color = "Cremello";
    else if (base === "Bay") color = "Perlino";
    else color = "Smoky Cream";
  }

  if (isDun) {
    if (color === "Chestnut") color = "Red Dun";
    else if (color === "Bay") color = "Bay Dun";
    else if (color === "Black") color = "Grullo";
    else color = `${color} Dun`;
  }

  if (isGray) {
    color = `Gray (${color} base)`;
  }

  return color;
}

function breed(mare, stallion) {
  const foalGenes = {};
  geneDefs.forEach((gene) => {
    foalGenes[gene.id] = canonicalGene(gene.id, [
      pickAllele(mare[gene.id]),
      pickAllele(stallion[gene.id])
    ]);
  });

  return {
    id: crypto.randomUUID(),
    name: `Foal ${Math.floor(Math.random() * 9000) + 1000}`,
    genes: foalGenes,
    phenotype: calculatePhenotype(foalGenes)
  };
}

function genotypeSummary(genes) {
  return geneDefs
    .map((gene) => `${gene.label}: ${geneString(gene.id, genes[gene.id])}`)
    .join(" • ");
}

function renderCurrentFoal() {
  if (!currentFoal) {
    resultEl.innerHTML = "<p>Pick two horses and click <strong>Breed Horses</strong>.</p>";
    return;
  }

  resultEl.innerHTML = `
    <h3>${currentFoal.name}</h3>
    <p><strong>Phenotype:</strong> ${currentFoal.phenotype}</p>
    <p class="small"><strong>Genotype:</strong> ${genotypeSummary(currentFoal.genes)}</p>
  `;
}

function getHerd() {
  try {
    return JSON.parse(localStorage.getItem("genebound-herd")) || [];
  } catch {
    return [];
  }
}

function setHerd(herd) {
  localStorage.setItem("genebound-herd", JSON.stringify(herd));
}

function renderHerd() {
  const herd = getHerd();

  if (herd.length === 0) {
    herdEl.innerHTML = '<p class="muted">No saved horses yet.</p>';
    return;
  }

  herdEl.innerHTML = herd.map((horse) => `
    <article class="herd-item">
      <h3>${horse.name}</h3>
      <p><strong>Phenotype:</strong> ${horse.phenotype}</p>
      <p class="small"><strong>Genotype:</strong> ${genotypeSummary(horse.genes)}</p>
    </article>
  `).join("");
}

breedButton.addEventListener("click", () => {
  const mare = readHorse("mare");
  const stallion = readHorse("stallion");
  currentFoal = breed(mare, stallion);
  renderCurrentFoal();
});

saveButton.addEventListener("click", () => {
  if (!currentFoal) {
    alert("Breed a foal first.");
    return;
  }

  const herd = getHerd();
  herd.unshift(currentFoal);
  setHerd(herd);
  renderHerd();
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem("genebound-herd");
  renderHerd();
});

renderCurrentFoal();
renderHerd();

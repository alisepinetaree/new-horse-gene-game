
const geneDefs=[
{id:"extension",label:"Extension",options:[{value:"EE",alleles:["E","E"]},{value:"Ee",alleles:["E","e"]},{value:"ee",alleles:["e","e"]}],defaultMare:"Ee",defaultStallion:"ee",sortOrder:["E","e"]},
{id:"agouti",label:"Agouti",options:[{value:"AA",alleles:["A","A"]},{value:"Aa",alleles:["A","a"]},{value:"aa",alleles:["a","a"]}],defaultMare:"Aa",defaultStallion:"Aa",sortOrder:["A","a"]},
{id:"cream",label:"Cream",options:[{value:"NN",alleles:["N","N"]},{value:"CrN",alleles:["Cr","N"]},{value:"CrCr",alleles:["Cr","Cr"]}],defaultMare:"CrN",defaultStallion:"NN",sortOrder:["Cr","N"]},
{id:"dun",label:"Dun",options:[{value:"DD",alleles:["D","D"]},{value:"Dd",alleles:["D","d"]},{value:"dd",alleles:["d","d"]}],defaultMare:"dd",defaultStallion:"Dd",sortOrder:["D","d"]},
{id:"gray",label:"Gray",options:[{value:"GG",alleles:["G","G"]},{value:"Gg",alleles:["G","g"]},{value:"gg",alleles:["g","g"]}],defaultMare:"gg",defaultStallion:"gg",sortOrder:["G","g"]},
{id:"roan",label:"Roan",options:[{value:"RR",alleles:["R","R"]},{value:"Rn",alleles:["R","n"]},{value:"nn",alleles:["n","n"]}],defaultMare:"nn",defaultStallion:"nn",sortOrder:["R","n"]},
{id:"champagne",label:"Champagne",options:[{value:"ChCh",alleles:["Ch","Ch"]},{value:"ChN",alleles:["Ch","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["Ch","N"]},
{id:"silver",label:"Silver",options:[{value:"ZZ",alleles:["Z","Z"]},{value:"ZN",alleles:["Z","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["Z","N"]},
{id:"pearl",label:"Pearl",options:[{value:"PrlPrl",alleles:["Prl","Prl"]},{value:"PrlN",alleles:["Prl","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["Prl","N"]},
{id:"flaxen",label:"Flaxen",options:[{value:"ff",alleles:["f","f"]},{value:"Ff",alleles:["F","f"]},{value:"FF",alleles:["F","F"]}],defaultMare:"FF",defaultStallion:"FF",sortOrder:["F","f"]},
{id:"mushroom",label:"Mushroom",options:[{value:"MuMu",alleles:["Mu","Mu"]},{value:"MuN",alleles:["Mu","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["Mu","N"]},
{id:"tobiano",label:"Tobiano",options:[{value:"ToTo",alleles:["To","To"]},{value:"ToN",alleles:["To","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["To","N"]},
{id:"frame",label:"Frame Overo",options:[{value:"OO",alleles:["O","O"]},{value:"ON",alleles:["O","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["O","N"]},
{id:"splash",label:"Splash",options:[{value:"SWSW",alleles:["SW","SW"]},{value:"SWN",alleles:["SW","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["SW","N"]},
{id:"sabino",label:"Sabino-1",options:[{value:"SB1SB1",alleles:["SB1","SB1"]},{value:"SB1N",alleles:["SB1","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["SB1","N"]},
{id:"lp",label:"Leopard Complex",options:[{value:"LpLp",alleles:["Lp","Lp"]},{value:"LpN",alleles:["Lp","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["Lp","N"]},
{id:"patn1",label:"PATN1",options:[{value:"PATN1PATN1",alleles:["PATN1","PATN1"]},{value:"PATN1N",alleles:["PATN1","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["PATN1","N"]},
{id:"w20",label:"W20",options:[{value:"W20W20",alleles:["W20","W20"]},{value:"W20N",alleles:["W20","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["W20","N"]},
{id:"w5",label:"W5",options:[{value:"W5W5",alleles:["W5","W5"]},{value:"W5N",alleles:["W5","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["W5","N"]},
{id:"w10",label:"W10",options:[{value:"W10W10",alleles:["W10","W10"]},{value:"W10N",alleles:["W10","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["W10","N"]},
{id:"w22",label:"W22",options:[{value:"W22W22",alleles:["W22","W22"]},{value:"W22N",alleles:["W22","N"]},{value:"NN",alleles:["N","N"]}],defaultMare:"NN",defaultStallion:"NN",sortOrder:["W22","N"]}
];

const resultEl=document.getElementById("result");
const herdEl=document.getElementById("herd");
const mareGenesEl=document.getElementById("mare-genes");
const stallionGenesEl=document.getElementById("stallion-genes");
let currentFoal=null;

function buildGeneFields(prefix,container){
  container.innerHTML="";
  geneDefs.forEach(gene=>{
    const label=document.createElement("label");
    label.textContent=gene.label;
    const select=document.createElement("select");
    select.id=`${prefix}-${gene.id}`;
    gene.options.forEach(option=>{
      const opt=document.createElement("option");
      opt.value=option.value;
      opt.textContent=option.value;
      const dv=prefix==="mare"?gene.defaultMare:gene.defaultStallion;
      if(option.value===dv) opt.selected=true;
      select.appendChild(opt);
    });
    label.appendChild(select);
    container.appendChild(label);
  });
}

function getGeneDef(id){return geneDefs.find(g=>g.id===id)}
function getOption(geneId,value){return getGeneDef(geneId).options.find(o=>o.value===value)}
function canonicalGene(geneId,alleles){
  const order=getGeneDef(geneId).sortOrder;
  return [...alleles].sort((a,b)=>order.indexOf(a)-order.indexOf(b));
}
function geneString(geneId,alleles){
  const sorted=canonicalGene(geneId,alleles);
  const match=getGeneDef(geneId).options.find(o=>JSON.stringify(o.alleles)===JSON.stringify(sorted));
  return match?match.value:sorted.join("");
}
function readHorse(prefix){
  const horse={name:document.getElementById(`${prefix}-name`).value.trim()||(prefix==="mare"?"Unnamed Mare":"Unnamed Stallion")};
  geneDefs.forEach(gene=>{
    const value=document.getElementById(`${prefix}-${gene.id}`).value;
    horse[gene.id]=[...getOption(gene.id,value).alleles];
  });
  return horse;
}
function pickAllele(pair){return pair[Math.floor(Math.random()*pair.length)]}
function hasAllele(alleles,allele){return alleles.includes(allele)}
function countAllele(alleles,allele){return alleles.filter(a=>a===allele).length}
function isHomozygous(alleles,allele){return countAllele(alleles,allele)===2}

function calculateBaseColor(genes){
  const isChestnut=isHomozygous(genes.extension,"e");
  const hasAgouti=hasAllele(genes.agouti,"A");
  if(isChestnut) return "Chestnut";
  if(hasAgouti) return "Bay";
  return "Black";
}

function calculatePhenotype(genes){
  const base=calculateBaseColor(genes);
  const creamCount=countAllele(genes.cream,"Cr");
  const hasDun=hasAllele(genes.dun,"D");
  const hasGray=hasAllele(genes.gray,"G");
  const hasRoan=hasAllele(genes.roan,"R");
  const hasChampagne=hasAllele(genes.champagne,"Ch");
  const hasSilver=hasAllele(genes.silver,"Z");
  const pearlCount=countAllele(genes.pearl,"Prl");
  const visiblePearl=pearlCount===2||(pearlCount===1&&creamCount===1);
  const isFlaxen=isHomozygous(genes.flaxen,"f");
  const hasMushroom=hasAllele(genes.mushroom,"Mu");

  let color=base;

  if(base==="Chestnut"&&hasMushroom) color="Mushroom";
  else if(base==="Chestnut"&&isFlaxen) color="Flaxen Chestnut";

  if(hasChampagne){
    if(creamCount===1){
      if(base==="Chestnut") color="Gold Cream Champagne";
      else if(base==="Bay") color="Amber Cream Champagne";
      else color="Classic Cream Champagne";
    }else if(creamCount===2){
      if(base==="Chestnut") color="Gold Double Cream Champagne";
      else if(base==="Bay") color="Amber Double Cream Champagne";
      else color="Classic Double Cream Champagne";
    }else{
      if(base==="Chestnut") color="Gold Champagne";
      else if(base==="Bay") color="Amber Champagne";
      else color="Classic Champagne";
    }
  }else if(visiblePearl&&creamCount===1){
    if(base==="Chestnut") color="Palomino Pearl";
    else if(base==="Bay") color="Buckskin Pearl";
    else color="Smoky Black Pearl";
  }else if(pearlCount===2){
    if(base==="Chestnut") color="Chestnut Pearl";
    else if(base==="Bay") color="Bay Pearl";
    else color="Black Pearl";
  }else{
    if(creamCount===1){
      if(base==="Chestnut") color="Palomino";
      else if(base==="Bay") color="Buckskin";
      else color="Smoky Black";
    }else if(creamCount===2){
      if(base==="Chestnut") color="Cremello";
      else if(base==="Bay") color="Perlino";
      else color="Smoky Cream";
    }
  }

  if(hasSilver&&base!=="Chestnut"){
    if(color==="Black") color="Silver Black";
    else if(color==="Bay") color="Silver Bay";
    else if(color==="Buckskin") color="Silver Buckskin";
    else if(color==="Smoky Black") color="Silver Smoky Black";
    else color=`Silver ${color}`;
  }

  if(hasDun){
    if(color==="Chestnut"||color==="Flaxen Chestnut"||color==="Mushroom") color=`Red Dun ${color}`.trim();
    else if(color==="Bay") color="Bay Dun";
    else if(color==="Black") color="Grullo";
    else color=`${color} Dun`;
  }

  const patterns=[];
  if(hasAllele(genes.tobiano,"To")) patterns.push("Tobiano");
  const frameCount=countAllele(genes.frame,"O");
  if(frameCount===2) patterns.push("Frame Overo (LWO risk)");
  else if(frameCount===1) patterns.push("Frame Overo");
  if(hasAllele(genes.splash,"SW")) patterns.push("Splash");
  if(hasAllele(genes.sabino,"SB1")) patterns.push("Sabino");
  const lpCount=countAllele(genes.lp,"Lp");
  const hasPATN1=hasAllele(genes.patn1,"PATN1");
  if(lpCount===2&&hasPATN1) patterns.push("Fewspot Leopard Appaloosa");
  else if(lpCount===1&&hasPATN1) patterns.push("Leopard Appaloosa");
  else if(lpCount===2) patterns.push("Snowcap Appaloosa");
  else if(lpCount===1) patterns.push("Varnish Roan Appaloosa");
  if(hasAllele(genes.w20,"W20")) patterns.push("W20 White");
  if(hasAllele(genes.w5,"W5")) patterns.push("W5 White");
  if(hasAllele(genes.w10,"W10")) patterns.push("W10 White");
  if(hasAllele(genes.w22,"W22")) patterns.push("W22 White");

  if(hasRoan) color=`${color} Roan`;
  if(hasGray) color=`Gray (${color} base)`;
  if(patterns.length) color=`${color} with ${patterns.join(", ")}`;
  return color;
}

function breed(mare,stallion){
  const foalGenes={};
  geneDefs.forEach(gene=>{
    foalGenes[gene.id]=canonicalGene(gene.id,[pickAllele(mare[gene.id]),pickAllele(stallion[gene.id])]);
  });
  return {
    id:crypto.randomUUID(),
    name:`Foal ${Math.floor(Math.random()*9000)+1000}`,
    genes:foalGenes,
    phenotype:calculatePhenotype(foalGenes)
  };
}

function genotypeSummary(genes){
  return geneDefs.map(g=>`${g.label}: ${geneString(g.id,genes[g.id])}`).join(" • ");
}
function renderCurrentFoal(){
  if(!currentFoal){resultEl.innerHTML='<p>Pick two horses and click <strong>Breed Horses</strong>.</p>';return}
  resultEl.innerHTML=`<h3>${currentFoal.name}</h3><p><strong>Phenotype:</strong> ${currentFoal.phenotype}</p><p class="small"><strong>Genotype:</strong> ${genotypeSummary(currentFoal.genes)}</p>`;
}
function getHerd(){try{return JSON.parse(localStorage.getItem("genebound-herd"))||[]}catch{return[]}}
function setHerd(herd){localStorage.setItem("genebound-herd",JSON.stringify(herd))}
function renderHerd(){
  const herd=getHerd();
  if(herd.length===0){herdEl.innerHTML='<p class="muted">No saved horses yet.</p>';return}
  herdEl.innerHTML=herd.map(h=>`<article class="herd-item"><h3>${h.name}</h3><p><strong>Phenotype:</strong> ${h.phenotype}</p><p class="small"><strong>Genotype:</strong> ${genotypeSummary(h.genes)}</p></article>`).join("");
}

document.getElementById("breed-button").addEventListener("click",()=>{
  currentFoal=breed(readHorse("mare"),readHorse("stallion"));
  renderCurrentFoal();
});
document.getElementById("save-button").addEventListener("click",()=>{
  if(!currentFoal){alert("Breed a foal first.");return}
  const herd=getHerd(); herd.unshift(currentFoal); setHerd(herd); renderHerd();
});
document.getElementById("clear-button").addEventListener("click",()=>{
  localStorage.removeItem("genebound-herd"); renderHerd();
});

buildGeneFields("mare",mareGenesEl);
buildGeneFields("stallion",stallionGenesEl);
renderCurrentFoal();
renderHerd();
  leopard complex: ["LP", "lp"],
  tobino: ["To", "to"]
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
  const roan = genes.roan;

  const isGray = hasAllele(gray, "G");
  const isChestnut = countAllele(ext, "e") === 2;
  const hasAgouti = hasAllele(agouti, "A");
  const creamCount = countAllele(cream, "Cr");
  const isDun = hasAllele(dun, "D");
  const isRoan = hasAllele(roan, "R");

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
  if (isRoan) {
    color = `${color} Roan`;
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

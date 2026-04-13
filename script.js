document.addEventListener("DOMContentLoaded", () => {
  const geneDefs = [
    {id:"extension",label:"Extension",defaults:{mare:"Ee",stallion:"ee"},options:[["EE",["E","E"]],["Ee",["E","e"]],["ee",["e","e"]]],sort:["E","e"]},
    {id:"agouti",label:"Agouti",defaults:{mare:"Aa",stallion:"Aa"},options:[["AA",["A","A"]],["Aa",["A","a"]],["aa",["a","a"]]],sort:["A","a"]},
    {id:"cream",label:"Cream",defaults:{mare:"CrN",stallion:"NN"},options:[["NN",["N","N"]],["CrN",["Cr","N"]],["CrCr",["Cr","Cr"]]],sort:["Cr","N"]},
    {id:"dun",label:"Dun",defaults:{mare:"dd",stallion:"Dd"},options:[["DD",["D","D"]],["Dd",["D","d"]],["dd",["d","d"]]],sort:["D","d"]},
    {id:"gray",label:"Gray",defaults:{mare:"gg",stallion:"gg"},options:[["GG",["G","G"]],["Gg",["G","g"]],["gg",["g","g"]]],sort:["G","g"]},
    {id:"roan",label:"Roan",defaults:{mare:"nn",stallion:"nn"},options:[["RR",["R","R"]],["Rn",["R","n"]],["nn",["n","n"]]],sort:["R","n"]},
    {id:"champagne",label:"Champagne",defaults:{mare:"NN",stallion:"NN"},options:[["ChCh",["Ch","Ch"]],["ChN",["Ch","N"]],["NN",["N","N"]]],sort:["Ch","N"]},
    {id:"silver",label:"Silver",defaults:{mare:"NN",stallion:"NN"},options:[["ZZ",["Z","Z"]],["ZN",["Z","N"]],["NN",["N","N"]]],sort:["Z","N"]},
    {id:"pearl",label:"Pearl",defaults:{mare:"NN",stallion:"NN"},options:[["PrlPrl",["Prl","Prl"]],["PrlN",["Prl","N"]],["NN",["N","N"]]],sort:["Prl","N"]},
    {id:"flaxen",label:"Flaxen",defaults:{mare:"FF",stallion:"FF"},options:[["FF",["F","F"]],["Ff",["F","f"]],["ff",["f","f"]]],sort:["F","f"]},
    {id:"mushroom",label:"Mushroom",defaults:{mare:"NN",stallion:"NN"},options:[["MuMu",["Mu","Mu"]],["MuN",["Mu","N"]],["NN",["N","N"]]],sort:["Mu","N"]},
    {id:"tobiano",label:"Tobiano",defaults:{mare:"NN",stallion:"NN"},options:[["ToTo",["To","To"]],["ToN",["To","N"]],["NN",["N","N"]]],sort:["To","N"]},
    {id:"frame",label:"Frame Overo",defaults:{mare:"NN",stallion:"NN"},options:[["OO",["O","O"]],["ON",["O","N"]],["NN",["N","N"]]],sort:["O","N"]},
    {id:"splash",label:"Splash",defaults:{mare:"NN",stallion:"NN"},options:[["SWSW",["SW","SW"]],["SWN",["SW","N"]],["NN",["N","N"]]],sort:["SW","N"]},
    {id:"sabino",label:"Sabino-1",defaults:{mare:"NN",stallion:"NN"},options:[["SB1SB1",["SB1","SB1"]],["SB1N",["SB1","N"]],["NN",["N","N"]]],sort:["SB1","N"]},
    {id:"lp",label:"Leopard Complex",defaults:{mare:"NN",stallion:"NN"},options:[["LpLp",["Lp","Lp"]],["LpN",["Lp","N"]],["NN",["N","N"]]],sort:["Lp","N"]},
    {id:"patn1",label:"PATN1",defaults:{mare:"NN",stallion:"NN"},options:[["PATN1PATN1",["PATN1","PATN1"]],["PATN1N",["PATN1","N"]],["NN",["N","N"]]],sort:["PATN1","N"]},
    {id:"w20",label:"W20",defaults:{mare:"NN",stallion:"NN"},options:[["W20W20",["W20","W20"]],["W20N",["W20","N"]],["NN",["N","N"]]],sort:["W20","N"]},
    {id:"w5",label:"W5",defaults:{mare:"NN",stallion:"NN"},options:[["W5W5",["W5","W5"]],["W5N",["W5","N"]],["NN",["N","N"]]],sort:["W5","N"]},
    {id:"w10",label:"W10",defaults:{mare:"NN",stallion:"NN"},options:[["W10W10",["W10","W10"]],["W10N",["W10","N"]],["NN",["N","N"]]],sort:["W10","N"]},
    {id:"w22",label:"W22",defaults:{mare:"NN",stallion:"NN"},options:[["W22W22",["W22","W22"]],["W22N",["W22","N"]],["NN",["N","N"]]],sort:["W22","N"]}
  ];

  const byId = (id) => document.getElementById(id);
  const resultEl = byId("result");
  const herdEl = byId("herd");

  function renderGeneFields(prefix) {
    const container = byId(`${prefix}-genes`);
    container.innerHTML = "";
    geneDefs.forEach((gene) => {
      const label = document.createElement("label");
      label.textContent = gene.label;
      const select = document.createElement("select");
      select.id = `${prefix}-${gene.id}`;
      gene.options.forEach(([value]) => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = value;
        if (value === gene.defaults[prefix]) opt.selected = true;
        select.appendChild(opt);
      });
      label.appendChild(select);
      container.appendChild(label);
    });
  }

  function geneDef(id) {
    return geneDefs.find((g) => g.id === id);
  }

  function optionAlleles(geneId, value) {
    return geneDef(geneId).options.find(([v]) => v === value)[1].slice();
  }

  function canonical(geneId, alleles) {
    const order = geneDef(geneId).sort;
    return alleles.slice().sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }

  function genotypeString(geneId, alleles) {
    const sorted = canonical(geneId, alleles);
    const match = geneDef(geneId).options.find(([, a]) => JSON.stringify(a) === JSON.stringify(sorted));
    return match ? match[0] : sorted.join("");
  }

  function readHorse(prefix) {
    const horse = {
      name: byId(`${prefix}-name`).value.trim() || (prefix === "mare" ? "Unnamed Mare" : "Unnamed Stallion")
    };
    geneDefs.forEach((gene) => {
      horse[gene.id] = optionAlleles(gene.id, byId(`${prefix}-${gene.id}`).value);
    });
    return horse;
  }

  function randAllele(pair) {
    return pair[Math.floor(Math.random() * pair.length)];
  }

  function has(alleles, allele) {
    return alleles.includes(allele);
  }

  function count(alleles, allele) {
    return alleles.filter((x) => x === allele).length;
  }

  function baseColor(genes) {
    const chestnut = count(genes.extension, "e") === 2;
    const agouti = has(genes.agouti, "A");
    if (chestnut) return "Chestnut";
    if (agouti) return "Bay";
    return "Black";
  }

  function phenotype(genes) {
    const base = baseColor(genes);
    const creamCount = count(genes.cream, "Cr");
    const pearlCount = count(genes.pearl, "Prl");
    const visiblePearl = pearlCount === 2 || (pearlCount === 1 && creamCount === 1);
    const isFlaxen = count(genes.flaxen, "f") === 2;
    const hasMushroom = has(genes.mushroom, "Mu");

    let color = base;

    if (base === "Chestnut" && hasMushroom) color = "Mushroom";
    else if (base === "Chestnut" && isFlaxen) color = "Flaxen Chestnut";

    if (has(genes.champagne, "Ch")) {
      if (creamCount === 1) color = base === "Chestnut" ? "Gold Cream Champagne" : base === "Bay" ? "Amber Cream Champagne" : "Classic Cream Champagne";
      else if (creamCount === 2) color = base === "Chestnut" ? "Gold Double Cream Champagne" : base === "Bay" ? "Amber Double Cream Champagne" : "Classic Double Cream Champagne";
      else color = base === "Chestnut" ? "Gold Champagne" : base === "Bay" ? "Amber Champagne" : "Classic Champagne";
    } else if (visiblePearl && creamCount === 1) {
      color = base === "Chestnut" ? "Palomino Pearl" : base === "Bay" ? "Buckskin Pearl" : "Smoky Black Pearl";
    } else if (pearlCount === 2) {
      color = base === "Chestnut" ? "Chestnut Pearl" : base === "Bay" ? "Bay Pearl" : "Black Pearl";
    } else if (creamCount === 1) {
      color = base === "Chestnut" ? "Palomino" : base === "Bay" ? "Buckskin" : "Smoky Black";
    } else if (creamCount === 2) {
      color = base === "Chestnut" ? "Cremello" : base === "Bay" ? "Perlino" : "Smoky Cream";
    }

    if (has(genes.silver, "Z") && base !== "Chestnut") {
      if (color === "Black") color = "Silver Black";
      else if (color === "Bay") color = "Silver Bay";
      else if (color === "Buckskin") color = "Silver Buckskin";
      else if (color === "Smoky Black") color = "Silver Smoky Black";
      else color = `Silver ${color}`;
    }

    if (has(genes.dun, "D")) {
      if (color === "Black") color = "Grullo";
      else if (color === "Bay") color = "Bay Dun";
      else color = `Red Dun ${color}`.replace("Red Dun Palomino", "Dunalino");
    }

    if (has(genes.roan, "R")) color += " Roan";
    if (has(genes.gray, "G")) color = `Gray (${color} base)`;

    const patterns = [];
    if (has(genes.tobiano, "To")) patterns.push("Tobiano");
    const frameCount = count(genes.frame, "O");
    if (frameCount === 2) patterns.push("Frame Overo (LWO risk)");
    else if (frameCount === 1) patterns.push("Frame Overo");
    if (has(genes.splash, "SW")) patterns.push("Splash");
    if (has(genes.sabino, "SB1")) patterns.push("Sabino");

    const lpCount = count(genes.lp, "Lp");
    const hasPATN1 = has(genes.patn1, "PATN1");
    if (lpCount === 2 && hasPATN1) patterns.push("Fewspot Leopard Appaloosa");
    else if (lpCount === 1 && hasPATN1) patterns.push("Leopard Appaloosa");
    else if (lpCount === 2) patterns.push("Snowcap Appaloosa");
    else if (lpCount === 1) patterns.push("Varnish Roan Appaloosa");

    if (has(genes.w20, "W20")) patterns.push("W20 White");
    if (has(genes.w5, "W5")) patterns.push("W5 White");
    if (has(genes.w10, "W10")) patterns.push("W10 White");
    if (has(genes.w22, "W22")) patterns.push("W22 White");

    if (patterns.length) color += ` with ${patterns.join(", ")}`;
    return color;
  }

  function breed(mare, stallion) {
    const genes = {};
    geneDefs.forEach((gene) => {
      genes[gene.id] = canonical(gene.id, [randAllele(mare[gene.id]), randAllele(stallion[gene.id])]);
    });
    return {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      name: `Foal ${Math.floor(Math.random() * 9000) + 1000}`,
      genes,
      phenotype: phenotype(genes)
    };
  }

  function genotypeSummary(genes) {
    return geneDefs.map((gene) => `${gene.label}: ${genotypeString(gene.id, genes[gene.id])}`).join(" • ");
  }

  function getHerd() {
    try { return JSON.parse(localStorage.getItem("genebound-herd-fixed")) || []; }
    catch { return []; }
  }

  function setHerd(herd) {
    localStorage.setItem("genebound-herd-fixed", JSON.stringify(herd));
  }

  function renderHerd() {
    const herd = getHerd();
    if (!herd.length) {
      herdEl.innerHTML = '<p class="muted">No saved horses yet.</p>';
      return;
    }
    herdEl.innerHTML = herd.map((h) => `<article class="herd-item"><h3>${h.name}</h3><p><strong>Phenotype:</strong> ${h.phenotype}</p><p class="small"><strong>Genotype:</strong> ${genotypeSummary(h.genes)}</p></article>`).join("");
  }

  let currentFoal = null;

  function renderFoal() {
    if (!currentFoal) {
      resultEl.innerHTML = '<p>Pick two horses and click <strong>Breed Horses</strong>.</p>';
      return;
    }
    resultEl.innerHTML = `<h3>${currentFoal.name}</h3><p><strong>Phenotype:</strong> ${currentFoal.phenotype}</p><p class="small"><strong>Genotype:</strong> ${genotypeSummary(currentFoal.genes)}</p>`;
  }

  renderGeneFields("mare");
  renderGeneFields("stallion");
  renderFoal();
  renderHerd();

  byId("breed-button").addEventListener("click", () => {
    currentFoal = breed(readHorse("mare"), readHorse("stallion"));
    renderFoal();
  });

  byId("save-button").addEventListener("click", () => {
    if (!currentFoal) return alert("Breed a foal first.");
    const herd = getHerd();
    herd.unshift(currentFoal);
    setHerd(herd);
    renderHerd();
  });

  byId("clear-button").addEventListener("click", () => {
    localStorage.removeItem("genebound-herd-fixed");
    renderHerd();
  });
});

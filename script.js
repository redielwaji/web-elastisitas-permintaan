// DOM Elements
const quantityStep = document.getElementById("quantityStep");
const priceStep = document.getElementById("priceStep");
const resultsStep = document.getElementById("resultsStep");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const nextToPriceBtn = document.getElementById("nextToPrice");
const backToQuantityBtn = document.getElementById("backToQuantity");
const calculateElasticityBtn = document.getElementById("calculateElasticity");
const backToPriceBtn = document.getElementById("backToPrice");
const newAnalysisBtn = document.getElementById("newAnalysis");

// Input fields
const q1Input = document.getElementById("q1");
const q2Input = document.getElementById("q2");
const p1Input = document.getElementById("p1");
const p2Input = document.getElementById("p2");

// Result fields
const deltaQResult = document.getElementById("deltaQResult");
const deltaPResult = document.getElementById("deltaPResult");
const epValue = document.getElementById("epValue");
const epCategory = document.getElementById("epCategory");
const interpretationText = document.getElementById("interpretationText");
const recommendationText = document.getElementById("recommendationText");

// Navigation functions
nextToPriceBtn.addEventListener("click", function () {
  if (validateQuantityInputs()) {
    quantityStep.classList.add("hidden");
    priceStep.classList.remove("hidden");

    step1.classList.remove("active");
    step1.classList.add("completed");
    step2.classList.add("active");
  }
});

backToQuantityBtn.addEventListener("click", function () {
  priceStep.classList.add("hidden");
  quantityStep.classList.remove("hidden");

  step2.classList.remove("active");
  step1.classList.add("active");
  step1.classList.remove("completed");
});

calculateElasticityBtn.addEventListener("click", function () {
  if (validatePriceInputs()) {
    calculateAndDisplayResults();
    priceStep.classList.add("hidden");
    resultsStep.classList.remove("hidden");

    step2.classList.remove("active");
    step2.classList.add("completed");
    step3.classList.add("active");
  }
});

backToPriceBtn.addEventListener("click", function () {
  resultsStep.classList.add("hidden");
  priceStep.classList.remove("hidden");

  step3.classList.remove("active");
  step2.classList.add("active");
  step2.classList.remove("completed");
});

newAnalysisBtn.addEventListener("click", function () {
  // Reset form
  q1Input.value = "";
  q2Input.value = "";
  p1Input.value = "";
  p2Input.value = "";

  // Reset steps
  resultsStep.classList.add("hidden");
  quantityStep.classList.remove("hidden");

  step3.classList.remove("active");
  step2.classList.remove("completed");
  step1.classList.add("active");
});

// Validation functions
function validateQuantityInputs() {
  if (!q1Input.value || !q2Input.value) {
    alert("Harap masukkan kedua nilai kuantitas!");
    return false;
  }

  if (parseFloat(q1Input.value) <= 0) {
    alert("Kuantitas awal harus lebih besar dari 0!");
    return false;
  }

  return true;
}

function validatePriceInputs() {
  if (!p1Input.value || !p2Input.value) {
    alert("Harap masukkan kedua nilai harga!");
    return false;
  }

  if (parseFloat(p1Input.value) <= 0) {
    alert("Harga awal harus lebih besar dari 0!");
    return false;
  }

  return true;
}

// Calculation functions
function calculatePercentageChange(oldValue, newValue) {
  return ((newValue - oldValue) / oldValue) * 100;
}

function calculateElasticity(deltaQ, deltaP) {
  return deltaQ / deltaP;
}

function calculateAndDisplayResults() {
  const q1 = parseFloat(q1Input.value);
  const q2 = parseFloat(q2Input.value);
  const p1 = parseFloat(p1Input.value);
  const p2 = parseFloat(p2Input.value);

  // Calculate percentage changes
  const deltaQ = calculatePercentageChange(q1, q2);
  const deltaP = calculatePercentageChange(p1, p2);

  // Calculate elasticity
  const ep = calculateElasticity(deltaQ, deltaP);
  const absEp = Math.abs(ep);

  // Display results
  deltaQResult.textContent = `${deltaQ.toFixed(2)}%`;
  deltaPResult.textContent = `${deltaP.toFixed(2)}%`;
  epValue.textContent = ep.toFixed(2);

  // Determine category and set interpretation
  let category = "";
  let interpretation = "";
  let recommendation = "";

  if (!isFinite(ep)) {
    category = "Elastis Sempurna";
    interpretation =
      "Permintaan sangat sensitif terhadap perubahan harga. Kenaikan harga sekecil apapun akan menyebabkan permintaan turun menjadi nol. Biasanya terjadi pada barang dengan banyak substitusi sempurna.";
    recommendation =
      "Pertahankan harga kompetitif atau fokuskan pada diferensiasi produk untuk mengurangi sensitivitas harga.";
  } else if (absEp > 1) {
    category = "Elastis";
    interpretation =
      "Permintaan cukup sensitif terhadap perubahan harga. Persentase perubahan kuantitas lebih besar daripada persentase perubahan harga. Biasanya terjadi pada barang mewah atau barang dengan banyak substitusi.";
    recommendation =
      "Pertimbangkan strategi diskon atau promosi untuk meningkatkan volume penjualan. Hati-hati dalam menaikkan harga.";
  } else if (absEp === 1) {
    category = "Elastisitas Uniter";
    interpretation =
      "Persentase perubahan kuantitas sama dengan persentase perubahan harga. Perubahan harga tidak mempengaruhi total pendapatan.";
    recommendation =
      "Strategi harga dapat lebih fleksibel, namun perlu mempertimbangkan faktor lain seperti biaya dan persaingan.";
  } else if (absEp > 0 && absEp < 1) {
    category = "Inelastis";
    interpretation =
      "Permintaan kurang sensitif terhadap perubahan harga. Persentase perubahan kuantitas lebih kecil daripada persentase perubahan harga. Biasanya terjadi pada barang kebutuhan pokok atau barang tanpa substitusi yang baik.";
    recommendation =
      "Dapat mempertimbangkan kenaikan harga untuk meningkatkan pendapatan, namun tetap perhatikan daya beli konsumen.";
  } else if (absEp === 0) {
    category = "Inelastis Sempurna";
    interpretation =
      "Permintaan tidak terpengaruh oleh perubahan harga. Kuantitas yang diminta tetap sama berapapun harganya. Biasanya terjadi pada barang yang sangat esensial tanpa substitusi.";
    recommendation =
      "Dapat menaikkan harga untuk meningkatkan pendapatan, namun pertimbangkan aspek etika dan regulasi.";
  } else {
    category = "Tidak Terdefinisi";
    interpretation =
      "Data yang dimasukkan menghasilkan nilai elastisitas yang tidak dapat diinterpretasikan. Periksa kembali data yang dimasukkan.";
    recommendation =
      "Pastikan data kuantitas dan harga yang dimasukkan valid dan logis.";
  }

  // Set category and texts
  epCategory.textContent = category;
  interpretationText.textContent = interpretation;
  recommendationText.textContent = recommendation;

  // Set badge color based on category
  if (category === "Elastis Sempurna" || category === "Elastis") {
    epCategory.className = "badge result-badge bg-warning";
  } else if (category === "Elastisitas Uniter") {
    epCategory.className = "badge result-badge bg-info";
  } else if (category === "Inelastis" || category === "Inelastis Sempurna") {
    epCategory.className = "badge result-badge bg-success";
  } else {
    epCategory.className = "badge result-badge bg-secondary";
  }
}

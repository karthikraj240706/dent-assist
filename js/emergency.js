document.addEventListener('DOMContentLoaded', () => {
  generateRx();
});

function calculateLA() {
  const weightInput = document.getElementById('patientWeight');
  const resultDiv = document.getElementById('laResult');
  
  const weight = parseFloat(weightInput.value);
  if (!weight || weight <= 0) {
    alert('Please enter a valid weight in kg.');
    return;
  }

  // 2% Lidocaine = 20 mg/mL -> 1.8 mL cartridge = 36 mg Lidocaine per cartridge
  // Max dose: 4.4 mg/kg (Absolute max: 300 mg)
  const maxMgCalculated = weight * 4.4;
  const maxMgAllowed = Math.min(maxMgCalculated, 300);
  const maxCartridges = (maxMgAllowed / 36).toFixed(1);

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div style="background: var(--accent-light); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      • Maximum Dose: <strong>${Math.round(maxMgAllowed)} mg</strong> Lidocaine<br>
      • Maximum Safe Cartridges: <strong>${maxCartridges} Cartridge(s)</strong> (1.8 mL each)
    </div>
  `;
}

function generateRx() {
  const type = document.getElementById('rxIndication').value;
  const preview = document.getElementById('rxPreview');

  let text = '';

  if (type === 'endo') {
    text = `Rx:
1. Tab. Amoxicillin 500 mg
   Sig: 1 tablet 8 hourly (TDS) x 5 days (After meals)

2. Tab. Ibuprofen 400 mg + Paracetamol 325 mg
   Sig: 1 tablet 8 hourly (TDS) x 3 days (After meals)

3. Cap. Omeprazole 20 mg
   Sig: 1 capsule daily before breakfast x 5 days`;
  } else if (type === 'surgery') {
    text = `Rx:
1. Tab. Ketorolac DT 10 mg
   Sig: 1 tablet dissolved in half glass water 8 hourly (TDS) x 3 days PRN

2. Tab. Paracetamol 650 mg
   Sig: 1 tablet 6 hourly if pain persists

3. Chlorhexidine Gluconate 0.2% Mouthwash
   Sig: Rinse with 10 mL for 1 min twice daily starting 24 hours post-op`;
  } else if (type === 'perio') {
    text = `Rx:
1. Tab. Amoxicillin 500 mg
   Sig: 1 tablet 8 hourly (TDS) x 5 days

2. Tab. Metronidazole 400 mg
   Sig: 1 tablet 8 hourly (TDS) x 5 days

3. Chlorhexidine Gluconate 0.2% Mouthwash
   Sig: Rinse with 10 mL twice daily x 7 days`;
  }

  preview.textContent = text;
}

function copyRx() {
  const preview = document.getElementById('rxPreview').textContent;
  navigator.clipboard.writeText(preview).then(() => {
    alert('Prescription text copied to clipboard!');
  });
}

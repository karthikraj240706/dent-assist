const dentalInstruments = [
  {
    id: 1,
    name: "Mouth Mirror (No. 4/5)",
    department: "Diagnostic",
    uses: "Provides indirect vision, tissue retraction, and illumination of dark areas inside the oral cavity.",
    sterilization: "Autoclave (121°C at 15 psi for 20 mins)",
    material: "Stainless Steel frame with front-surface glass mirror",
    difficulty: "Basic",
    clinicalTip: "Always rest ring finger on adjacent teeth (fulcrum) to prevent slippage while retracting cheek.",
    icon: "🔍"
  },
  {
    id: 2,
    name: "College Tweezers (Cotton Pliers)",
    department: "Diagnostic",
    uses: "Placing and removing cotton rolls, dressing materials, small instruments, or medicaments.",
    sterilization: "Autoclave",
    material: "Surgical Stainless Steel",
    difficulty: "Basic",
    clinicalTip: "Choose locking tweezers for handling small endodontic items like paper points or gutta-percha.",
    icon: "📐"
  },
  {
    id: 3,
    name: "Dental Explorer / Probe (Sickle & Shepherd Hook)",
    department: "Diagnostic",
    uses: "Tactile evaluation of tooth surface irregularities, pit & fissure caries detection, and checking restoration margins.",
    sterilization: "Autoclave",
    material: "High-grade Stainless Steel",
    difficulty: "Basic",
    clinicalTip: "Do not apply heavy pressure on suspected carious pits to avoid damaging intact enamel prisms.",
    icon: "📍"
  },
  {
    id: 4,
    name: "CPITN Periodontal Probe",
    department: "Periodontics",
    uses: "Measuring pocket depth, calculus accumulation, and assessing Community Periodontal Index of Treatment Needs.",
    sterilization: "Autoclave",
    material: "Stainless Steel or Autoclavable Plastic",
    difficulty: "Intermediate",
    clinicalTip: "Keep probing force light (approx 20 grams, equivalent to pressing probe under fingernail without blanching).",
    icon: "📏"
  },
  {
    id: 5,
    name: "Gracey Curette 1/2",
    department: "Periodontics",
    uses: "Area-specific subgingival scaling and root planing on anterior teeth.",
    sterilization: "Autoclave",
    material: "Carbon Steel or Stainless Steel",
    difficulty: "Intermediate",
    clinicalTip: "The lower shank must be parallel to the tooth surface being planed.",
    icon: "🌾"
  },
  {
    id: 6,
    name: "Universal Scaler (Sickle Scaler)",
    department: "Periodontics",
    uses: "Removal of heavy supragingival calculus deposits across all quadrant surfaces.",
    sterilization: "Autoclave",
    material: "Stainless Steel",
    difficulty: "Basic",
    clinicalTip: "Never insert a sickle scaler subgingival to avoid lacerating the soft tissue attachment.",
    icon: "⚡"
  },
  {
    id: 7,
    name: "Spoon Excavator (Medium)",
    department: "Conservative",
    uses: "Removal of soft carious dentin, temporary fillings, and excess cement from cavity preparations.",
    sterilization: "Autoclave",
    material: "Stainless Steel",
    difficulty: "Basic",
    clinicalTip: "Use gentle circular scooping motions from the dentino-enamel junction toward the cavity center.",
    icon: "🥄"
  },
  {
    id: 8,
    name: "Amalgam Carrier",
    department: "Conservative",
    uses: "Transporting freshly mixed dental amalgam from the dappen dish into the prepared tooth cavity.",
    sterilization: "Autoclave or Chemical Vapor",
    material: "Stainless Steel barrel with plunger mechanism",
    difficulty: "Basic",
    clinicalTip: "Expel all unused amalgam before cleaning; hardened amalgam jams the inner piston.",
    icon: "💉"
  },
  {
    id: 9,
    name: "Ball Burnisher",
    department: "Conservative",
    uses: "Smoothing amalgam restorations, adapting matrix bands against adjacent teeth, and shaping anatomical grooves.",
    sterilization: "Autoclave",
    material: "Stainless Steel",
    difficulty: "Basic",
    clinicalTip: "Burnish amalgam margins gently towards the tooth enamel to ensure proper seal.",
    icon: "🔮"
  },
  {
    id: 10,
    name: "Rubber Dam Forceps & Clamps",
    department: "Conservative",
    uses: "Isolating teeth from saliva, moisture, and debris during endodontic and restorative procedures.",
    sterilization: "Autoclave",
    material: "Tempered Stainless Steel",
    difficulty: "Advanced",
    clinicalTip: "Always tie dental floss to the clamp bow prior to placement for emergency retrieval if dropped.",
    icon: "🛡️"
  },
  {
    id: 11,
    name: "Endodontic K-File (#15 - #40 Set)",
    department: "Conservative",
    uses: "Manual cleaning, shaping, and enlarging of root canal systems.",
    sterilization: "Glass Bead Sterilizer chairside / Autoclave",
    material: "Stainless Steel or Nickel-Titanium (NiTi)",
    difficulty: "Intermediate",
    clinicalTip: "Always pre-curve stainless steel files before negotiating curved root canals.",
    icon: "🌀"
  },
  {
    id: 12,
    name: "Upper Universal Extraction Forceps (#150)",
    department: "Oral Surgery",
    uses: "Extraction of maxillary incisors, premolars, and roots.",
    sterilization: "Autoclave (121°C / 134°C)",
    material: "Heavy-duty Surgical Stainless Steel",
    difficulty: "Intermediate",
    clinicalTip: "Place the beak parallel to the long axis of the tooth root for optimal force application.",
    icon: "🔧"
  },
  {
    id: 13,
    name: "Straight Dental Elevator",
    department: "Oral Surgery",
    uses: "Luxating teeth, expanding alveolar bone socket, and severing periodontal ligament fibers prior to forceps application.",
    sterilization: "Autoclave",
    material: "Surgical Stainless Steel",
    difficulty: "Intermediate",
    clinicalTip: "Never use adjacent teeth as a fulcrum unless those teeth are also scheduled for extraction.",
    icon: "🔨"
  },
  {
    id: 14,
    name: "Periosteal Elevator (Howarth / Molt #9)",
    department: "Oral Surgery",
    uses: "Reflecting and elevating mucoperiosteal flaps during surgical extractions and osseous procedures.",
    sterilization: "Autoclave",
    material: "Stainless Steel",
    difficulty: "Intermediate",
    clinicalTip: "Keep the sharp edge of the elevator pressed firmly against the bone to avoid tearing soft tissues.",
    icon: "🔪"
  },
  {
    id: 15,
    name: "Fox Bite Plane / Gauge",
    department: "Prosthodontics",
    uses: "Establishing interpupillary and camper's line orientation while recording maxilla-mandibular relation.",
    sterilization: "Cold Sterilization / Autoclave (depending on material)",
    material: "Autoclavable Plastic or Aluminum",
    difficulty: "Basic",
    clinicalTip: "Ensure the anterior bar remains parallel to the line joining the pupils of the eyes.",
    icon: "📐"
  },
  {
    id: 16,
    name: "Wax Carver (PKT / LeCron)",
    department: "Prosthodontics",
    uses: "Contouring wax rims, carving anatomical wax patterns for crowns, cast partials, and complete dentures.",
    sterilization: "Autoclave or Alcohol wiping",
    material: "Stainless Steel with wooden/metal handle",
    difficulty: "Basic",
    clinicalTip: "Slightly warm the carver tip over a Bunsen burner for smooth, seamless wax carving.",
    icon: "🎨"
  },
  {
    id: 17,
    name: "Pedodontic Extraction Forceps",
    department: "Pedodontics",
    uses: "Extraction of primary anterior and posterior teeth in pediatric patients.",
    sterilization: "Autoclave",
    material: "Stainless Steel (Smaller size scaled down for pediatric mouths)",
    difficulty: "Basic",
    clinicalTip: "Keep the instrument palm-hidden to lower anxiety levels in pediatric patients.",
    icon: "🧸"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('instrumentsGrid');
  const searchInput = document.getElementById('searchInput');
  const deptFilter = document.getElementById('deptFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  const modal = document.getElementById('detailModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function render(items) {
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-secondary);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔎</div>
          <h3>No matching instruments found</h3>
          <p style="font-size: 0.9rem; margin-top: 6px;">Try adjusting your search terms or department filters.</p>
        </div>
      `;
      return;
    }

    items.forEach(inst => {
      const isFav = isBookmarked(inst.id);
      const card = document.createElement('div');
      card.className = 'instrument-card';
      
      const diffClass = inst.difficulty.toLowerCase() === 'basic' 
        ? 'diff-basic' 
        : inst.difficulty.toLowerCase() === 'intermediate' 
        ? 'diff-intermediate' 
        : 'diff-advanced';

      card.innerHTML = `
        <div class="card-image">
          <span style="font-size: 3rem;">${inst.icon}</span>
          <span class="card-tag">${inst.department}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${inst.name}</h3>
          <p class="card-meta"><strong>Material:</strong> ${inst.material}</p>
          <p class="card-text">${inst.uses}</p>
          <div class="card-footer">
            <span class="badge-diff ${diffClass}">${inst.difficulty}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary" onclick="openDetails(${inst.id})" style="padding: 6px 12px; font-size: 0.8rem;">View Details</button>
              <button class="btn btn-secondary" onclick="handleBookmark(${inst.id}, this)" style="padding: 6px 10px; font-size: 0.8rem;">
                ${isFav ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterAndSort() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const dept = deptFilter ? deptFilter.value : 'All';
    const sortBy = sortFilter ? sortFilter.value : 'name-asc';

    let filtered = dentalInstruments.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(query) || 
                          item.uses.toLowerCase().includes(query) || 
                          item.department.toLowerCase().includes(query);
      const matchDept = dept === 'All' || item.department === dept;
      return matchSearch && matchDept;
    });

    if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'dept') {
      filtered.sort((a, b) => a.department.localeCompare(b.department));
    }

    render(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterAndSort);
  if (deptFilter) deptFilter.addEventListener('change', filterAndSort);
  if (sortFilter) sortFilter.addEventListener('change', filterAndSort);

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  window.openDetails = function(id) {
    const inst = dentalInstruments.find(i => i.id === id);
    if (!inst) return;

    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <span style="font-size: 2.5rem; background: var(--accent-light); padding: 12px; border-radius: 12px;">${inst.icon}</span>
        <div>
          <h2>${inst.name}</h2>
          <span style="font-size: 0.85rem; color: var(--text-secondary);">${inst.department} Department</span>
        </div>
      </div>
      
      <p style="font-size: 0.95rem; color: var(--text-secondary);">${inst.uses}</p>

      <div class="modal-detail-grid">
        <div class="detail-item">
          <label>Material Composition</label>
          <span>${inst.material}</span>
        </div>
        <div class="detail-item">
          <label>Sterilization Method</label>
          <span>${inst.sterilization}</span>
        </div>
        <div class="detail-item">
          <label>Procedure Difficulty</label>
          <span>${inst.difficulty}</span>
        </div>
        <div class="detail-item">
          <label>Department Access</label>
          <span>BDS Clinical Postings</span>
        </div>
      </div>

      <div class="clinical-tip-box">
        <strong style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Chairside Clinical Tip</strong>
        <p style="font-size: 0.9rem; margin-top: 4px; color: var(--text-primary);">${inst.clinicalTip}</p>
      </div>
    `;

    modal.classList.add('active');
  };

  filterAndSort();
});

function isBookmarked(id) {
  const favs = JSON.parse(localStorage.getItem('dentassist_favs') || '[]');
  return favs.includes(id);
}

function handleBookmark(id, btn) {
  let favs = JSON.parse(localStorage.getItem('dentassist_favs') || '[]');
  if (favs.includes(id)) {
    favs = favs.filter(item => item !== id);
    btn.textContent = '☆ Save';
  } else {
    favs.push(id);
    btn.textContent = '★ Saved';
  }
  localStorage.setItem('dentassist_favs', JSON.stringify(favs));
}

const instrumentsData = [
  {
    id: 1,
    name: 'Mouth Mirror',
    department: 'Diagnostic',
    uses: 'Indirect vision, retraction of lips/cheeks, light reflection.',
    sterilization: 'Autoclave at 121°C (15 psi) for 15 mins',
    material: 'Stainless Steel',
    icon: '🔍'
  },
  {
    id: 2,
    name: 'Explorer (Probing Tip)',
    department: 'Diagnostic',
    uses: 'Detection of calculus, caries, and tooth surface irregularities.',
    sterilization: 'Autoclave',
    material: 'Stainless Steel',
    icon: '📍'
  },
  {
    id: 3,
    name: 'Gracey Curette 1/2',
    department: 'Periodontics',
    uses: 'Subgingival scaling and root planing of anterior teeth.',
    sterilization: 'Autoclave',
    material: 'High Carbon Stainless Steel',
    icon: '🌾'
  },
  {
    id: 4,
    name: 'K-File #15-40',
    department: 'Conservative',
    uses: 'Canal preparation and cleaning during root canal treatment.',
    sterilization: 'Autoclave / Glass bead sterilizer',
    material: 'Stainless Steel / NiTi',
    icon: '⚡'
  },
  {
    id: 5,
    name: 'Extraction Forceps (Upper Universal)',
    department: 'Oral Surgery',
    uses: 'Extraction of maxillary incisors and premolars.',
    sterilization: 'Autoclave',
    material: 'Stainless Steel',
    icon: '🔧'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('instrumentsGrid');
  const searchInput = document.getElementById('searchInput');
  const deptFilter = document.getElementById('deptFilter');

  function render(items) {
    if (!grid) return;
    grid.innerHTML = '';
    
    if (items.length === 0) {
      grid.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center;">No instruments found.</p>`;
      return;
    }

    items.forEach(inst => {
      const card = document.createElement('div');
      card.className = 'instrument-card';
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
            <span style="font-size: 0.75rem; color: var(--text-muted);">${inst.sterilization}</span>
            <button class="btn btn-secondary" onclick="toggleFav(${inst.id})" style="padding: 4px 10px; font-size: 0.8rem;">Bookmark</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterData() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const dept = deptFilter ? deptFilter.value : 'All';

    const filtered = instrumentsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(query) || item.uses.toLowerCase().includes(query);
      const matchesDept = dept === 'All' || item.department === dept;
      return matchesSearch && matchesDept;
    });

    render(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterData);
  if (deptFilter) deptFilter.addEventListener('change', filterData);

  render(instrumentsData);
});

function toggleFav(id) {
  let favs = JSON.parse(localStorage.getItem('dentassist_favs') || '[]');
  if (!favs.includes(id)) {
    favs.push(id);
    alert('Instrument saved to your bookmarks!');
  } else {
    favs = favs.filter(item => item !== id);
    alert('Removed from bookmarks.');
  }
  localStorage.setItem('dentassist_favs', JSON.stringify(favs));
}

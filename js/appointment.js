document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const tableBody = document.getElementById('patientTableBody');

  function getPatients() {
    return JSON.parse(localStorage.getItem('dentassist_patients') || '[]');
  }

  function savePatients(data) {
    localStorage.setItem('dentassist_patients', JSON.stringify(data));
  }

  function renderTable() {
    if (!tableBody) return;
    const patients = getPatients();
    tableBody.innerHTML = '';

    if (patients.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No entries found.</td></tr>`;
      return;
    }

    patients.forEach((p, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>#${idx + 101}</td>
        <td><strong>${p.name}</strong> (${p.age}/${p.gender[0]})</td>
        <td>${p.dept}</td>
        <td>₹${p.totalFee}</td>
        <td><button onclick="deletePatient(${idx})" style="border:none; background:none; color: red; cursor:pointer;">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patientName').value;
      const age = document.getElementById('patientAge').value;
      const gender = document.getElementById('patientGender').value;
      const dept = document.getElementById('clinicDept').value;
      const cFee = Number(document.getElementById('feeConsult').value) || 0;
      const tFee = Number(document.getElementById('feeTreatment').value) || 0;

      const newPatient = {
        name, age, gender, dept,
        totalFee: cFee + tFee
      };

      const patients = getPatients();
      patients.push(newPatient);
      savePatients(patients);
      
      form.reset();
      renderTable();
    });
  }

  window.deletePatient = function(index) {
    const patients = getPatients();
    patients.splice(index, 1);
    savePatients(patients);
    renderTable();
  };

  renderTable();
});

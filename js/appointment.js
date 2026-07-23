document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const tableBody = document.getElementById('patientTableBody');
  
  const receiptModal = document.getElementById('receiptModal');
  const receiptDetails = document.getElementById('receiptDetails');
  const receiptDate = document.getElementById('receiptDate');
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');

  function getPatients() {
    return JSON.parse(localStorage.getItem('dentassist_patients') || '[]');
  }

  function savePatients(data) {
    localStorage.setItem('dentassist_patients', JSON.stringify(data));
  }

  function updateStats() {
    const patients = getPatients();
    const totalCount = patients.length;
    let totalRevenue = 0;
    const deptMap = {};

    patients.forEach(p => {
      totalRevenue += p.grandTotal;
      deptMap[p.dept] = (deptMap[p.dept] || 0) + 1;
    });

    let topDept = '-';
    let maxDeptCount = 0;
    for (const [dept, count] of Object.entries(deptMap)) {
      if (count > maxDeptCount) {
        maxDeptCount = count;
        topDept = dept;
      }
    }

    const statCountEl = document.getElementById('statTodayPatients');
    const statRevEl = document.getElementById('statTodayRevenue');
    const statDeptEl = document.getElementById('statActiveDept');

    if (statCountEl) statCountEl.textContent = totalCount;
    if (statRevEl) statRevEl.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
    if (statDeptEl) statDeptEl.textContent = topDept;
  }

  function renderTable() {
    if (!tableBody) return;
    const patients = getPatients();
    tableBody.innerHTML = '';

    if (patients.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">
            No patient cases logged today. Use the form to register a case.
          </td>
        </tr>
      `;
      updateStats();
      return;
    }

    patients.forEach((p, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>#${p.id}</strong></td>
        <td>
          <div style="font-weight: 600;">${p.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${p.age} Yrs / ${p.gender}</div>
        </td>
        <td>${p.dept}</td>
        <td><strong>₹${p.grandTotal}</strong></td>
        <td>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="viewReceipt(${idx})" style="padding: 4px 8px; font-size: 0.75rem;">Bill</button>
            <button onclick="deletePatient(${idx})" style="border:none; background:none; color: #c5221f; cursor:pointer; font-size: 0.8rem; font-weight: 600;">Delete</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    updateStats();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const age = document.getElementById('patientAge').value;
      const gender = document.getElementById('patientGender').value;
      const dept = document.getElementById('clinicDept').value;
      const doctor = document.getElementById('doctorName').value.trim();
      const complaint = document.getElementById('chiefComplaint').value.trim();
      
      const consultFee = Number(document.getElementById('feeConsult').value) || 0;
      const treatmentFee = Number(document.getElementById('feeTreatment').value) || 0;
      
      const subtotal = consultFee + treatmentFee;
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      const patientId = 1000 + Math.floor(Math.random() * 9000);
      const todayString = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const newPatient = {
        id: patientId,
        date: todayString,
        name,
        age,
        gender,
        dept,
        doctor,
        complaint,
        consultFee,
        treatmentFee,
        subtotal,
        gst,
        grandTotal
      };

      const patients = getPatients();
      patients.unshift(newPatient);
      savePatients(patients);

      form.reset();
      document.getElementById('feeConsult').value = 200;
      document.getElementById('feeTreatment').value = 1500;

      renderTable();
      viewReceipt(0);
    });
  }

  window.viewReceipt = function(index) {
    const patients = getPatients();
    const p = patients[index];
    if (!p) return;

    if (receiptDate) receiptDate.textContent = `Date: ${p.date} | Invoice #${p.id}`;

    if (receiptDetails) {
      receiptDetails.innerHTML = `
        <div class="receipt-line">
          <span><strong>Patient Name:</strong> ${p.name}</span>
          <span><strong>Age/Sex:</strong> ${p.age}/${p.gender[0]}</span>
        </div>
        <div class="receipt-line">
          <span><strong>Department:</strong> ${p.dept}</span>
        </div>
        <div class="receipt-line" style="margin-bottom: 16px;">
          <span><strong>Attending Doctor:</strong> ${p.doctor}</span>
        </div>

        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 16px; font-size: 0.85rem; border: 1px solid #e9ecef;">
          <strong>Diagnosis / Notes:</strong><br>
          <span style="color: #5f6368;">${p.complaint}</span>
        </div>

        <div class="receipt-line">
          <span>Consultation Fee</span>
          <span>₹${p.consultFee}</span>
        </div>
        <div class="receipt-line">
          <span>Treatment / Procedure Fee</span>
          <span>₹${p.treatmentFee}</span>
        </div>
        <div class="receipt-line" style="color: #5f6368; font-size: 0.85rem;">
          <span>GST (18%)</span>
          <span>₹${p.gst}</span>
        </div>

        <div class="receipt-line receipt-total">
          <span>Total Amount Payable</span>
          <span>₹${p.grandTotal}</span>
        </div>
      `;
    }

    if (receiptModal) receiptModal.classList.add('active');
  };

  window.deletePatient = function(index) {
    if (confirm('Are you sure you want to delete this case record?')) {
      const patients = getPatients();
      patients.splice(index, 1);
      savePatients(patients);
      renderTable();
    }
  };

  window.clearAllPatients = function() {
    if (confirm('Are you sure you want to clear all patient logs? This action cannot be undone.')) {
      localStorage.removeItem('dentassist_patients');
      renderTable();
    }
  };

  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      receiptModal.classList.remove('active');
    });
  }

  if (receiptModal) {
    receiptModal.addEventListener('click', (e) => {
      if (e.target === receiptModal) receiptModal.classList.remove('active');
    });
  }

  renderTable();
});

document.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();
});

function loadDashboardData() {
  const patients = JSON.parse(localStorage.getItem('dentassist_patients') || '[]');
  const history = JSON.parse(localStorage.getItem('dentassist_quiz_history') || '[]');

  // 1. Calculate Patient & Revenue Stats
  const totalCases = patients.length;
  const totalRevenue = patients.reduce((acc, p) => acc + (p.grandTotal || 0), 0);

  document.getElementById('dashTotalCases').textContent = totalCases;
  document.getElementById('dashTotalRevenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;

  // 2. Calculate Quiz Stats
  const quizzesTaken = history.length;
  let totalScorePercentage = 0;

  history.forEach(item => {
    const percentage = item.total > 0 ? (item.score / item.total) * 100 : 0;
    totalScorePercentage += percentage;
  });

  const avgAccuracy = quizzesTaken > 0 ? Math.round(totalScorePercentage / quizzesTaken) : 0;

  document.getElementById('dashQuizzesTaken').textContent = quizzesTaken;
  document.getElementById('dashQuizAccuracy').textContent = `${avgAccuracy}%`;

  // 3. Render Progress Bars
  const readinessBar = document.getElementById('readinessBar');
  const readinessPercent = document.getElementById('readinessPercent');
  if (readinessBar && readinessPercent) {
    readinessBar.style.width = `${avgAccuracy}%`;
    readinessPercent.textContent = `${avgAccuracy}%`;
  }

  const caseTarget = Math.min(Math.round((totalCases / 10) * 100), 100); // Target: 10 cases
  const caseTargetBar = document.getElementById('caseTargetBar');
  const caseTargetPercent = document.getElementById('caseTargetPercent');
  if (caseTargetBar && caseTargetPercent) {
    caseTargetBar.style.width = `${caseTarget}%`;
    caseTargetPercent.textContent = `${caseTarget}% (${totalCases}/10)`;
  }

  // 4. Render Quiz History Table
  const tableBody = document.getElementById('quizHistoryBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (history.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">
          No quiz attempts logged yet. Complete a quiz to see results here!
        </td>
      </tr>
    `;
    return;
  }

  // Render history entries in reverse chronological order
  [...history].reverse().forEach(item => {
    const percentage = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.date || 'N/A'}</td>
      <td><strong>${item.category}</strong></td>
      <td><span style="text-transform: capitalize;">${item.mode}</span></td>
      <td>${item.score} / ${item.total}</td>
      <td><strong>${percentage}%</strong></td>
    `;
    tableBody.appendChild(row);
  });
}

function clearQuizHistory() {
  if (confirm('Are you sure you want to clear your quiz history log?')) {
    localStorage.removeItem('dentassist_quiz_history');
    loadDashboardData();
  }
}

function exportData() {
  const data = {
    patients: JSON.parse(localStorage.getItem('dentassist_patients') || '[]'),
    quizHistory: JSON.parse(localStorage.getItem('dentassist_quiz_history') || '[]'),
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DentAssist_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetAllData() {
  if (confirm('WARNING: This will clear all patient records, clinic revenue, and quiz scores. Continue?')) {
    localStorage.clear();
    loadDashboardData();
    alert('All local DentAssist data has been reset.');
  }
}

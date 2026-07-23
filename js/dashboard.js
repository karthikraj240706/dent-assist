document.addEventListener('DOMContentLoaded', () => {
  const favText = document.getElementById('favCountText');
  const patientText = document.getElementById('recentPatientsText');
  const scoreText = document.getElementById('dashQuizScore');

  const favs = JSON.parse(localStorage.getItem('dentassist_favs') || '[]');
  const patients = JSON.parse(localStorage.getItem('dentassist_patients') || '[]');
  const score = localStorage.getItem('dentassist_quiz_score') || '0';

  if (favText) {
    favText.textContent = `You have ${favs.length} bookmarked instrument(s) stored locally.`;
  }

  if (patientText) {
    patientText.textContent = patients.length > 0 
      ? `Total patients registered in clinic simulator: ${patients.length}` 
      : 'No clinic records saved yet.';
  }

  if (scoreText) {
    scoreText.textContent = `${score} pts`;
  }
});

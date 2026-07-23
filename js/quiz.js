const quizQuestions = [
  {
    question: 'Which instrument is primarily indicated for subgingival root planing on the anterior teeth?',
    options: ['Gracey Curette 1/2', 'Sickle Scaler', 'Universal Curette 13/14', 'Explorer #23'],
    correct: 0
  },
  {
    question: 'What is the standard holding technique for a mouth mirror during intraoral examination?',
    options: ['Palm-Thumb grasp', 'Modified Pen grasp', 'Power grasp', 'Reverse palm grasp'],
    correct: 1
  },
  {
    question: 'Which sterilizer uses moist heat under pressure?',
    options: ['Dry Heat Oven', 'Autoclave', 'Ethylene Oxide', 'Chemical Vapor'],
    correct: 1
  }
];

let currentIndex = 0;
let score = 0;
let selectedOption = null;

document.addEventListener('DOMContentLoaded', () => {
  const qEl = document.getElementById('quizQuestion');
  const optsEl = document.getElementById('optionsContainer');
  const progressEl = document.getElementById('quizProgress');
  const nextBtn = document.getElementById('nextBtn');

  function loadQuestion() {
    selectedOption = null;
    const current = quizQuestions[currentIndex];
    if (qEl) qEl.textContent = current.question;
    if (progressEl) progressEl.textContent = `Question ${currentIndex + 1} of ${quizQuestions.length}`;
    
    if (optsEl) {
      optsEl.innerHTML = '';
      current.options.forEach((opt, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        item.textContent = opt;
        item.onclick = () => selectOpt(idx, item);
        optsEl.appendChild(item);
      });
    }
  }

  function selectOpt(index, element) {
    document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedOption = index;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (selectedOption === null) {
        alert('Please select an option before proceeding.');
        return;
      }

      if (selectedOption === quizQuestions[currentIndex].correct) {
        score += 10;
      }

      currentIndex++;

      if (currentIndex < quizQuestions.length) {
        loadQuestion();
      } else {
        localStorage.setItem('dentassist_quiz_score', score);
        document.getElementById('quizContainer').innerHTML = `
          <h3>Quiz Completed!</h3>
          <p style="margin: 16px 0; color: var(--text-secondary);">Your calculated score is <strong>${score} points</strong>.</p>
          <a href="quiz.html" class="btn btn-primary" style="width:100%;">Retake Quiz</a>
        `;
      }
    });
  }

  loadQuestion();
});

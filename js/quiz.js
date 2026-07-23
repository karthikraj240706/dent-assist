// Question Database
const questionBank = [
  {
    id: 1,
    category: 'Endodontics',
    question: 'Which instrument is specifically designed for probing canal orifices during root canal access preparation?',
    options: [
      'DG-16 Explorer',
      'K-File #10',
      'Gates-Glidden Drill',
      'Spoon Excavator'
    ],
    correct: 0,
    explanation: 'The DG-16 endodontic explorer features sharp, double-ended long tips designed specifically to locate and probe root canal orifices.'
  },
  {
    id: 2,
    category: 'Endodontics',
    question: 'What is the primary sodium hypochlorite (NaOCl) concentration range commonly used for root canal irrigation?',
    options: [
      '0.1% to 0.5%',
      '0.5% to 5.25%',
      '10% to 15%',
      '20% to 25%'
    ],
    correct: 1,
    explanation: 'Sodium hypochlorite is used at concentrations from 0.5% to 5.25% due to its potent tissue-dissolving and antimicrobial properties.'
  },
  {
    id: 3,
    category: 'Prosthodontics',
    question: 'In removable partial denture (RPD) design, what is the primary function of a minor connector?',
    options: [
      'To join components to the main framework/major connector',
      'To act as the main direct retainer',
      'To replace missing alveolar bone',
      'To provide aesthetic lip support'
    ],
    correct: 0,
    explanation: 'Minor connectors serve as the bridge linking individual components (such as rests or clasps) to the primary major connector.'
  },
  {
    id: 4,
    category: 'Prosthodontics',
    question: 'Which impression material exhibits reversible hydrocolloid characteristics?',
    options: [
      'Alginate',
      'Agar',
      'Polyether',
      'Addition Silicone'
    ],
    correct: 1,
    explanation: 'Agar is an organic reversible hydrocolloid that changes phase from gel to sol with heating, and back to gel upon cooling.'
  },
  {
    id: 5,
    category: 'Periodontics',
    question: 'What is the maximum normal clinical probing depth expected in a healthy gingival sulcus?',
    options: [
      '1 to 3 mm',
      '4 to 6 mm',
      '6 to 8 mm',
      '8 to 10 mm'
    ],
    correct: 0,
    explanation: 'A healthy gingival sulcus typically measures 1 to 3 mm when probed gently without bleeding.'
  },
  {
    id: 6,
    category: 'Oral Surgery',
    question: 'Which nerve block is primarily indicated to achieve anesthesia for mandibular molar extraction?',
    options: [
      'Inferior Alveolar Nerve Block (IANB)',
      'Greater Palatine Block',
      'Nasopalatine Block',
      'Infraorbital Nerve Block'
    ],
    correct: 0,
    explanation: 'An IANB anesthetizes all mandibular teeth on the injected quad side, along with the lower lip and anterior two-thirds of the tongue.'
  },
  {
    id: 7,
    category: 'Oral Surgery',
    question: 'What elevator principle is applied when using a straight elevator as a wedge between the tooth root and alveolar bone?',
    options: [
      'Lever principle',
      'Wheel and axle principle',
      'Wedge principle',
      'Pulley principle'
    ],
    correct: 2,
    explanation: 'Inserting a straight elevator wedged down the periodontal ligament space uses the wedge principle to expand bone and elevate the root.'
  }
];

// Quiz State
let activeQuestions = [];
let currentIdx = 0;
let score = 0;
let selectedCategory = 'All';
let quizMode = 'practice'; // 'practice' or 'osce'
let timerInterval = null;
let timeLeft = 45;

document.addEventListener('DOMContentLoaded', () => {
  setupCategoryFilters();
});

function setupCategoryFilters() {
  const pills = document.querySelectorAll('#categoryFilter .pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCategory = pill.dataset.category;
    });
  });
}

function selectMode(mode) {
  quizMode = mode;
  document.getElementById('modePractice').classList.toggle('selected', mode === 'practice');
  document.getElementById('modeOsce').classList.toggle('selected', mode === 'osce');
}

function startQuiz() {
  if (selectedCategory === 'All') {
    activeQuestions = [...questionBank];
  } else {
    activeQuestions = questionBank.filter(q => q.category === selectedCategory);
  }

  if (activeQuestions.length === 0) {
    alert('No questions available for this category.');
    return;
  }

  // Shuffle questions
  activeQuestions.sort(() => Math.random() - 0.5);

  currentIdx = 0;
  score = 0;

  document.getElementById('quizSetupScreen').style.display = 'none';
  document.getElementById('quizResultsScreen').classList.remove('active');
  document.getElementById('quizActiveScreen').classList.add('active');

  renderQuestion();
}

function renderQuestion() {
  clearInterval(timerInterval);
  const q = activeQuestions[currentIdx];

  document.getElementById('questionTracker').textContent = `Question ${currentIdx + 1} of ${activeQuestions.length} (${q.category})`;
  document.getElementById('questionText').textContent = q.question;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  const explanationBox = document.getElementById('explanationBox');
  explanationBox.classList.remove('active');

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = (currentIdx === activeQuestions.length - 1) ? 'Finish Quiz' : 'Next Question →';

  q.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${optText}</span>`;
    btn.onclick = () => handleOptionClick(index);
    optionsContainer.appendChild(btn);
  });

  const timerBadge = document.getElementById('timerDisplay');
  if (quizMode === 'osce') {
    timerBadge.style.display = 'block';
    startTimer();
  } else {
    timerBadge.style.display = 'none';
  }
}

function startTimer() {
  timeLeft = 45;
  const timerDisplay = document.getElementById('timerDisplay');
  timerDisplay.textContent = `⏳ 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏳ 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleOptionClick(-1); // Timeout
    }
  }, 1000);
}

function handleOptionClick(selectedIndex) {
  clearInterval(timerInterval);

  const q = activeQuestions[currentIdx];
  const optionButtons = document.querySelectorAll('.option-btn');

  optionButtons.forEach(btn => btn.style.pointerEvents = 'none');

  if (selectedIndex === q.correct) {
    score++;
    if (selectedIndex >= 0) optionButtons[selectedIndex].classList.add('correct');
  } else {
    if (selectedIndex >= 0) optionButtons[selectedIndex].classList.add('incorrect');
    optionButtons[q.correct].classList.add('correct');
  }

  if (quizMode === 'practice') {
    const explanationBox = document.getElementById('explanationBox');
    document.getElementById('explanationText').textContent = q.explanation;
    explanationBox.classList.add('active');
  }

  document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
  currentIdx++;
  if (currentIdx < activeQuestions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById('quizActiveScreen').classList.remove('active');
  document.getElementById('quizResultsScreen').classList.add('active');

  const percentage = Math.round((score / activeQuestions.length) * 100);
  document.getElementById('finalScore').textContent = `${score}/${activeQuestions.length}`;

  const feedbackText = document.getElementById('feedbackText');
  if (percentage >= 80) {
    feedbackText.textContent = `Excellent! ${percentage}% score demonstrates strong clinical readiness.`;
  } else if (percentage >= 50) {
    feedbackText.textContent = `Good job! ${percentage}% score. Review missed topics in the library.`;
  } else {
    feedbackText.textContent = `Keep practicing. ${percentage}% score. Revisit clinical guides to strengthen concepts.`;
  }

  saveQuizStats(score, activeQuestions.length);
}

function saveQuizStats(scoreCount, totalCount) {
  const history = JSON.parse(localStorage.getItem('dentassist_quiz_history') || '[]');
  history.push({
    date: new Date().toLocaleDateString('en-IN'),
    category: selectedCategory,
    score: scoreCount,
    total: totalCount,
    mode: quizMode
  });
  localStorage.setItem('dentassist_quiz_history', JSON.stringify(history));
}

function resetQuiz() {
  document.getElementById('quizResultsScreen').classList.remove('active');
  document.getElementById('quizSetupScreen').style.display = 'block';
}

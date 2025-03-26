
class QuizApp {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];

    // DOM Elements
    this.loadingEl = document.getElementById('loading');
    this.quizContentEl = document.getElementById('quiz-content');
    this.quizTitleEl = document.getElementById('quiz-title');
    this.questionTextContainerEl = document.getElementById('question-text-container');
    this.answersContainerEl = document.getElementById('answers-container');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.progressEl = document.getElementById('progress');
    this.resultsContainerEl = document.getElementById('results-container');
    this.resultsTextEl = document.getElementById('results-text');
    this.restartBtn = document.getElementById('restart-btn');

    this.initEventListeners();
    this.fetchQuizQuestions();
  }

  initEventListeners() {
    this.prevBtn.addEventListener('click', () => this.navigatePreviousQuestion());
    this.nextBtn.addEventListener('click', () => this.navigateNextQuestion());
    this.restartBtn.addEventListener('click', () => this.restartQuiz());
  }

  async fetchQuizQuestions() {
    try {
      const response = await fetch('/api/quiz');
      if (!response.ok) {
        throw new Error('Impossible de charger le quiz');
      }
      this.questions = await response.json();
      this.loadQuiz();
    } catch (error) {
      this.showError(error.message);
    }
  }

  loadQuiz() {
    this.loadingEl.classList.add('hidden');
    this.quizContentEl.classList.remove('hidden');
    this.quizTitleEl.textContent = 'Auto-Diagnostic des Compétences Technologiques';
    this.updateQuestion();
  }

  updateQuestion() {
    const question = this.questions[this.currentQuestionIndex];

    // Clear previous question content
    this.questionTextContainerEl.innerHTML = '';
    this.answersContainerEl.innerHTML = '';

    // Render question based on type
    if (question.type === 'text') {
      const questionTextEl = document.createElement('h2');
      questionTextEl.id = 'question-text';
      questionTextEl.classList.add('text-xl', 'font-semibold', 'mb-4');
      questionTextEl.textContent = question.text;
      this.questionTextContainerEl.appendChild(questionTextEl);
    } else if (question.type === 'html') {
      this.questionTextContainerEl.innerHTML = question.text;
    }

    // Render answers based on type
    if (question.answerType === 'choices') {
      question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.textContent = answer.text;
        const colors = this.userAnswers[this.currentQuestionIndex] === index
          ? ['bg-blue-100', 'border-blue-300']
          : ['bg-white', 'border-gray-200']
        answerBtn.classList.add(
          'w-full', 'text-left', 'p-4', 'rounded-lg', 'border',
          'hover:bg-blue-50', 'transition', 'text-gray-700', colors[0], colors[1]
        );

        answerBtn.addEventListener('click', () => {
          this.setCurrentAnswer(index);
          this.updateQuestion()
        });

        this.answersContainerEl.appendChild(answerBtn);
      });
    } else if (question.answerType === 'text') {
      const textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.placeholder = 'Votre réponse';
      textInput.classList.add(
        'w-full', 'p-3', 'border', 'rounded-lg',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'
      );
      textInput.value = this.userAnswers[this.currentQuestionIndex] || '';

      textInput.addEventListener('input', (e) => {
        this.setCurrentAnswer(e.target.value)
      });

      this.answersContainerEl.appendChild(textInput);
    } else if (question.answerType === 'number') {
      const numberInput = document.createElement('input');
      numberInput.type = 'number';
      numberInput.placeholder = 'Entrez un nombre';
      numberInput.classList.add(
        'w-full', 'p-3', 'border', 'rounded-lg',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'
      );
      numberInput.value = this.userAnswers[this.currentQuestionIndex] || '';

      numberInput.addEventListener('input', (e) => {
        this.setCurrentAnswer(Number(e.target.value));
      });

      this.answersContainerEl.appendChild(numberInput);
    }

    // Update navigation
    this.prevBtn.disabled = this.currentQuestionIndex === 0;
    this.prevBtn.classList.toggle('opacity-50', this.currentQuestionIndex === 0);

    this.updateProgress();
  }

  setCurrentAnswer(answer) {
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  navigateNextQuestion() {
    const newIndex = this.currentQuestionIndex + 1;

    if (newIndex < this.questions.length) {
      this.currentQuestionIndex = newIndex;
      this.updateQuestion();
    } else {
      this.showResults();
    }
  }

  navigatePreviousQuestion() {
    const newIndex = this.currentQuestionIndex - 1;

    if (newIndex >= 0) {
      this.currentQuestionIndex = newIndex;
      this.updateQuestion();
    }
  }

  updateProgress() {
    const totalQuestions = this.questions.length;
    this.progressEl.textContent = `${this.currentQuestionIndex + 1} sur ${totalQuestions}`;

    // Optionally, update next/prev button behavior based on total questions
    this.nextBtn.textContent = this.currentQuestionIndex === totalQuestions - 1
      ? 'Terminer'
      : 'Suivant';
  }

  showResults() {
    // Hide question view, show results
    document.getElementById('question-container').classList.add('hidden');
    this.resultsContainerEl.classList.remove('hidden');

    // TODO: Implement actual result calculation
    this.resultsTextEl.textContent = 'Vos résultats seront calculés après l\'envoi des réponses au backend.';
  }

  restartQuiz() {
    // Reset quiz state
    this.currentQuestionIndex = 0;
    this.userAnswers = [];

    // Hide results, show questions
    this.resultsContainerEl.classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');

    this.updateQuestion();
  }

  showError(message) {
    this.loadingEl.innerHTML = `
                    <p class="text-red-600 text-xl">${message}</p>
                    <button onclick="window.location.reload()" class="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded">
                        Réessayer
                    </button>
                `;
  }
}

// Initialize the quiz when the page loads
new QuizApp();

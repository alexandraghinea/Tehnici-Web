

document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const submitButton = document.getElementById('submit-btn');
    const scoreElement = document.querySelector('.score');
    const winMessageElements = document.getElementsByClassName('win-message');
    const winMessageElement = winMessageElements[0]; // deoarece getElementsByClassName returnează o colecție, trebuie să accesezi elementul dorit prin index
  
  const loseMessageElements = document.getElementsByClassName('lose-message');
  const loseMessageElement = loseMessageElements[0]; 
  
  
    let currentQuestionIndex = 0;
    let score = 0;
    let consecutiveCorrectAnswers = 0;
  
    const questions = [
      {
        question: 'Care este cel mai mare continent din lume?',
        options: ['Asia', 'Africa', 'America de Nord', 'Europa'],
        correctAnswerIndex: 0
      },
      {
        question: 'Care este cel mai mic continent din lume?',
        options: ['Asia', 'Africa', 'Australia', 'Europa'],
        correctAnswerIndex: 2
      },
      {
        question: 'Care continent se află în întregime în emisfera sudică?',
        options: ['Europa', 'America de Nord', 'Africa', 'Australia'],
        correctAnswerIndex: 3
      },
      {
        question: 'Care este cel mai populat continent din lume?',
        options: ['Europa', 'Asia', 'America de Sud', 'Africa'],
        correctAnswerIndex: 1
      },
      {
        question: 'Care continent este cunoscut ca "Leagănul Civilizației"?',
        options: ['America de Sud', 'Europa', 'Asia', 'Africa'],
        correctAnswerIndex: 2
      }
    ];
  
    function initializeGame() {
      currentQuestionIndex = 0;
      score = 0;
      consecutiveCorrectAnswers = 0;
      updateQuestion();
      updateScore();
      hideWinMessage();
      hideLoseMessage();
    }
  
    function updateQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      optionsElement.innerHTML = '';
  
      currentQuestion.options.forEach(function(option, index) {
        const optionElement = document.createElement('label');
        optionElement.classList.add('option');
        optionElement.textContent = option;
  
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'answer';
        radioButton.value = index;
        optionElement.appendChild(radioButton);
  
        optionsElement.appendChild(optionElement);
      });
    }
  
    function handleAnswer() {
      const selectedOption = document.querySelector('input[name="answer"]:checked');
  
      if (selectedOption) {
        const selectedOptionIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];
  
        if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
          score++;
          consecutiveCorrectAnswers++;
  
          if (consecutiveCorrectAnswers === 5) {
            showWinMessage();
            disableOptions();
            return; // jocul se opreste daca ai 5 raspunsuri corecte
          }
        } else {
          showLoseMessage();
          disableOptions();
          return; // sau se opreste cand ai gresit un raspuns
        }
  
        currentQuestionIndex++;
        updateQuestion();
        updateScore();
      }
    }
  
    function updateScore() {
      scoreElement.textContent = 'Scor: ' + score;
    }
  
    function showWinMessage() {
      winMessageElement.textContent = 'Felicitări! Ai câștigat o călătorie gratuită! Contactează-ne prin formularul de contact. Îți mulțumim!';
      winMessageElement.style.display = 'block';
    }
  
    function hideWinMessage() {
      winMessageElement.style.display = 'none';
    }
  
    function showLoseMessage() {
      loseMessageElement.textContent = 'Ai răspuns greșit! Jocul s-a încheiat.';
      loseMessageElement.style.display = 'block';
    }
  
    function hideLoseMessage() {
      loseMessageElement.style.display = 'none';
    }
  
    function disableOptions() {
      const options = document.querySelectorAll('input[name="answer"]');
      options.forEach(function(option) {
        option.disabled = true;
      });
    }
  
    submitButton.addEventListener('click', handleAnswer);
  
    // de fiecare data cand se va incarca pagina se va da restart la joc
    
  const pageWidth = window.innerWidth;
  const element = document.querySelector('.containerDespre');
  const computedStyles = window.getComputedStyle(element);
  const borderWidth = computedStyles.getPropertyValue('border-width');
  
  element.style.borderWidth = borderWidth; 
  
    initializeGame();
  });
  
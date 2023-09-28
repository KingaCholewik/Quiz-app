const questionData = [
  ['Które z tych imion jest brzydkie?', ['Kunegunda', 'Helga', 'Wanda'], 1],
  ['Z kim graniczy Polska?', ['z Madagaskarem', 'z Litwą'], 1],
];

class Question {
  #title;
  #answers;
  #correctAnswer;

  constructor(title, answers, correctAnswer) {
    this.#title = title;
    this.#answers = answers;
    this.#correctAnswer = correctAnswer;
  }

  get title() {
    return this.#title;
  }

  get answers() {
    return this.#answers;
  }

  get correctAnswer() {
    return this.#correctAnswer;
  }
}

class Quiz {
  #questions;
  #currentQuestionIndex;
  #score;

  constructor(questions) {
    this.#questions = questions.map(
      (question) => new Question(question[0], question[1], question[2])
    );
    this.#currentQuestionIndex = 0;
    this.#score = 0;
  }

  displayQuestion() {
    console.log(this.#questions.length);
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    answersElement.textContent = '';
    questionElement.textContent =
      this.#questions[this.#currentQuestionIndex].title;
    // console.log(questionElement[1].title);
    this.#questions[this.#currentQuestionIndex].answers.forEach(
      (answer, index) => {
        const answerElement = document.createElement('li');
        answerElement.innerHTML = `<label> <input type="radio" value=${index} name="answer"> ${answer}</label>`;
        answersElement.appendChild(answerElement);
      }
    );
  }

  nextQuestion() {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );

    if (selectedAnswer) {
      const answer = parseInt(selectedAnswer.value);
      if (
        answer === this.#questions[this.#currentQuestionIndex].correctAnswer
      ) {
        this.#score++;
      } else {
        alert('zła odpowiedź');
      }
      this.#currentQuestionIndex++;
      // console.log(this.#questions.length);
      if (this.#currentQuestionIndex < this.#questions.length) {
        this.displayQuestion();
      } else {
        this.dispalyResult();
      }
    } else {
      alert('nie udzieliłeś odpowiedzi');
    }
  }
  dispalyResult() {
    const resultElement = document.querySelector('.result');
    resultElement.textContent = `Twój wynik ${this.#score}/${
      this.#questions.length
    }`;
  }
}

const quiz = new Quiz(questionData);
quiz.displayQuestion();

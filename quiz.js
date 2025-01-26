function submitQuiz() {
  let score = 0;
  let totalQuestions = 10; // Total number of questions in the easy category
  let answers = {
    question1: "A", 
    question2: "A", 
    question3: "A", 
    question4: "A", 
    question5: "A",
    question6: "A",
    question7: "A",
    question8: "A",
    question9: "A",
    question10: "A",
  };

  for (let i = 1; i <= totalQuestions; i++) {
    let userAnswer = document.querySelector(`input[name="question${i}"]:checked`);
    if (userAnswer && userAnswer.value === answers[`question${i}`]) {
      score++;
    }
  }

  document.getElementById('quiz-result').innerText = `Your score: ${score} out of ${totalQuestions}`;
  }

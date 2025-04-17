const questions = [
    {
      question: "What quality do you value most?",
      options: {
        a: { text: "Wisdom", philosopher: "Socrates" },
        b: { text: "Individual freedom", philosopher: "Nietzsche" },
        c: { text: "Harmony", philosopher: "Confucius" },
        d: { text: "Equality", philosopher: "Beauvoir" },
      },
    },
    {
      question: "Which subject interests you most?",
      options: {
        a: { text: "Ethics", philosopher: "Socrates" },
        b: { text: "Will to Power", philosopher: "Nietzsche" },
        c: { text: "Social order", philosopher: "Confucius" },
        d: { text: "Gender studies", philosopher: "Beauvoir" },
      },
    },
    {
      question: "How do you prefer to learn?",
      options: {
        a: { text: "Through dialogue", philosopher: "Socrates" },
        b: { text: "Through introspection", philosopher: "Nietzsche" },
        c: { text: "Through tradition", philosopher: "Confucius" },
        d: { text: "Through lived experience", philosopher: "Beauvoir" },
      },
    },
    {
      question: "What is the purpose of life?",
      options: {
        a: { text: "To seek truth", philosopher: "Socrates" },
        b: { text: "To create oneself", philosopher: "Nietzsche" },
        c: { text: "To fulfil one’s role", philosopher: "Confucius" },
        d: { text: "To achieve freedom", philosopher: "Beauvoir" },
      },
    },
    {
      question: "Which statement resonates most?",
      options: {
        a: { text: "‘I know that I know nothing.’", philosopher: "Socrates" },
        b: { text: "‘Become who you are.’", philosopher: "Nietzsche" },
        c: { text: "‘Respect is the foundation of society.’", philosopher: "Confucius" },
        d: { text: "‘One is not born, but rather becomes, woman.’", philosopher: "Beauvoir" },
      },
    },
  ];
  
  let currentQuestion = 0;
  const scores = { Socrates: 0, Nietzsche: 0, Confucius: 0, Beauvoir: 0 };
  
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  const questionText = document.getElementById("question-text");
  const optionsForm = document.getElementById("options-form");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const resultText = document.getElementById("result-text");
  const restartBtn = document.getElementById("restart-btn");
  
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", handleNext);
  restartBtn.addEventListener("click", restartQuiz);
  
  function startQuiz() {
    intro.classList.add("hidden");
    quiz.classList.remove("hidden");
    showQuestion();
  }
  
  function showQuestion() {
    optionsForm.innerHTML = "";
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    Object.entries(q.options).forEach(([key, opt]) => {
      const label = document.createElement("label");
      label.className = "block bg-gray-200 p-2 rounded hover:bg-gray-300 cursor-pointer";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "option";
      input.value = key;
      input.className = "mr-2";
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt.text));
      optionsForm.appendChild(label);
    });
  }
  
  function handleNext() {
    const sel = document.querySelector('input[name="option"]:checked');
    if (!sel) return;
    const phil = questions[currentQuestion].options[sel.value].philosopher;
    scores[phil]++;
    currentQuestion++;
    if (currentQuestion < questions.length) showQuestion();
    else showResult();
  }
  
  function showResult() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
    const winner = Object.keys(scores).reduce((a,b) => scores[a]>scores[b]?a:b);
    resultText.textContent = winner;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    for (let k in scores) scores[k]=0;
    result.classList.add("hidden");
    intro.classList.remove("hidden");
  }
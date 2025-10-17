// ===================================
// Quiz Data and Logic
// ===================================

const quizQuestions = [
  {
    id: 1,
    question: "Como você se sente em relação ao seu autoconhecimento atual?",
    reflection: "Esta pergunta revela em qual estágio da jornada interior você se encontra.",
    options: [
      { text: "Estou apenas começando a me questionar", value: "despertar" },
      { text: "Reconheço minhas contradições mas luto para aceitá-las", value: "confronto" },
      { text: "Estou refletindo profundamente sobre meus padrões", value: "integracao" },
      { text: "Sinto que compreendo e aceito quem sou", value: "renascimento" },
    ],
  },
  {
    id: 2,
    question: "Quando enfrenta um desafio emocional, você geralmente:",
    reflection: "Sua resposta mostra como você lida com as tempestades internas.",
    options: [
      { text: "Fico confuso e busco respostas externas", value: "despertar" },
      { text: "Sinto tensão interna e resistência", value: "confronto" },
      { text: "Observo meus sentimentos com curiosidade", value: "integracao" },
      { text: "Aceito e transformo a experiência", value: "renascimento" },
    ],
  },
  {
    id: 3,
    question: "Como você lida com suas sombras (aspectos que não gosta em si)?",
    reflection: "As sombras são professoras disfarçadas. Como você as recebe?",
    options: [
      { text: "Ainda estou descobrindo que elas existem", value: "despertar" },
      { text: "Reconheço mas tenho dificuldade em aceitar", value: "confronto" },
      { text: "Estou aprendendo a integrá-las", value: "integracao" },
      { text: "Transformei muitas delas em forças", value: "renascimento" },
    ],
  },
  {
    id: 4,
    question: "Sua relação com mudanças pessoais é:",
    reflection: "Mudança é a única constante. Como você dança com ela?",
    options: [
      { text: "Assustadora mas intrigante", value: "despertar" },
      { text: "Necessária mas dolorosa", value: "confronto" },
      { text: "Um processo natural de crescimento", value: "integracao" },
      { text: "Uma oportunidade bem-vinda", value: "renascimento" },
    ],
  },
  {
    id: 5,
    question: "Quando pensa em 'o quarto' como metáfora do seu mundo interior:",
    reflection: "O quarto é prisão ou santuário? Sua perspectiva revela muito.",
    options: [
      { text: "Acabei de descobrir que existe uma porta", value: "despertar" },
      { text: "Estou dentro mas me sinto preso", value: "confronto" },
      { text: "Estou explorando cada canto com atenção", value: "integracao" },
      { text: "É meu santuário, não minha prisão", value: "renascimento" },
    ],
  },
  {
    id: 6,
    question: "Sua autenticidade no dia a dia é:",
    reflection: "Ser autêntico é a coragem de ser vulnerável e verdadeiro.",
    options: [
      { text: "Ainda estou descobrindo quem sou de verdade", value: "despertar" },
      { text: "Sei quem sou mas tenho medo de mostrar", value: "confronto" },
      { text: "Estou praticando ser mais autêntico", value: "integracao" },
      { text: "Vivo alinhado com minha essência", value: "renascimento" },
    ],
  },
  {
    id: 7,
    question: "Como você se relaciona com suas emoções difíceis?",
    reflection: "Emoções são mensageiras. Você as escuta ou as silencia?",
    options: [
      { text: "Tento evitá-las ou não as compreendo bem", value: "despertar" },
      { text: "Sinto-as intensamente mas não sei o que fazer", value: "confronto" },
      { text: "Estou aprendendo a acolhê-las", value: "integracao" },
      { text: "Elas são mensageiras valiosas", value: "renascimento" },
    ],
  },
  {
    id: 8,
    question: "Seu propósito de vida parece:",
    reflection: "O propósito não é encontrado, é construído a cada escolha.",
    options: [
      { text: "Um mistério que estou começando a explorar", value: "despertar" },
      { text: "Algo que vislumbro mas não consigo alcançar", value: "confronto" },
      { text: "Está se tornando mais claro gradualmente", value: "integracao" },
      { text: "Claro e guia minhas escolhas", value: "renascimento" },
    ],
  },
]

const quizResults = {
  despertar: {
    title: "O Despertar",
    character: "Ana - A Buscadora",
    icon: "sunrise",
    description:
      "Você está no início de uma jornada extraordinária. Como Ana, você começou a perceber que há muito mais em você do que sempre acreditou. Este é o momento do questionamento, da curiosidade e da abertura para o desconhecido. Você está tocando a maçaneta da porta do quarto pela primeira vez.",
    deepInsight:
      "O despertar não é um evento único, mas um convite contínuo. Cada pergunta que você faz a si mesmo é uma semente plantada no solo fértil da consciência. Não tenha pressa — a jornada é tão importante quanto o destino.",
    advice:
      "Continue explorando com coragem. Permita-se fazer perguntas difíceis e busque experiências que desafiem sua zona de conforto. Leia, converse, reflita. Cada passo nesta fase é uma semente plantada para seu crescimento futuro.",
    nextSteps: [
      "Comece um diário de autoconhecimento — escreva sem filtros",
      "Questione suas crenças limitantes: 'Por que acredito nisso?'",
      "Busque novas experiências que desafiem sua perspectiva",
      "Pratique a auto-observação sem julgamento — apenas observe",
    ],
  },
  confronto: {
    title: "O Confronto",
    character: "Bruno - O Conflituoso",
    icon: "lightning",
    description:
      "Você está na fase mais desafiadora e corajosa da jornada. Como Bruno, você reconhece suas contradições internas e está enfrentando aspectos de si mesmo que antes evitava. Esta tensão é sinal de crescimento profundo. Você está dentro do quarto, olhando para os espelhos que refletem suas verdades mais difíceis.",
    deepInsight:
      "O confronto é onde a transformação real acontece. É desconfortável porque você está desmantelando versões antigas de si mesmo para dar espaço ao novo. A dor que você sente não é de destruição, mas de renascimento.",
    advice:
      "Seja gentil consigo mesmo neste processo. O confronto não é sobre se punir, mas sobre se conhecer completamente. Aceite que você é humano, complexo e em constante evolução. A integração virá com o tempo.",
    nextSteps: [
      "Pratique a autocompaixão diariamente — trate-se como trataria um amigo querido",
      "Identifique e acolha suas sombras — elas têm lições valiosas",
      "Busque apoio terapêutico ou de um mentor — você não precisa fazer isso sozinho",
      "Transforme autocrítica em auto-observação curiosa",
    ],
  },
  integracao: {
    title: "A Integração",
    character: "Clara - A Contemplativa",
    icon: "puzzle",
    description:
      "Você está em um momento de profunda sabedoria. Como Clara, você compreende que todas as partes de você — luz e sombra — formam um todo integrado. Está aprendendo a transformar suas feridas em força e suas fraquezas em sabedoria. O quarto agora é um espaço de contemplação e integração.",
    deepInsight:
      "A integração é a arte de abraçar todas as suas partes sem julgamento. Você percebe que não precisa ser perfeito para ser completo. Cada experiência, cada erro, cada vitória — tudo contribui para a obra-prima que você está se tornando.",
    advice:
      "Continue praticando a aceitação radical de si mesmo. Use suas experiências passadas como professoras. Compartilhe sua jornada com outros, pois sua história pode iluminar o caminho de alguém.",
    nextSteps: [
      "Pratique meditação e mindfulness — cultive presença consciente",
      "Identifique padrões e transforme-os em sabedoria",
      "Cultive relacionamentos autênticos — seja vulnerável",
      "Encontre propósito em suas experiências passadas",
    ],
  },
  renascimento: {
    title: "O Renascimento",
    character: "Daniel - O Transformado",
    icon: "stars",
    description:
      "Você alcançou um nível profundo de autoconhecimento e autenticidade. Como Daniel, você compreende que o quarto nunca foi uma prisão, mas um espaço sagrado de transformação. Vive alinhado com sua essência e inspira outros em suas jornadas. A porta está aberta — você pode entrar e sair livremente.",
    deepInsight:
      "O renascimento não é o fim da jornada, mas o início de uma nova espiral de crescimento. Você descobriu que a liberdade não está em escapar de si mesmo, mas em se tornar plenamente quem você é. Agora você é o guardião do seu próprio quarto.",
    advice:
      "Continue evoluindo e aprofundando sua consciência. Compartilhe sua sabedoria com generosidade. Lembre-se de que a jornada nunca termina — cada fim é um novo começo. Seja farol para outros viajantes.",
    nextSteps: [
      "Mentore outros em suas jornadas — sua luz pode iluminar caminhos",
      "Viva com propósito e autenticidade — seja exemplo vivo",
      "Continue se desafiando e crescendo — a evolução é infinita",
      "Pratique gratidão pela sua transformação — celebre sua jornada",
    ],
  },
}

let currentQuestionIndex = 0
let userAnswers = []

function initQuiz() {
  currentQuestionIndex = 0
  userAnswers = []
  displayQuestion()
  updateProgress()

  // Anunciar para leitores de tela
  announceToScreenReader("Quiz iniciado. Pergunta 1 de 8.")
}

function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex]
  const quizContainer = document.getElementById("quizContainer")

  quizContainer.innerHTML = `
    <div class="quiz-question-card" data-aos="fade-up">
      <div class="question-number-badge" aria-label="Pergunta ${question.id} de ${quizQuestions.length}">${question.id}</div>
      <h3 class="question-text-large">${question.question}</h3>
      ${question.reflection ? `<p class="question-reflection"><i class="bi bi-lightbulb me-2"></i>${question.reflection}</p>` : ""}
      <div class="quiz-options" role="radiogroup" aria-labelledby="question-${question.id}">
        ${question.options
          .map(
            (option, index) => `
          <div class="quiz-option-card">
            <input 
              type="radio" 
              id="option${index}" 
              name="question${question.id}" 
              value="${option.value}"
              ${userAnswers[currentQuestionIndex] === option.value ? "checked" : ""}
              aria-label="${option.text}"
            >
            <label class="quiz-option-label" for="option${index}">
              ${option.text}
            </label>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `

  document.getElementById("quizNavigation").style.display = "flex"
  updateNavigationButtons()

  const options = quizContainer.querySelectorAll('input[type="radio"]')
  options.forEach((option) => {
    option.addEventListener("change", handleOptionSelect)
  })

  // Anunciar pergunta para leitores de tela
  announceToScreenReader(`Pergunta ${question.id}: ${question.question}`)
}

function handleOptionSelect(e) {
  userAnswers[currentQuestionIndex] = e.target.value
  updateNavigationButtons()

  // Feedback visual
  const label = e.target.nextElementSibling
  label.style.transform = "scale(1.02)"
  setTimeout(() => {
    label.style.transform = "scale(1)"
  }, 200)

  announceToScreenReader("Resposta selecionada")
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (currentQuestionIndex === 0) {
    prevBtn.style.display = "none"
  } else {
    prevBtn.style.display = "flex"
  }

  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1
  const hasAnswer = userAnswers[currentQuestionIndex] !== undefined

  if (isLastQuestion) {
    nextBtn.innerHTML = `
      Ver Resultado
      <i class="bi bi-check-circle ms-2"></i>
    `
  } else {
    nextBtn.innerHTML = `
      Próxima
      <i class="bi bi-arrow-right ms-2"></i>
    `
  }

  nextBtn.disabled = !hasAnswer
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    displayQuestion()
    updateProgress()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

function nextQuestion() {
  const hasAnswer = userAnswers[currentQuestionIndex] !== undefined

  if (!hasAnswer) {
    alert("Por favor, selecione uma resposta antes de continuar.")
    return
  }

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++
    displayQuestion()
    updateProgress()
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    showResults()
  }
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1
  document.getElementById("progressPercent").textContent = Math.round(progress)

  const progressBar = document.getElementById("progressBar")
  progressBar.style.width = progress + "%"
  progressBar.setAttribute("aria-valuenow", Math.round(progress))
}

function calculateResult() {
  const counts = {}

  userAnswers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1
  })

  let maxCount = 0
  let result = "despertar"

  for (const [key, value] of Object.entries(counts)) {
    if (value > maxCount) {
      maxCount = value
      result = key
    }
  }

  return result
}

function showResults() {
  const resultType = calculateResult()
  const result = quizResults[resultType]

  const quizContainer = document.getElementById("quizContainer")
  const quizNavigation = document.getElementById("quizNavigation")
  const resultsContainer = document.getElementById("resultsContainer")

  quizContainer.style.display = "none"
  quizNavigation.style.display = "none"

  resultsContainer.innerHTML = `
    <div class="result-card" data-aos="zoom-in">
      <div class="result-icon">
        <i class="bi bi-${result.icon}"></i>
      </div>
      <h2 class="result-title">${result.title}</h2>
      <p class="result-character">${result.character}</p>
      <p class="result-description">${result.description}</p>
      
      <div class="result-insight">
        <h4><i class="bi bi-stars me-2"></i>Insight Profundo</h4>
        <p>${result.deepInsight}</p>
      </div>
      
      <div class="result-advice">
        <strong><i class="bi bi-lightbulb me-2"></i>Orientação para sua jornada:</strong>
        <p class="mb-0">${result.advice}</p>
      </div>
      
      <div class="mb-4">
        <h4 class="mb-3"><i class="bi bi-list-check me-2"></i>Próximos Passos:</h4>
        <ul class="stage-list">
          ${result.nextSteps.map((step) => `<li>${step}</li>`).join("")}
        </ul>
      </div>
      
      <div class="result-actions">
        <button class="btn btn-outline-primary" onclick="restartQuiz()">
          <i class="bi bi-arrow-clockwise me-2"></i>
          Refazer Quiz
        </button>
        <a href="a-jornada.html" class="btn btn-primary">
          <i class="bi bi-book me-2"></i>
          Explorar Jornada
        </a>
        <a href="conexao.html" class="btn btn-primary">
          <i class="bi bi-share me-2"></i>
          Compartilhar
        </a>
      </div>
    </div>
  `

  resultsContainer.style.display = "block"
  window.scrollTo({ top: 0, behavior: "smooth" })

  announceToScreenReader(`Resultado: ${result.title}. ${result.description}`)
}

function restartQuiz() {
  document.getElementById("resultsContainer").style.display = "none"
  document.getElementById("quizContainer").style.display = "block"
  initQuiz()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function announceToScreenReader(message) {
  const announcement = document.createElement("div")
  announcement.setAttribute("role", "status")
  announcement.setAttribute("aria-live", "polite")
  announcement.className = "sr-only"
  announcement.textContent = message
  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("quizContainer")) {
    initQuiz()
  }
})

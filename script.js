// ===================================
// Theme Toggle Functionality
// ===================================

const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

// Update icon based on current theme
function updateThemeIcon() {
  const icon = themeToggle.querySelector("i")
  const currentTheme = body.getAttribute("data-theme")

  if (currentTheme === "dark") {
    icon.classList.remove("bi-moon-fill")
    icon.classList.add("bi-sun-fill")
  } else {
    icon.classList.remove("bi-sun-fill")
    icon.classList.add("bi-moon-fill")
  }
}

// Initialize icon
updateThemeIcon()

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon()
})

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById("mainNav")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ===================================
// Active Navigation Link
// ===================================

const navLinks = document.querySelectorAll(".nav-link")
const currentPage = window.location.pathname.split("/").pop() || "index.html"

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href")
  if (linkPage === currentPage) {
    link.classList.add("active")
  } else {
    link.classList.remove("active")
  }
})

// Declare AOS variable before using it
const AOS = window.AOS

// ===================================
// AOS (Animate On Scroll) Initialization
// ===================================

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===================================
// Mobile Menu Close on Link Click
// ===================================

const navbarCollapse = document.querySelector(".navbar-collapse")
const navbarToggler = document.querySelector(".navbar-toggler")

if (navbarCollapse && navbarToggler) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })
}

// ===================================
// Form Validation (for contact page)
// ===================================

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Basic validation
    if (!name || !email || !message) {
      showAlert("Por favor, preencha todos os campos.", "danger")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showAlert("Por favor, insira um email válido.", "danger")
      return
    }

    // Success message
    showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
    contactForm.reset()
  })
}

// ===================================
// Quiz Functionality (for quiz page)
// ===================================

const quizForm = document.getElementById("quizForm")
const quizResult = document.getElementById("quizResult")

if (quizForm) {
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get all selected answers
    const answers = []
    const questions = quizForm.querySelectorAll(".quiz-question")

    questions.forEach((question, index) => {
      const selected = question.querySelector('input[type="radio"]:checked')
      if (selected) {
        answers.push(selected.value)
      }
    })

    // Check if all questions are answered
    if (answers.length < questions.length) {
      showAlert("Por favor, responda todas as perguntas.", "warning")
      return
    }

    // Calculate result
    const result = calculateQuizResult(answers)
    displayQuizResult(result)

    // Scroll to result
    quizResult.scrollIntoView({ behavior: "smooth", block: "center" })
  })
}

function calculateQuizResult(answers) {
  // Count occurrences of each answer type
  const counts = {}
  answers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1
  })

  // Find the most common answer
  let maxCount = 0
  let result = ""

  for (const [key, value] of Object.entries(counts)) {
    if (value > maxCount) {
      maxCount = value
      result = key
    }
  }

  return result
}

function displayQuizResult(result) {
  const results = {
    descoberta: {
      title: "Fase da Descoberta",
      character: "Ana",
      description:
        "Você está no início de sua jornada de autoconhecimento. Como Ana, você está começando a questionar suas crenças e padrões, abrindo-se para novas possibilidades de compreensão sobre si mesmo.",
      advice:
        "Continue explorando com curiosidade e abertura. Permita-se fazer perguntas difíceis e busque experiências que desafiem sua zona de conforto.",
      color: "primary",
    },
    conflito: {
      title: "Fase do Conflito",
      character: "Bruno",
      description:
        "Você está enfrentando tensões internas significativas. Como Bruno, você reconhece contradições em sua vida e está lutando para reconciliar diferentes aspectos de sua identidade.",
      advice:
        "Aceite que o conflito é parte natural do crescimento. Use este momento para integrar diferentes partes de si mesmo, sem julgamento.",
      color: "warning",
    },
    reflexao: {
      title: "Fase da Reflexão",
      character: "Clara",
      description:
        "Você está em um momento de profunda contemplação. Como Clara, você está processando experiências passadas e buscando compreender padrões mais profundos em sua vida.",
      advice:
        "Dedique tempo para a introspecção. Journaling, meditação e conversas profundas podem ser ferramentas valiosas neste momento.",
      color: "info",
    },
    transformacao: {
      title: "Fase da Transformação",
      character: "Daniel",
      description:
        "Você está experimentando mudanças significativas em sua consciência. Como Daniel, você está integrando insights e começando a viver de forma mais autêntica e alinhada com sua verdadeira essência.",
      advice:
        "Continue praticando a autenticidade. Compartilhe suas descobertas com outros e permita que sua transformação inspire aqueles ao seu redor.",
      color: "success",
    },
  }

  const resultData = results[result] || results["descoberta"]

  quizResult.innerHTML = `
        <div class="alert alert-${resultData.color} border-0 shadow-sm" role="alert">
            <h3 class="alert-heading mb-3">
                <i class="bi bi-star-fill me-2"></i>
                ${resultData.title}
            </h3>
            <p class="mb-3"><strong>Personagem:</strong> ${resultData.character}</p>
            <p class="mb-3">${resultData.description}</p>
            <hr>
            <p class="mb-0"><strong>Conselho:</strong> ${resultData.advice}</p>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-outline-primary" onclick="location.reload()">
                Refazer Quiz
            </button>
            <a href="conexao.html" class="btn btn-primary ms-2">
                Compartilhar Resultado
            </a>
        </div>
    `

  quizResult.style.display = "block"
}

// ===================================
// Alert Helper Function
// ===================================

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`
  alertDiv.style.zIndex = "9999"
  alertDiv.style.minWidth = "300px"
  alertDiv.setAttribute("role", "alert")
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `

  document.body.appendChild(alertDiv)

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

// ===================================
// Timeline Interaction (for O Quarto page)
// ===================================

const timelineItems = document.querySelectorAll(".timeline-item")

if (timelineItems.length > 0) {
  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      timelineItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")
    })
  })
}

// ===================================
// Progress Bar Animation (for A Jornada page)
// ===================================

const progressBars = document.querySelectorAll(".progress-bar")

if (progressBars.length > 0) {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const targetWidth = progressBar.getAttribute("aria-valuenow")
        progressBar.style.width = targetWidth + "%"
      }
    })
  }, observerOptions)

  progressBars.forEach((bar) => {
    bar.style.width = "0%"
    bar.style.transition = "width 1s ease-in-out"
    progressObserver.observe(bar)
  })
}

// --- Garantir scroll no carregamento (remove bloqueios comuns) ---
window.addEventListener('load', function () {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
});

// remover event listeners que podem ter sido adicionados sem passive:true
try {
    // Não há garantia que existam, mas tentamos limpar hooks comuns
    document.removeEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
} catch (e) {
    // noop
}

// --- Inicializa arrasto por Pointer API para elementos do quebra-cabeça ---
(function initPuzzleTouchDrag() {
    const container = document.querySelector('.puzzle-container');
    if (!container) return;

    let activePiece = null;
    let startX = 0, startY = 0;
    let pieceStartLeft = 0, pieceStartTop = 0;

    function onPointerDown(e) {
        // aceitar apenas botões primários / toques
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        activePiece = e.currentTarget;
        // marcar container para desabilitar o scroll durante o drag
        container.classList.add('dragging');

        // capturar ponteiro para receber move/up mesmo fora do elemento
        activePiece.setPointerCapture(e.pointerId);

        const rect = activePiece.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        // posição atual da peça (assumindo left/top em px)
        pieceStartLeft = parseFloat(activePiece.style.left || rect.left + window.scrollX);
        pieceStartTop = parseFloat(activePiece.style.top || rect.top + window.scrollY);

        // prevenir seleção nativa
        e.preventDefault();
    }

    function onPointerMove(e) {
        if (!activePiece) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        // mover a peça (atualize conforme sua lógica de posicionamento)
        activePiece.style.left = (pieceStartLeft + dx) + 'px';
        activePiece.style.top  = (pieceStartTop + dy) + 'px';
    }

    function onPointerUp(e) {
        if (!activePiece) return;
        try { activePiece.releasePointerCapture(e.pointerId); } catch (err) {}
        // remover estado dragging para reativar scroll
        container.classList.remove('dragging');
        activePiece = null;

        // aqui você pode disparar a validação de encaixe da peça, etc.
    }

    // conectar os listeners a todas as peças (classe .puzzle-piece)
    const pieces = container.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        piece.style.touchAction = 'none'; // garantir que o elemento receba pointer events
        piece.addEventListener('pointerdown', onPointerDown);
        piece.addEventListener('pointermove', onPointerMove);
        piece.addEventListener('pointerup', onPointerUp);
        piece.addEventListener('pointercancel', onPointerUp);
    });

    // Fallback para navegadores antigos: mapear touch -> pointer-like
    // (não sobrescreve se PointerEvents já existirem)
    if (!window.PointerEvent) {
        pieces.forEach(piece => {
            piece.addEventListener('touchstart', function (ev) {
                const touch = ev.changedTouches[0];
                ev.clientX = touch.clientX;
                ev.clientY = touch.clientY;
                onPointerDown(ev);
            }, { passive: false });

            piece.addEventListener('touchmove', function (ev) {
                const touch = ev.changedTouches[0];
                ev.clientX = touch.clientX;
                ev.clientY = touch.clientY;
                onPointerMove(ev);
            }, { passive: false });

            piece.addEventListener('touchend', function (ev) {
                const touch = ev.changedTouches[0] || ev;
                ev.clientX = touch ? touch.clientX : 0;
                ev.clientY = touch ? touch.clientY : 0;
                onPointerUp(ev);
            });
        });
    }
})();

// Garantir que não exista preventDefault em touchmove que bloqueie o scroll
(function () {
    // remover listener que possa ter sido adicionado por bibliotecas/experimentos
    document.removeEventListener('touchmove', preventDefault, { passive: false });
    function preventDefault(e) { e.preventDefault(); }

    // Forçar overflow auto no load (algumas libs adicionam classe modal-open)
    window.addEventListener('load', function () {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    });

    // garantir que collapse do navbar não bloqueie scroll
    var navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        navbarCollapse.addEventListener('hidden.bs.collapse', function () {
            document.body.style.overflow = 'auto';
        });
        navbarCollapse.addEventListener('shown.bs.collapse', function () {
            // permitir scroll do conteúdo quando o menu estiver aberto
            document.body.style.overflow = 'auto';
        });
    }
})();

/* ======= Timer do quebra-cabeça (com debug e force stop) ======= */
window._puzzleIntervals = window._puzzleIntervals || [];

let _puzzleTimerId = null;
let _puzzleStartAt = null;
let _puzzleElapsed = 0;
let _puzzleFinished = false;

function _formatTime(totalSeconds) {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
}

function startPuzzleTimer() {
    if (_puzzleFinished) {
        console.log('[puzzle] não inicia: já finalizado');
        return;
    }
    if (_puzzleTimerId) {
        console.log('[puzzle] timer já rodando, id=', _puzzleTimerId);
        return;
    }
    _puzzleStartAt = Date.now() - (_puzzleElapsed * 1000);
    _puzzleTimerId = setInterval(() => {
    // Se outro flag global indicar que o puzzle foi finalizado, encerra o interval defensivamente
    if (window.__PUZZLE_FINISHED) {
      try { clearInterval(_puzzleTimerId); } catch (e) {}
      _puzzleTimerId = null;
      _puzzleFinished = true;
      return;
    }

    _puzzleElapsed = Math.floor((Date.now() - _puzzleStartAt) / 1000);
    const el = document.querySelector('.puzzle-timer-display');
    if (el) el.textContent = _formatTime(_puzzleElapsed);
    }, 250);
    window._puzzleIntervals.push(_puzzleTimerId);
    console.log('[puzzle] timer iniciado, id=', _puzzleTimerId);
}

function stopPuzzleTimer() {
  // Primeiro, garantir que qualquer interval registrado seja limpo (defensivo)
  try {
    forceStopAllPuzzleIntervals();
  } catch (e) {
    console.warn('[puzzle] forceStopAllPuzzleIntervals falhou', e);
  }

  if (!_puzzleTimerId) {
    console.log('[puzzle] stop chamado, mas não havia timer ativo');
  } else {
    try { clearInterval(_puzzleTimerId); } catch (e) {}
    console.log('[puzzle] timer limpo, id=', _puzzleTimerId);
    // remover id do array se ainda existir
    const idx = window._puzzleIntervals.indexOf(_puzzleTimerId);
    if (idx !== -1) window._puzzleIntervals.splice(idx, 1);
    _puzzleTimerId = null;
  }

  // Atualiza estado/tempo final
  _puzzleElapsed = _puzzleStartAt ? Math.floor((Date.now() - _puzzleStartAt) / 1000) : _puzzleElapsed;
  _puzzleFinished = true;
  const el = document.querySelector('.puzzle-timer-display');
  if (el) el.textContent = _formatTime(_puzzleElapsed);
  console.log('[puzzle] tempo final (s)=', _puzzleElapsed, 'formato=', _formatTime(_puzzleElapsed));
}

function resetPuzzleTimer() {
    // limpa timers criados pelo jogo (force)
    forceStopAllPuzzleIntervals();
    _puzzleTimerId = null;
    _puzzleStartAt = null;
    _puzzleElapsed = 0;
    _puzzleFinished = false;
    const el = document.querySelector('.puzzle-timer-display');
    if (el) el.textContent = _formatTime(0);
    console.log('[puzzle] timer resetado');
}

function forceStopAllPuzzleIntervals() {
    // limpa qualquer interval registrado para ter certeza que nenhum está rodando
    if (window._puzzleIntervals && window._puzzleIntervals.length) {
        window._puzzleIntervals.forEach(id => {
            try { clearInterval(id); } catch (e) {}
        });
        console.log('[puzzle] forceStop: limpei intervalos:', window._puzzleIntervals);
        window._puzzleIntervals = [];
    } else {
        console.log('[puzzle] forceStop: nada para limpar');
    }
}

/* Chamadas públicas */
window.startPuzzleGame = function () {
    resetPuzzleTimer();
    startPuzzleTimer();
    // outras inicializações do jogo...
};

window.onPuzzleCompleted = function () {
    if (_puzzleFinished) {
        console.log('[puzzle] já finalizado - onPuzzleCompleted chamado novamente');
        return;
    }
    console.log('[puzzle] onPuzzleCompleted chamado');
    stopPuzzleTimer();
    const tempo = _formatTime(_puzzleElapsed);

    const alertEl = document.querySelector('.puzzle-completion-alert') 
                    || document.querySelector('.alert-success') 
                    || document.getElementById('completionMessage');

    if (alertEl) {
        alertEl.classList.remove('d-none');
        alertEl.textContent = `🎉 Parabéns! Você completou em ${tempo}`;
    } else {
        alert(`Parabéns! Você completou em ${tempo}`);
    }

    document.dispatchEvent(new CustomEvent('puzzleCompleted', { detail: { seconds: _puzzleElapsed } }));
};

/* Se o seu código não puder chamar onPuzzleCompleted diretamente, adiciono um observer
   que detecta uma .alert-success sendo inserida contendo "Parabéns" e atualiza o tempo. */
(function observeCompletionAlert() {
    const container = document.body;
    const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;
                const alert = node.matches && node.matches('.alert-success') ? node : node.querySelector && node.querySelector('.alert-success');
                if (alert && /parab/i.test(alert.textContent || '')) {
                    // se alerta aparecer com 00:00, atualiza para tempo real
                    if (!_puzzleFinished) {
                        // ainda não finalizado no timer: parar timer e calcular
                        stopPuzzleTimer();
                    }
                    const tempo = _formatTime(_puzzleElapsed);
                    alert.textContent = `🎉 Parabéns! Você completou em ${tempo}`;
                    mo.disconnect();
                    return;
                }
            }
        }
    });
    mo.observe(container, { childList: true, subtree: true });
})();

/* Também permita que outros scripts escutem o evento 'puzzleCompleted' */
// Exemplo de uso:
// document.addEventListener('puzzleCompleted', (e) => console.log('tempo (s):', e.detail.seconds));

console.log("[v0] Filhos do Quarto - Website initialized successfully")

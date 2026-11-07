/**
 * ==========================================================================
 * MINIJUEGO 3: ¡CUÉNTAME QUÉ ESTÁS VIENDO! - LÓGICA PRINCIPAL
 * Preguntas interactivas guiadas, selección lógica dinámica y retroalimentación
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initQueVesGame();
});

function initQueVesGame() {
  // ------------------------------------------------------------------------
  // 1. DEFINICIÓN DE LOS 5 OBJETOS COTIDIANOS Y SUS PREGUNTAS LÓGICAS
  // ------------------------------------------------------------------------
  const OBJECTS_DATA = [
    {
      id: "flor",
      name: "La Flor",
      category: "Naturaleza",
      svg: `<svg viewBox="0 0 64 64" class="object-card-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 36 L32 58" stroke="#48BF84" stroke-width="4" stroke-linecap="round" />
              <path d="M32 46 Q24 40 18 46 Q26 52 32 48" fill="#48BF84" />
              <!-- Pétalos coloridos -->
              <circle cx="32" cy="18" r="8" fill="#FF85C0" />
              <circle cx="44" cy="27" r="8" fill="#FF85C0" />
              <circle cx="39" cy="40" r="8" fill="#FF85C0" />
              <circle cx="25" cy="40" r="8" fill="#FF85C0" />
              <circle cx="20" cy="27" r="8" fill="#FF85C0" />
              <!-- Centro de la flor -->
              <circle cx="32" cy="30" r="7" fill="#FFD166" />
            </svg>`,
      // Pregunta 1 obligatoria de identificación
      mandatoryQuestion: "¿Qué objeto es este que estás viendo?",
      // Banco de preguntas secundarias coherentes y exclusivas para la flor
      secondaryPool: [
        "¿De qué color son los pétalos de esta linda flor?",
        "¿Qué necesita una flor para crecer sana y fuerte?",
        "¿En qué lugares podemos encontrar flores?",
        "¿Cómo huele una flor fresca cuando te acercas a olerla?",
        "¿Qué pequeños insectos amigos visitan las flores para tomar su néctar?"
      ]
    },
    {
      id: "casa",
      name: "La Casa",
      category: "Lugar",
      svg: `<svg viewBox="0 0 64 64" class="object-card-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Techo -->
              <polygon points="32,8 6,28 58,28" fill="#791E94" />
              <!-- Paredes -->
              <rect x="14" y="28" width="36" height="28" rx="3" fill="#EEF3FA" stroke="#80A1D4" stroke-width="2" />
              <!-- Puerta -->
              <rect x="27" y="38" width="10" height="18" rx="2" fill="#35A7FF" />
              <!-- Ventanas -->
              <rect x="18" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <rect x="39" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <circle cx="34" cy="48" r="1" fill="#FFFFFF" />
            </svg>`,
      mandatoryQuestion: "¿Qué objeto es este que estás viendo?",
      secondaryPool: [
        "¿De qué color es el techo de esta casita?",
        "¿Quiénes viven juntos y comparten momentos de alegría dentro de una casa?",
        "¿Qué habitaciones o partes podemos encontrar dentro de una casa?",
        "¿Qué cosas divertidas te gusta hacer cuando estás en tu casa?"
      ]
    },
    {
      id: "pelota",
      name: "La Pelota",
      category: "Juguete",
      svg: `<svg viewBox="0 0 64 64" class="object-card-svg" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="26" fill="#35A7FF" />
              <path d="M32 6 A26 26 0 0 0 10 44 L32 32 Z" fill="#FFD166" />
              <path d="M32 32 L48 52 A26 26 0 0 0 58 32 Z" fill="#48BF84" />
              <path d="M32 6 A26 26 0 0 1 54 44 L32 32 Z" fill="#FF4D4D" />
              <circle cx="32" cy="32" r="8" fill="#FFFFFF" />
            </svg>`,
      mandatoryQuestion: "¿Qué objeto es este que estás viendo?",
      secondaryPool: [
        "¿Qué forma tiene esta pelota?",
        "¿Para qué juegos o deportes usamos una pelota como esta?",
        "¿Qué colores brillantes ves en esta pelota?",
        "¿Qué hace la pelota cuando la lanzas con fuerza contra el suelo?",
        "¿En qué lugares te gusta jugar con la pelota?"
      ]
    },
    {
      id: "perro",
      name: "El Perro",
      category: "Animal",
      svg: `<svg viewBox="0 0 64 64" class="object-card-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Orejas -->
              <ellipse cx="14" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(15 14 28)" />
              <ellipse cx="50" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(-15 50 28)" />
              <!-- Cabeza -->
              <circle cx="32" cy="34" r="18" fill="#D4A373" />
              <!-- Ojos -->
              <circle cx="25" cy="30" r="3" fill="#2C3539" />
              <circle cx="39" cy="30" r="3" fill="#2C3539" />
              <circle cx="26" cy="29" r="1" fill="#FFFFFF" />
              <circle cx="40" cy="29" r="1" fill="#FFFFFF" />
              <!-- Hocico -->
              <ellipse cx="32" cy="40" rx="9" ry="7" fill="#FAEDCD" />
              <polygon points="32,38 28,34 36,34" fill="#2C3539" />
              <!-- Lengüita feliz -->
              <path d="M30 43 Q32 48 34 43 Z" fill="#FF8585" />
            </svg>`,
      mandatoryQuestion: "¿Qué objeto es este que estás viendo?",
      secondaryPool: [
        "¿Cómo hace el simpático ladrido de un perrito?",
        "¿Qué parte de su cuerpo mueve un perrito cuando se siente muy feliz?",
        "¿Cómo debemos tratar a una mascota como el perro?",
        "¿A qué juegos divertidos le gusta jugar a un perro cuando sale al parque?"
      ]
    },
    {
      id: "manzana",
      name: "La Manzana",
      category: "Fruta",
      svg: `<svg viewBox="0 0 64 64" class="object-card-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Hoja -->
              <path d="M33 14 C35 8 41 5 46 6 C47 11 43 17 38 18 Z" fill="#48BF84" />
              <!-- Ramita -->
              <path d="M32 16 C30 11 26 8 28 4" stroke="#791E94" stroke-width="3" stroke-linecap="round" fill="none" />
              <!-- Cuerpo Manzana -->
              <path d="M32 20 C24 16 12 20 12 34 C12 48 24 58 32 58 C40 58 52 48 52 34 C52 20 40 16 32 20 Z" fill="#FF4D4D" />
              <ellipse cx="24" cy="28" rx="4" ry="7" fill="#FF8585" opacity="0.6" transform="rotate(-20 24 28)" />
            </svg>`,
      mandatoryQuestion: "¿Qué objeto es este que estamos viendo?",
      secondaryPool: [
        "¿De qué color es esta rica manzana?",
        "¿A qué sabe una manzana cuando le das un mordisco?",
        "¿Por qué es tan bueno para nuestra salud comer frutas frescas como la manzana?",
        "¿Cómo te gusta más comer la manzana: entera, en rodajas o en papilla?"
      ]
    }
  ];

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL JUEGO
  // ------------------------------------------------------------------------
  const completedObjects = new Set();
  let currentObject = null;
  let currentQuestionsQueue = [];
  let currentQuestionIndex = 0;

  // Frases de elogio de Palabrín al avanzar entre preguntas
  const PRAISE_PHRASES = [
    "¡Qué buena respuesta! Eres muy observador.",
    "¡Excelente respuesta! Vamos con la siguiente pregunta.",
    "¡Fantástico! Tu respuesta fue maravillosa.",
    "¡Muy bien pensado! Sigamos descubriendo juntos."
  ];

  // Elementos DOM
  const screenIntro = document.getElementById('screenIntro');
  const screenGame = document.getElementById('screenGame');
  const screenVictory = document.getElementById('screenVictory');

  const btnStartGame = document.getElementById('btnStartGame');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const robotIntroImg = document.getElementById('robotIntroImg');

  const objectsGrid = document.getElementById('objectsGrid');
  const gameProgressBar = document.getElementById('gameProgressBar');
  const gameProgressCount = document.getElementById('gameProgressCount');
  const headerCounter = document.getElementById('headerCounter');

  // Elementos del Modal Spotlight de Preguntas
  const spotlightModal = document.getElementById('spotlightModal');
  const spotlightFigure = document.getElementById('spotlightFigure');
  const spotlightObjectName = document.getElementById('spotlightObjectName');
  const questionStepBadge = document.getElementById('questionStepBadge');
  const questionDots = document.getElementById('questionDots');
  const questionText = document.getElementById('questionText');
  const questionAvatar = document.getElementById('questionAvatar');
  const btnRepeatQuestion = document.getElementById('btnRepeatQuestion');
  const btnNextQuestion = document.getElementById('btnNextQuestion');

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN
  // ------------------------------------------------------------------------
  renderObjectsBoard();
  updateProgressUI();

  // Iniciar Juego: Transición de pantalla 1 a pantalla 2
  if (btnStartGame) {
    btnStartGame.addEventListener('click', () => {
      screenIntro.style.opacity = '0';
      setTimeout(() => {
        screenIntro.style.display = 'none';
        screenGame.style.display = 'block';
        screenGame.style.opacity = '0';
        setTimeout(() => {
          screenGame.style.transition = 'opacity 0.4s ease';
          screenGame.style.opacity = '1';
        }, 50);
      }, 300);
    });
  }

  // Tocar a Palabrín en la pantalla de inicio para escuchar instrucciones
  if (robotIntroImg) {
    robotIntroImg.addEventListener('click', () => {
      playInstructionAudio();
    });
  }

  // Reiniciar Juego
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      resetGame();
    });
  }

  // Botón para repetir la pregunta actual en voz alta
  if (btnRepeatQuestion) {
    btnRepeatQuestion.addEventListener('click', () => {
      const activeQuestion = currentQuestionsQueue[currentQuestionIndex];
      if (activeQuestion) {
        speakWithSpeechSynthesis(activeQuestion);
      }
    });
  }

  // Botón para confirmar que el niño ya respondió y pasar a la siguiente pregunta
  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      handleNextQuestionClick();
    });
  }

  // ------------------------------------------------------------------------
  // 4. TABLERO DE TARJETAS
  // ------------------------------------------------------------------------
  function renderObjectsBoard() {
    if (!objectsGrid) return;
    objectsGrid.innerHTML = '';

    OBJECTS_DATA.forEach((item) => {
      const isCompleted = completedObjects.has(item.id);

      const card = document.createElement('div');
      card.className = `object-card ${isCompleted ? 'is-completed' : ''}`;
      card.id = `card-${item.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', isCompleted ? '-1' : '0');
      card.setAttribute('aria-label', `Tarjeta de ${item.name}`);

      card.innerHTML = `
        ${isCompleted ? '<div class="completed-badge" title="¡Preguntas completadas!"><i class="bi bi-check-lg"></i></div>' : ''}
        <div class="object-card-icon">
          ${item.svg}
        </div>
        <h4 class="object-card-title">${item.name}</h4>
        <span class="object-card-badge">${isCompleted ? '¡Completado!' : 'Toca para hablar'}</span>
      `;

      card.addEventListener('click', () => {
        if (!isCompleted) {
          openQuestionModalForObject(item);
        }
      });

      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isCompleted) {
          e.preventDefault();
          openQuestionModalForObject(item);
        }
      });

      objectsGrid.appendChild(card);
    });
  }

  // ------------------------------------------------------------------------
  // 5. GENERACIÓN DINÁMICA DE PREGUNTAS Y FLUJO DEL MODAL
  // ------------------------------------------------------------------------
  /**
   * Abre el diálogo de Palabrín para un objeto:
   * Genera 3 preguntas (1 obligatoria + 2 dinámicas aleatorias sin repetir)
   */
  function openQuestionModalForObject(item) {
    currentObject = item;
    currentQuestionIndex = 0;

    // Seleccionar 2 preguntas aleatorias y no repetitivas del banco secundario
    const shuffledPool = [...item.secondaryPool].sort(() => 0.5 - Math.random());
    const selectedSecondary = shuffledPool.slice(0, 2);

    // Cola de exactamente 3 preguntas para este objeto
    currentQuestionsQueue = [
      item.mandatoryQuestion,
      selectedSecondary[0],
      selectedSecondary[1]
    ];

    // Cargar datos en el modal
    if (spotlightFigure) spotlightFigure.innerHTML = item.svg;
    if (spotlightObjectName) spotlightObjectName.textContent = item.name;

    // Mostrar modal
    if (spotlightModal) {
      spotlightModal.classList.add('is-active');
      spotlightModal.setAttribute('aria-hidden', 'false');
    }

    displayCurrentQuestion();
  }

  /**
   * Muestra y narra la pregunta correspondiente al índice actual
   */
  function displayCurrentQuestion() {
    const totalQuestions = currentQuestionsQueue.length; // 3
    const stepNumber = currentQuestionIndex + 1;
    const currentQText = currentQuestionsQueue[currentQuestionIndex];

    // Actualizar indicador de paso (ej. "Pregunta 1 de 3")
    if (questionStepBadge) {
      questionStepBadge.innerHTML = `<i class="bi bi-patch-question-fill"></i> Pregunta ${stepNumber} de ${totalQuestions}`;
    }

    // Actualizar puntos de progreso
    if (questionDots) {
      const dots = questionDots.querySelectorAll('.q-dot');
      dots.forEach((dot, idx) => {
        dot.className = 'q-dot';
        if (idx < currentQuestionIndex) {
          dot.classList.add('completed');
        } else if (idx === currentQuestionIndex) {
          dot.classList.add('active');
        }
      });
    }

    // Avatar expresivo de Palabrín
    if (questionAvatar) {
      questionAvatar.src = (stepNumber === 3) ? "assets/images/emocionado.png" : "assets/images/senalando.png";
    }

    // Texto de la pregunta
    if (questionText) {
      questionText.textContent = currentQText;
    }

    // Texto del botón de confirmación
    if (btnNextQuestion) {
      if (stepNumber === totalQuestions) {
        btnNextQuestion.className = "btn-kid btn-magic-kid btn-confirm-q shadow-lg";
        btnNextQuestion.innerHTML = `<i class="bi bi-star-fill text-warning"></i> ¡Ya respondí! ⭐ ¡Completar!`;
      } else {
        btnNextQuestion.className = "btn-kid btn-emerald-kid btn-confirm-q shadow-lg";
        btnNextQuestion.innerHTML = `<i class="bi bi-check-circle-fill fs-5"></i> ¡Ya respondí! ➡️ Siguiente pregunta`;
      }
    }

    // Palabrín narra la pregunta en voz alta
    speakWithSpeechSynthesis(currentQText);
  }

  /**
   * Avanza entre preguntas o completa el objeto al finalizar la 3ra
   */
  function handleNextQuestionClick() {
    if (!currentObject) return;

    // Si aún quedan preguntas (paso 1 -> 2 o paso 2 -> 3)
    if (currentQuestionIndex < currentQuestionsQueue.length - 1) {
      playSuccessChime();

      // Breve felicitación intermedia de Palabrín
      const praise = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
      if (questionText) {
        questionText.innerHTML = `✨ <em>${praise}</em>`;
      }

      currentQuestionIndex++;

      // Pequeña pausa para fluidez antes de la siguiente pregunta
      setTimeout(() => {
        displayCurrentQuestion();
      }, 700);

    } else {
      // ===== ¡OBJETO COMPLETADO! (3 preguntas respondidas) =====
      handleObjectCompletion();
    }
  }

  /**
   * Finaliza las 3 preguntas de un objeto con celebración
   */
  function handleObjectCompletion() {
    completedObjects.add(currentObject.id);
    playObjectFinishFanfare();

    // Mensaje de éxito en el modal
    if (questionText) {
      questionText.innerHTML = `🎉 <strong>¡Fantástico! Respondiste las 3 preguntas sobre ${currentObject.name}.</strong>`;
    }
    if (questionAvatar) {
      questionAvatar.src = "assets/images/contento.png";
    }
    if (btnNextQuestion) {
      btnNextQuestion.style.pointerEvents = "none";
    }

    speakWithSpeechSynthesis(`¡Excelente trabajo! Has completado todas las preguntas sobre ${currentObject.name}.`);

    // Cerrar modal y actualizar tablero
    setTimeout(() => {
      closeQuestionModal();
      renderObjectsBoard();
      updateProgressUI();

      // Verificar si ya completó todos los 5 objetos
      if (completedObjects.size >= OBJECTS_DATA.length) {
        setTimeout(showVictoryScreen, 700);
      }
    }, 1400);
  }

  function closeQuestionModal() {
    if (spotlightModal) {
      spotlightModal.classList.remove('is-active');
      spotlightModal.setAttribute('aria-hidden', 'false');
    }
    if (btnNextQuestion) {
      btnNextQuestion.style.pointerEvents = "auto";
    }
    currentObject = null;
    currentQuestionsQueue = [];
    currentQuestionIndex = 0;
  }

  // ------------------------------------------------------------------------
  // 6. PROGRESO Y CONTADORES
  // ------------------------------------------------------------------------
  function updateProgressUI() {
    const total = OBJECTS_DATA.length; // 5
    const count = completedObjects.size;
    const percentage = (count / total) * 100;

    if (gameProgressBar) {
      gameProgressBar.style.width = `${percentage}%`;
    }

    if (gameProgressCount) {
      gameProgressCount.textContent = `${count} de ${total} objetos completados`;
    }

    if (headerCounter) {
      headerCounter.textContent = `${count} / ${total} Objetos`;
    }
  }

  // ------------------------------------------------------------------------
  // 7. PANTALLA DE FINALIZACIÓN Y REINICIO
  // ------------------------------------------------------------------------
  function showVictoryScreen() {
    if (screenGame) screenGame.style.display = 'none';
    if (screenVictory) {
      screenVictory.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Audio festivo de celebración final
    const victoryAudio = new Audio("assets/audio/felici3.mp3");
    victoryAudio.play().catch(() => {
      speakWithSpeechSynthesis("¡Felicidades! Has respondido todas las preguntas de la fábrica mágica.");
    });
  }

  function resetGame() {
    completedObjects.clear();
    closeQuestionModal();

    if (screenVictory) screenVictory.style.display = 'none';
    if (screenIntro) {
      screenIntro.style.display = 'block';
      screenIntro.style.opacity = '1';
    }
    if (screenGame) screenGame.style.display = 'none';

    renderObjectsBoard();
    updateProgressUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function playInstructionAudio() {
    const audio = new Audio("assets/audio/elige.mp3");
    let hasPlayed = false;
    audio.play().then(() => {
      hasPlayed = true;
    }).catch(() => {
      if (!hasPlayed) {
        speakWithSpeechSynthesis("Observa y responde a las preguntas que te hace Palabrín.");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. EFECTOS SONOROS (WEB AUDIO API Y VOZ)
  // ------------------------------------------------------------------------
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Chime suave de paso de pregunta
  function playSuccessChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = t + i * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  // Fanfarria de objeto completado
  function playObjectFinishFanfare() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = t + i * 0.09;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.25, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
  }

  // Síntesis de voz en español infantil para Palabrín
  function speakWithSpeechSynthesis(text, onEnd) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.92;
      utterance.pitch = 1.15;

      let ended = false;
      utterance.onend = () => {
        if (!ended) {
          ended = true;
          if (typeof onEnd === 'function') onEnd();
        }
      };

      utterance.onerror = () => {
        if (!ended) {
          ended = true;
          if (typeof onEnd === 'function') onEnd();
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (typeof onEnd === 'function') onEnd();
      }, 1000);
    }
  }
}


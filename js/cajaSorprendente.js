/**
 * ==========================================================================
 * MINIJUEGO 1: LA CAJA DE LAS IMÁGENES SORPRENDENTES
 * Lógica interactiva, control de objetos, pronunciación y estados del juego
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCajaSorprendenteGame();
});

function initCajaSorprendenteGame() {
  // ------------------------------------------------------------------------
  // 1. DEFINICIÓN DE LOS 10 OBJETOS COTIDIANOS
  // ------------------------------------------------------------------------
  const MAGIC_OBJECTS = [
    {
      id: 1,
      name: "Manzana",
      article: "la",
      audio: "assets/audio/manzana.mp3",
      category: "Fruta",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 14 C35 8 41 5 46 6 C47 11 43 17 38 18 Z" fill="#48BF84" />
              <path d="M32 16 C30 11 26 8 28 4" stroke="#791E94" stroke-width="3" stroke-linecap="round" fill="none" />
              <path d="M32 20 C24 16 12 20 12 34 C12 48 24 58 32 58 C40 58 52 48 52 34 C52 20 40 16 32 20 Z" fill="#FF4D4D" />
              <ellipse cx="24" cy="28" rx="4" ry="7" fill="#FF8585" opacity="0.6" transform="rotate(-20 24 28)" />
            </svg>`
    },
    {
      id: 2,
      name: "Pelota",
      article: "la",
      audio: "assets/audio/pelota.mp3",
      category: "Juguete",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="26" fill="#35A7FF" />
              <path d="M32 6 A26 26 0 0 0 10 44 L32 32 Z" fill="#FFD166" />
              <path d="M32 32 L48 52 A26 26 0 0 0 58 32 Z" fill="#48BF84" />
              <path d="M32 6 A26 26 0 0 1 54 44 L32 32 Z" fill="#FF4D4D" />
              <circle cx="32" cy="32" r="8" fill="#FFFFFF" />
            </svg>`
    },
    {
      id: 3,
      name: "Gato",
      article: "el",
      audio: "assets/audio/gato1.mp3",
      category: "Animal",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,26 12,10 28,18" fill="#80A1D4" />
              <polygon points="48,26 52,10 36,18" fill="#80A1D4" />
              <ellipse cx="32" cy="36" rx="20" ry="18" fill="#80A1D4" />
              <polygon points="17,23 15,14 25,19" fill="#F8EDFB" />
              <polygon points="47,23 49,14 39,19" fill="#F8EDFB" />
              <ellipse cx="25" cy="34" rx="3.5" ry="5" fill="#2C3539" />
              <ellipse cx="39" cy="34" rx="3.5" ry="5" fill="#2C3539" />
              <circle cx="26" cy="32.5" r="1.5" fill="#FFFFFF" />
              <circle cx="40" cy="32.5" r="1.5" fill="#FFFFFF" />
              <polygon points="32,40 29,37 35,37" fill="#FF8585" />
              <path d="M29 42 Q32 45 35 42" stroke="#2C3539" stroke-width="2" fill="none" stroke-linecap="round" />
            </svg>`
    },
    {
      id: 4,
      name: "Sol",
      article: "el",
      audio: "assets/audio/sol.mp3",
      category: "Naturaleza",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Rayos del Sol -->
              <g stroke="#FFAA00" stroke-width="4" stroke-linecap="round">
                <line x1="32" y1="4" x2="32" y2="12" />
                <line x1="32" y1="52" x2="32" y2="60" />
                <line x1="4" y1="32" x2="12" y2="32" />
                <line x1="52" y1="32" x2="60" y2="32" />
                <line x1="12" y1="12" x2="18" y2="18" />
                <line x1="46" y1="46" x2="52" y2="52" />
                <line x1="12" y1="52" x2="18" y2="46" />
                <line x1="46" y1="18" x2="52" y2="12" />
              </g>
              <circle cx="32" cy="32" r="16" fill="#FFD166" />
              <circle cx="27" cy="30" r="2.5" fill="#2C3539" />
              <circle cx="37" cy="30" r="2.5" fill="#2C3539" />
              <path d="M27 36 Q32 40 37 36" stroke="#2C3539" stroke-width="2" fill="none" stroke-linecap="round" />
            </svg>`
    },
    {
      id: 5,
      name: "Casa",
      article: "la",
      audio: "assets/audio/casa.mp3",
      category: "Lugar",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,8 6,28 58,28" fill="#791E94" />
              <rect x="14" y="28" width="36" height="28" rx="3" fill="#EEF3FA" stroke="#80A1D4" stroke-width="2" />
              <rect x="27" y="38" width="10" height="18" rx="2" fill="#35A7FF" />
              <rect x="18" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <rect x="39" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <circle cx="34" cy="48" r="1" fill="#FFFFFF" />
            </svg>`
    },
    {
      id: 6,
      name: "Flor",
      article: "la",
      audio: "assets/audio/flor.mp3",
      category: "Naturaleza",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 36 L32 58" stroke="#48BF84" stroke-width="4" stroke-linecap="round" />
              <path d="M32 46 Q24 40 18 46 Q26 52 32 48" fill="#48BF84" />
              <!-- Pétalos -->
              <circle cx="32" cy="18" r="8" fill="#FF85C0" />
              <circle cx="44" cy="27" r="8" fill="#FF85C0" />
              <circle cx="39" cy="40" r="8" fill="#FF85C0" />
              <circle cx="25" cy="40" r="8" fill="#FF85C0" />
              <circle cx="20" cy="27" r="8" fill="#FF85C0" />
              <!-- Centro -->
              <circle cx="32" cy="30" r="7" fill="#FFD166" />
            </svg>`
    },
    {
      id: 7,
      name: "Estrella",
      article: "la",
      audio: "assets/audio/estrella.mp3",
      category: "Cielo",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,6 39,22 56,23 42,34 47,51 32,41 17,51 22,34 8,23 25,22" fill="#FFD166" stroke="#FFAA00" stroke-width="2" stroke-linejoin="round" />
              <circle cx="28" cy="28" r="2" fill="#2C3539" />
              <circle cx="36" cy="28" r="2" fill="#2C3539" />
              <path d="M28 33 Q32 36 36 33" stroke="#2C3539" stroke-width="1.8" fill="none" stroke-linecap="round" />
            </svg>`
    },
    {
      id: 8,
      name: "Carro",
      article: "el",
      audio: "assets/audio/carro1.mp3",
      category: "Transporte",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 36 L18 22 Q20 18 25 18 L39 18 Q44 18 47 22 L54 36 Z" fill="#35A7FF" />
              <rect x="8" y="32" width="48" height="16" rx="4" fill="#35A7FF" />
              <!-- Ventanas -->
              <polygon points="21,22 25,22 25,32 17,32" fill="#FFFFFF" opacity="0.85" />
              <polygon points="28,22 38,22 43,32 28,32" fill="#FFFFFF" opacity="0.85" />
              <!-- Llantas -->
              <circle cx="18" cy="48" r="7" fill="#2C3539" />
              <circle cx="18" cy="48" r="3" fill="#EEF3FA" />
              <circle cx="46" cy="48" r="7" fill="#2C3539" />
              <circle cx="46" cy="48" r="3" fill="#EEF3FA" />
              <circle cx="53" cy="37" r="2" fill="#FFD166" />
            </svg>`
    },
    {
      id: 9,
      name: "Libro",
      article: "el",
      audio: "assets/audio/libro.mp3",
      category: "Escuela",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 44 C16 40 28 40 32 44 C36 40 48 40 56 44 L56 16 C48 12 36 12 32 16 C28 12 16 12 8 16 Z" fill="#48BF84" />
              <path d="M10 42 C17 38 27 38 31 42 L31 17 C27 13 17 13 10 17 Z" fill="#FFFFFF" />
              <path d="M54 42 C47 38 37 38 33 42 L33 17 C37 13 47 13 54 17 Z" fill="#FFFFFF" />
              <line x1="32" y1="16" x2="32" y2="44" stroke="#791E94" stroke-width="2.5" />
              <!-- Letras simuladas -->
              <line x1="14" y1="23" x2="26" y2="23" stroke="#80A1D4" stroke-width="2" stroke-linecap="round" />
              <line x1="14" y1="28" x2="24" y2="28" stroke="#80A1D4" stroke-width="2" stroke-linecap="round" />
              <line x1="38" y1="23" x2="50" y2="23" stroke="#80A1D4" stroke-width="2" stroke-linecap="round" />
              <line x1="38" y1="28" x2="48" y2="28" stroke="#80A1D4" stroke-width="2" stroke-linecap="round" />
            </svg>`
    },
    {
      id: 10,
      name: "Perro",
      article: "el",
      audio: "assets/audio/perro1.mp3",
      category: "Animal",
      svg: `<svg viewBox="0 0 64 64" class="object-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Orejas caídas -->
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
              <!-- Lengüita -->
              <path d="M30 43 Q32 48 34 43 Z" fill="#FF8585" />
            </svg>`
    }
  ];

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL JUEGO
  // ------------------------------------------------------------------------
  const completedIds = new Set();
  let currentActiveObject = null;
  let isWordAudioPlaying = false;
  let currentWordAudio = null;
  let currentPromptAudio = null;

  /**
   * Detiene cualquier audio o síntesis de voz en curso
   */
  function stopAllAudios() {
    if (currentWordAudio) {
      currentWordAudio.pause();
      currentWordAudio.currentTime = 0;
      currentWordAudio = null;
    }
    if (currentPromptAudio) {
      currentPromptAudio.pause();
      currentPromptAudio.currentTime = 0;
      currentPromptAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isWordAudioPlaying = false;
  }

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

  // Modal Spotlight
  const spotlightModal = document.getElementById('spotlightModal');
  const spotlightIcon = document.getElementById('spotlightIcon');
  const spotlightTitle = document.getElementById('spotlightTitle');
  const spotlightDialogText = document.getElementById('spotlightDialogText');
  const btnWordSaid = document.getElementById('btnWordSaid');
  const btnRepeatAudio = document.getElementById('btnRepeatAudio');

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN Y EVENTOS DE PANTALLA
  // ------------------------------------------------------------------------

  // Renderizar la cuadrícula inicial de los 10 objetos
  renderObjectsGrid();

  // Iniciar Juego: Oculta intro y muestra tablero
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

  // Reiniciar Juego (Limpio)
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      resetGame();
    });
  }

  // ------------------------------------------------------------------------
  // 4. RENDERIZADO DE LOS 10 OBJETOS
  // ------------------------------------------------------------------------
  function renderObjectsGrid() {
    if (!objectsGrid) return;
    objectsGrid.innerHTML = '';

    MAGIC_OBJECTS.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'object-card';
      card.id = `object-card-${item.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Objeto ${index + 1}: ${item.name}`);

      const isCompleted = completedIds.has(item.id);
      if (isCompleted) {
        card.classList.add('is-completed');
      }

      card.innerHTML = `
        ${isCompleted ? '<div class="completed-stamp"><i class="bi bi-check-lg"></i></div>' : ''}
        <div class="object-icon-wrapper">
          ${item.svg}
        </div>
        <span class="object-label">${item.name}</span>
        <span class="object-badge">
          ${isCompleted ? '<i class="bi bi-star-fill text-warning"></i> ¡Aprendida!' : `<i class="bi bi-magic"></i> Objeto ${index + 1}`}
        </span>
      `;

      // Evento de clic: Solo si NO está completada
      card.addEventListener('click', () => {
        if (!completedIds.has(item.id)) {
          openObjectSpotlight(item);
        }
      });

      // Accesibilidad por teclado (Enter / Espacio)
      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !completedIds.has(item.id)) {
          e.preventDefault();
          openObjectSpotlight(item);
        }
      });

      objectsGrid.appendChild(card);
    });

    updateProgressUI();
  }

  // ------------------------------------------------------------------------
  // 5. MECÁNICA SPOTLIGHT (ZOOM DEL OBJETO Y PRONUNCIACIÓN)
  // ------------------------------------------------------------------------
  function openObjectSpotlight(item) {
    currentActiveObject = item;
    if (!spotlightModal) return;

    // Configurar información del objeto seleccionado
    spotlightIcon.innerHTML = item.svg;
    spotlightTitle.textContent = item.name;

    // Estado inicial del diálogo: Palabrín pronuncia primero la palabra
    spotlightDialogText.innerHTML = `Escucha con atención: <strong>"¡${item.name}!"</strong>`;
    if (btnWordSaid) btnWordSaid.style.display = 'none'; // Oculto hasta que termine la invitación a hablar
    if (btnRepeatAudio) btnRepeatAudio.style.display = 'none'; // Oculto hasta que termine la invitación a hablar

    // Mostrar modal con efecto de zoom
    spotlightModal.classList.add('is-active');

    // 1. Inmediatamente reproducir el audio con el nombre del objeto
    playObjectAudio(item.name, item.audio, () => {
      // 2. SOLO cuando el audio de la palabra haya terminado, se reproduce el prompt
      onObjectAudioFinished(item);
    });
  }

  /**
   * Cuando termina de sonar el nombre del objeto:
   * Palabrín invita al niño a decirlo en voz alta y reproduce playPromptAudio
   */
  function onObjectAudioFinished(item) {
    if (!currentActiveObject || currentActiveObject.id !== item.id) return;

    spotlightDialogText.innerHTML = `¡Ahora inténtalo tú! Di en voz alta: <strong>"¡${item.name}!"</strong> 🗣️✨`;
    
    // Pausa breve natural de 300ms antes de comenzar la indicación
    setTimeout(() => {
      if (!currentActiveObject || currentActiveObject.id !== item.id) return;

      // Reproducir SOLO AHORA el audio de incentivo (ahora1.mp3)
      playPromptAudio(`¡Ahora dilo tú! ${item.name}`, () => {
        // Mostrar botones de acción una vez termine el prompt
        if (btnRepeatAudio) {
          btnRepeatAudio.style.display = 'inline-flex';
          btnRepeatAudio.disabled = false;
        }
        if (btnWordSaid) {
          btnWordSaid.style.display = 'inline-flex';
          btnWordSaid.disabled = false;
          btnWordSaid.focus();
        }
      });
    }, 300);
  }

  // Evento al presionar "Repetir Audio"
  if (btnRepeatAudio) {
    btnRepeatAudio.addEventListener('click', () => {
      if (!currentActiveObject || isWordAudioPlaying) return;

      // Deshabilitar temporalmente los botones mientras se reproduce el audio de la palabra
      btnRepeatAudio.disabled = true;
      if (btnWordSaid) btnWordSaid.disabled = true;

      spotlightDialogText.innerHTML = `Escucha de nuevo: <strong>"¡${currentActiveObject.name}!"</strong> 🔊`;

      playObjectAudio(currentActiveObject.name, currentActiveObject.audio, () => {
        // Cuando termine de repetirse el audio del objeto
        if (btnRepeatAudio) btnRepeatAudio.disabled = false;
        if (btnWordSaid) btnWordSaid.disabled = false;

        spotlightDialogText.innerHTML = `¡Ahora inténtalo tú! Di en voz alta: <strong>"¡${currentActiveObject.name}!"</strong> 🗣️✨`;
      });
    });
  }

  // Evento al presionar "¡Ya la dije! / Siguiente palabra"
  if (btnWordSaid) {
    btnWordSaid.addEventListener('click', () => {
      if (!currentActiveObject) return;

      // 1. Marcar como completado
      completedIds.add(currentActiveObject.id);

      // 2. Cerrar spotlight y detener audios
      closeObjectSpotlight();

      // 3. Actualizar la tarjeta en el tablero
      renderObjectsGrid();

      // 4. Verificar si se completaron los 10 objetos
      if (completedIds.size >= MAGIC_OBJECTS.length) {
        setTimeout(showVictoryScreen, 500);
      }
    });
  }

  function closeObjectSpotlight() {
    stopAllAudios();
    if (spotlightModal) {
      spotlightModal.classList.remove('is-active');
    }
    if (btnRepeatAudio) btnRepeatAudio.disabled = false;
    if (btnWordSaid) btnWordSaid.disabled = false;
    currentActiveObject = null;
  }

  // ------------------------------------------------------------------------
  // 6. ACTUALIZACIÓN DE PROGRESO Y CONTADORES
  // ------------------------------------------------------------------------
  function updateProgressUI() {
    const total = MAGIC_OBJECTS.length;
    const completed = completedIds.size;
    const percentage = (completed / total) * 100;

    if (gameProgressBar) {
      gameProgressBar.style.width = `${percentage}%`;
    }

    const textStatus = `${completed} de ${total} objetos`;
    if (gameProgressCount) {
      gameProgressCount.textContent = textStatus;
    }

    if (headerCounter) {
      headerCounter.textContent = `${completed} / ${total} Palabras`;
    }
  }

  // ------------------------------------------------------------------------
  // 7. PANTALLA DE FINALIZACIÓN (CELEBRACIÓN Y 3 BOTONES)
  // ------------------------------------------------------------------------
  function showVictoryScreen() {
    if (screenGame) screenGame.style.display = 'none';
    if (screenVictory) {
      screenVictory.style.display = 'block';
      // Desplazamiento suave al inicio de la pantalla de victoria
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Pronunciación celebratoria
    playVictoryVoice();
  }

  function resetGame() {
    completedIds.clear();
    currentActiveObject = null;

    if (screenVictory) screenVictory.style.display = 'none';
    if (screenIntro) {
      screenIntro.style.display = 'block';
      screenIntro.style.opacity = '1';
    }
    if (screenGame) screenGame.style.display = 'none';

    renderObjectsGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ------------------------------------------------------------------------
  // 8. MOTOR DE AUDIO Y VOZ INFANTIL (CON RESPALDO SPEECH SYNTHESIS)
  // ------------------------------------------------------------------------

  /**
   * Reproduce el audio de la palabra y garantiza que onFinished se ejecute SOLO al terminar
   */
  function playObjectAudio(wordName, audioPath, onFinished) {
    stopAllAudios();
    isWordAudioPlaying = true;

    let finished = false;
    const finishWordCallback = () => {
      if (!finished) {
        finished = true;
        isWordAudioPlaying = false;
        currentWordAudio = null;
        if (typeof onFinished === 'function') {
          onFinished();
        }
      }
    };

    if (audioPath) {
      const audio = new Audio();
      currentWordAudio = audio;
      audio.volume = 1;
      let hasFailed = false;

      const triggerWordFallback = () => {
        if (!hasFailed) {
          hasFailed = true;
          audio.onended = null;
          audio.onerror = null;
          currentWordAudio = null;
          speakTextWithSpeechSynthesis(`¡${wordName}!`, finishWordCallback);
        }
      };

      audio.onended = () => {
        finishWordCallback();
      };

      audio.onerror = () => {
        triggerWordFallback();
      };

      audio.src = audioPath;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          triggerWordFallback();
        });
      }
    } else {
      speakTextWithSpeechSynthesis(`¡${wordName}!`, finishWordCallback);
    }
  }

  /**
   * Reproduce el incentivo ("¡Ahora dilo tú!") SOLO cuando la palabra ya terminó completamente
   */
  function playPromptAudio(text, onFinished) {
    // Si aún estuviera sonando el audio de la palabra, esperar y no reproducir
    if (isWordAudioPlaying) {
      console.log("[Caja Mágica] Esperando que termine el audio de la palabra antes de reproducir el prompt...");
      return;
    }

    if (currentPromptAudio) {
      currentPromptAudio.pause();
      currentPromptAudio.currentTime = 0;
      currentPromptAudio = null;
    }

    let finished = false;
    const finishPrompt = () => {
      if (!finished) {
        finished = true;
        currentPromptAudio = null;
        if (typeof onFinished === 'function') {
          onFinished();
        }
      }
    };

    // Intentar reproducir ahora1.mp3 (o ahora.mp3)
    const audio = new Audio();
    currentPromptAudio = audio;
    audio.volume = 0.85;
    let hasFailed = false;

    const triggerPromptFallback = () => {
      if (!hasFailed) {
        hasFailed = true;
        audio.onended = null;
        audio.onerror = null;
        currentPromptAudio = null;
        speakTextWithSpeechSynthesis(text, finishPrompt);
      }
    };

    audio.onended = () => {
      finishPrompt();
    };

    audio.onerror = () => {
      triggerPromptFallback();
    };

    audio.src = "assets/audio/ahora1.mp3";
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        triggerPromptFallback();
      });
    }
  }

  /**
   * Locución celebratoria final
   */
  function playVictoryVoice() {
    stopAllAudios();
    const audio = new Audio("assets/audio/felici1.mp3");
    audio.play().catch(() => {
      speakTextWithSpeechSynthesis("¡Felicidades! Has completado todos los objetos de la caja mágica.", null);
    });
  }

  /**
   * Síntesis de voz nativa (Web Speech API) con entonación lúdica en español
   */
  function speakTextWithSpeechSynthesis(text, callback) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.88;  // Velocidad adecuada para niños
      utterance.pitch = 1.15; // Tono alegre y amigable

      let called = false;
      const done = () => {
        if (!called) {
          called = true;
          if (typeof callback === 'function') callback();
        }
      };

      utterance.onend = done;

      utterance.onerror = (e) => {
        // Si fue cancelada intencionalmente, no ejecutar el callback de finalización prematuramente
        if (e && e.error === 'canceled') {
          return;
        }
        done();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (typeof callback === 'function') callback();
      }, 1200);
    }
  }
}


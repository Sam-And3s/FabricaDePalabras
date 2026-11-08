/**
 * ==========================================================================
 * MINIJUEGO 4: UNAMOS LAS PALABRAS CON SUS IMÁGENES - LÓGICA PRINCIPAL
 * Emparejamiento interactivo (clic y arrastrar), reproducción de audios y retroalimentación
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initUnirPalabrasGame();
});

function initUnirPalabrasGame() {
  // ------------------------------------------------------------------------
  // 1. DEFINICIÓN DE LAS 6 PAREJAS DE PALABRAS E IMÁGENES
  // ------------------------------------------------------------------------
  const PAIRS_DATA = [
    {
      id: "manzana",
      word: "MANZANA",
      name: "Manzana",
      article: "la",
      audio: "assets/audio/manzana.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 14 C35 8 41 5 46 6 C47 11 43 17 38 18 Z" fill="#48BF84" />
              <path d="M32 16 C30 11 26 8 28 4" stroke="#791E94" stroke-width="3" stroke-linecap="round" fill="none" />
              <path d="M32 20 C24 16 12 20 12 34 C12 48 24 58 32 58 C40 58 52 48 52 34 C52 20 40 16 32 20 Z" fill="#FF4D4D" />
              <ellipse cx="24" cy="28" rx="4" ry="7" fill="#FF8585" opacity="0.6" transform="rotate(-20 24 28)" />
            </svg>`
    },
    {
      id: "gato",
      word: "GATO",
      name: "Gato",
      article: "el",
      audio: "assets/audio/gato1.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      id: "sol",
      word: "SOL",
      name: "Sol",
      article: "el",
      audio: "assets/audio/sol.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#FFAA00" stroke-width="3.5" stroke-linecap="round">
                <line x1="32" y1="5" x2="32" y2="12" />
                <line x1="32" y1="52" x2="32" y2="59" />
                <line x1="5" y1="32" x2="12" y2="32" />
                <line x1="52" y1="32" x2="59" y2="32" />
                <line x1="13" y1="13" x2="18" y2="18" />
                <line x1="46" y1="46" x2="51" y2="51" />
                <line x1="13" y1="51" x2="18" y2="46" />
                <line x1="46" y1="18" x2="51" y2="13" />
              </g>
              <circle cx="32" cy="32" r="16" fill="#FFD166" />
              <circle cx="27" cy="30" r="2.5" fill="#2C3539" />
              <circle cx="37" cy="30" r="2.5" fill="#2C3539" />
              <path d="M27 36 Q32 40 37 36" stroke="#2C3539" stroke-width="2" fill="none" stroke-linecap="round" />
            </svg>`
    },
    {
      id: "casa",
      word: "CASA",
      name: "Casa",
      article: "la",
      audio: "assets/audio/casa.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,8 6,28 58,28" fill="#791E94" />
              <rect x="14" y="28" width="36" height="28" rx="3" fill="#EEF3FA" stroke="#80A1D4" stroke-width="2" />
              <rect x="27" y="38" width="10" height="18" rx="2" fill="#35A7FF" />
              <rect x="18" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <rect x="39" y="34" width="7" height="7" rx="1.5" fill="#FFD166" />
              <circle cx="34" cy="48" r="1" fill="#FFFFFF" />
            </svg>`
    },
    {
      id: "pelota",
      word: "PELOTA",
      name: "Pelota",
      article: "la",
      audio: "assets/audio/pelota.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="26" fill="#35A7FF" />
              <path d="M32 6 A26 26 0 0 0 10 44 L32 32 Z" fill="#FFD166" />
              <path d="M32 32 L48 52 A26 26 0 0 0 58 32 Z" fill="#48BF84" />
              <path d="M32 6 A26 26 0 0 1 54 44 L32 32 Z" fill="#FF4D4D" />
              <circle cx="32" cy="32" r="8" fill="#FFFFFF" />
            </svg>`
    },
    {
      id: "perro",
      word: "PERRO",
      name: "Perro",
      article: "el",
      audio: "assets/audio/perro1.mp3",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(15 14 28)" />
              <ellipse cx="50" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(-15 50 28)" />
              <circle cx="32" cy="34" r="18" fill="#D4A373" />
              <circle cx="25" cy="30" r="3" fill="#2C3539" />
              <circle cx="39" cy="30" r="3" fill="#2C3539" />
              <circle cx="26" cy="29" r="1" fill="#FFFFFF" />
              <circle cx="40" cy="29" r="1" fill="#FFFFFF" />
              <ellipse cx="32" cy="40" rx="9" ry="7" fill="#FAEDCD" />
              <polygon points="32,38 28,34 36,34" fill="#2C3539" />
              <path d="M30 43 Q32 48 34 43 Z" fill="#FF8585" />
            </svg>`
    }
  ];

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL JUEGO
  // ------------------------------------------------------------------------
  const matchedPairs = new Set();
  let selectedWordId = null;
  let selectedImageId = null;
  let shuffledImagesList = [];

  // Elementos DOM
  const screenIntro = document.getElementById('screenIntro');
  const screenGame = document.getElementById('screenGame');
  const screenVictory = document.getElementById('screenVictory');

  const btnStartGame = document.getElementById('btnStartGame');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const robotIntroImg = document.getElementById('robotIntroImg');

  const wordsContainer = document.getElementById('wordsContainer');
  const imagesContainer = document.getElementById('imagesContainer');

  const gameProgressBar = document.getElementById('gameProgressBar');
  const gameProgressCount = document.getElementById('gameProgressCount');
  const headerCounter = document.getElementById('headerCounter');

  const feedbackText = document.getElementById('feedbackText');
  const feedbackAvatar = document.getElementById('feedbackAvatar');

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN
  // ------------------------------------------------------------------------
  setupGameBoard();

  // Iniciar Juego: Ocultar pantalla 1 y mostrar tablero
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

  // Tocar a Palabrín en pantalla de inicio para escuchar instrucciones
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

  // ------------------------------------------------------------------------
  // 4. CONFIGURACIÓN Y RENDERIZADO DEL TABLERO
  // ------------------------------------------------------------------------
  function setupGameBoard() {
    // Mezclar aleatoriamente el orden de las imágenes con Fisher-Yates
    shuffledImagesList = [...PAIRS_DATA];
    for (let i = shuffledImagesList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImagesList[i], shuffledImagesList[j]] = [shuffledImagesList[j], shuffledImagesList[i]];
    }

    renderWords();
    renderImages();
    updateProgressUI();
  }

  // Renderizar Columna de Palabras (Izquierda)
  function renderWords() {
    if (!wordsContainer) return;
    wordsContainer.innerHTML = '';

    PAIRS_DATA.forEach((item) => {
      const isMatched = matchedPairs.has(item.id);
      const isSelected = selectedWordId === item.id;

      const card = document.createElement('div');
      card.className = `word-card ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''}`;
      card.id = `word-card-${item.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', isMatched ? '-1' : '0');
      card.setAttribute('draggable', isMatched ? 'false' : 'true');
      card.setAttribute('aria-label', `Palabra ${item.word}`);

      card.innerHTML = `
        ${isMatched ? '<div class="matched-badge"><i class="bi bi-check-lg"></i></div>' : ''}
        <span class="word-text">${item.word}</span>
        <span class="word-icon-hint"><i class="bi bi-cursor-fill"></i></span>
      `;

      // Evento Clic
      card.addEventListener('click', () => {
        if (!isMatched) {
          handleWordSelection(item);
        }
      });

      // Evento Teclado (Accesibilidad)
      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isMatched) {
          e.preventDefault();
          handleWordSelection(item);
        }
      });

      // Drag and Drop: Inicio de arrastre
      card.addEventListener('dragstart', (e) => {
        if (!isMatched) {
          e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'word', id: item.id }));
          handleWordSelection(item);
        }
      });

      // Drag over para permitir soltar imagen sobre palabra
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!isMatched) card.classList.add('is-dragover');
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('is-dragover');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('is-dragover');
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data && data.type === 'image' && !isMatched) {
            testMatch(item.id, data.id);
          }
        } catch (err) {
          // Ignorar datos no válidos
        }
      });

      wordsContainer.appendChild(card);
    });
  }

  // Renderizar Columna de Imágenes (Derecha, orden aleatorio)
  function renderImages() {
    if (!imagesContainer) return;
    imagesContainer.innerHTML = '';

    shuffledImagesList.forEach((item) => {
      const isMatched = matchedPairs.has(item.id);
      const isSelected = selectedImageId === item.id;

      const card = document.createElement('div');
      card.className = `image-match-card ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''}`;
      card.id = `image-card-${item.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', isMatched ? '-1' : '0');
      card.setAttribute('draggable', isMatched ? 'false' : 'true');
      card.setAttribute('aria-label', `Imagen de ${item.name}`);

      card.innerHTML = `
        ${isMatched ? '<div class="matched-badge"><i class="bi bi-check-lg"></i></div>' : ''}
        <div class="image-match-icon">
          ${item.svg}
        </div>
        <span class="image-match-hint">${isMatched ? '¡Unida!' : 'Toca para unir'}</span>
      `;

      // Evento Clic
      card.addEventListener('click', () => {
        if (!isMatched) {
          handleImageSelection(item);
        }
      });

      // Evento Teclado
      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isMatched) {
          e.preventDefault();
          handleImageSelection(item);
        }
      });

      // Drag and Drop: Inicio de arrastre
      card.addEventListener('dragstart', (e) => {
        if (!isMatched) {
          e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'image', id: item.id }));
          handleImageSelection(item);
        }
      });

      // Drag over para permitir soltar palabra sobre imagen
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!isMatched) card.classList.add('is-dragover');
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('is-dragover');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('is-dragover');
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data && data.type === 'word' && !isMatched) {
            testMatch(data.id, item.id);
          }
        } catch (err) {
          // Ignorar datos no válidos
        }
      });

      imagesContainer.appendChild(card);
    });
  }

  // ------------------------------------------------------------------------
  // 5. LÓGICA DE SELECCIÓN Y EMPAREJAMIENTO
  // ------------------------------------------------------------------------

  /**
   * Al seleccionar una palabra
   */
  function handleWordSelection(item) {
    // Si ya estaba seleccionada, deseleccionar
    if (selectedWordId === item.id) {
      selectedWordId = null;
      renderWords();
      return;
    }

    selectedWordId = item.id;
    renderWords();

    // Si ya había una imagen seleccionada, comprobar emparejamiento
    if (selectedImageId) {
      testMatch(selectedWordId, selectedImageId);
    } else {
      setFeedbackMessage(
        `Seleccionaste <strong>"${item.word}"</strong>. ¡Ahora busca su imagen a la derecha! 👉`,
        "assets/images/senalando.png"
      );
    }
  }

  /**
   * Al seleccionar una imagen
   */
  function handleImageSelection(item) {
    // Si ya estaba seleccionada, deseleccionar
    if (selectedImageId === item.id) {
      selectedImageId = null;
      renderImages();
      return;
    }

    selectedImageId = item.id;
    renderImages();

    // Si ya había una palabra seleccionada, comprobar emparejamiento
    if (selectedWordId) {
      testMatch(selectedWordId, selectedImageId);
    } else {
      setFeedbackMessage(
        `Seleccionaste una <strong>imagen</strong>. ¡Ahora busca su palabra escrita a la izquierda! 👈`,
        "assets/images/senalando.png"
      );
    }
  }

  /**
   * Valida si la palabra y la imagen coinciden
   */
  function testMatch(wordId, imageId) {
    if (wordId === imageId) {
      // ===== ¡ACIERTO! =====
      handleMatchSuccess(wordId);
    } else {
      // ===== ¡ERROR / INTENTO ERRÓNEO! =====
      handleMatchFail(wordId, imageId);
    }
  }

  /**
   * Procesa acierto: reproduce audio de la palabra, felicita y bloquea pareja
   */
  function handleMatchSuccess(matchedId) {
    const item = PAIRS_DATA.find(p => p.id === matchedId);
    matchedPairs.add(matchedId);

    selectedWordId = null;
    selectedImageId = null;

    // Reproducir fanfarria musical de acierto
    playSuccessChime();

    // Actualizar estados visuales de completado
    renderWords();
    renderImages();
    updateProgressUI();

    // Mensaje de felicitación personalizado
    setFeedbackMessage(
      `¡Excelente! <strong>¡${item.word}!</strong> Has unido la palabra con su imagen. 🎉✨`,
      "assets/images/contento.png"
    );

    // Reproducir automáticamente el audio de la palabra respectiva
    playWordAudio(item, () => {
      // Verificar si completó todas las parejas (6 de 6)
      if (matchedPairs.size >= PAIRS_DATA.length) {
        setTimeout(showVictoryScreen, 700);
      }
    });
  }

  /**
   * Procesa fallo: anima suavemente y anima a intentarlo de nuevo
   */
  function handleMatchFail(wordId, imageId) {
    const wordCard = document.getElementById(`word-card-${wordId}`);
    const imageCard = document.getElementById(`image-card-${imageId}`);

    if (wordCard) {
      wordCard.classList.add('is-wrong');
      setTimeout(() => wordCard.classList.remove('is-wrong'), 500);
    }
    if (imageCard) {
      imageCard.classList.add('is-wrong');
      setTimeout(() => imageCard.classList.remove('is-wrong'), 500);
    }

    playFailChime();

    selectedWordId = null;
    selectedImageId = null;

    setTimeout(() => {
      renderWords();
      renderImages();
    }, 400);

    const encouragePhrases = [
      "¡Casi! Esa palabra no corresponde a esa imagen. ¡Vuelve a intentarlo!",
      "¡Inténtalo otra vez! Lee con mucha atención cada letra.",
      "¡No te preocupes! Vuelve a mirar y encuentra la pareja correcta."
    ];
    const phrase = encouragePhrases[Math.floor(Math.random() * encouragePhrases.length)];

    setFeedbackMessage(
      `<strong>¡Casi!</strong> Esas dos no son pareja. ¡Inténtalo de nuevo, tú puedes! 💪`,
      "assets/images/sorprendido.png"
    );

    speakWithSpeechSynthesis(phrase);
  }

  function setFeedbackMessage(htmlContent, avatarSrc) {
    if (feedbackText) feedbackText.innerHTML = htmlContent;
    if (feedbackAvatar && avatarSrc) feedbackAvatar.src = avatarSrc;
  }

  /**
   * Reproduce el archivo de audio de la palabra con fallback a síntesis de voz
   */
  function playWordAudio(item, onEnd) {
    let played = false;
    if (item.audio) {
      const audio = new Audio(item.audio);
      audio.play().then(() => {
        played = true;
        audio.onended = () => {
          if (typeof onEnd === 'function') onEnd();
        };
      }).catch(() => {
        // Fallback a SpeechSynthesis si el archivo no está en disco
        speakWithSpeechSynthesis(`¡${item.name}!`, onEnd);
      });
    } else {
      speakWithSpeechSynthesis(`¡${item.name}!`, onEnd);
    }
  }

  // ------------------------------------------------------------------------
  // 6. PROGRESO Y CONTADORES
  // ------------------------------------------------------------------------
  function updateProgressUI() {
    const total = PAIRS_DATA.length; // 6
    const count = matchedPairs.size;
    const percentage = (count / total) * 100;

    if (gameProgressBar) {
      gameProgressBar.style.width = `${percentage}%`;
    }

    if (gameProgressCount) {
      gameProgressCount.textContent = `${count} de ${total} parejas unidas`;
    }

    if (headerCounter) {
      headerCounter.textContent = `${count} / ${total} Parejas`;
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
    const victoryAudio = new Audio("assets/audio/felici4.mp3");
    victoryAudio.play().catch(() => {
      speakWithSpeechSynthesis("¡Felicidades! Has unido todas las palabras con sus imágenes en la fábrica mágica.");
    });
  }

  function resetGame() {
    matchedPairs.clear();
    selectedWordId = null;
    selectedImageId = null;

    if (screenVictory) screenVictory.style.display = 'none';
    if (screenIntro) {
      screenIntro.style.display = 'block';
      screenIntro.style.opacity = '1';
    }
    if (screenGame) screenGame.style.display = 'none';

    setupGameBoard();
    setFeedbackMessage(
      `Toca una <strong>palabra</strong> o una <strong>imagen</strong> para comenzar a unirlas.`,
      "assets/images/senalando.png"
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function playInstructionAudio() {
    const audio = new Audio("assets/audio/subti4.mp3");
    let hasPlayed = false;
    audio.play().then(() => {
      hasPlayed = true;
    }).catch(() => {
      if (!hasPlayed) {
        speakWithSpeechSynthesis("Selecciona una palabra y únelas con su objeto.");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. SINTETIZADOR DE SONIDOS (WEB AUDIO API Y VOZ)
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

  // Fanfarria de acierto
  function playSuccessChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = t + i * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.42);
    });
  }

  // Sonido de fallo suave
  function playFailChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.25);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.28);
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


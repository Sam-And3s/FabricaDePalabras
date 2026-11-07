/**
 * ==========================================================================
 * MINIJUEGO 2: ¿QUÉ SONIDO ESTÁS ESCUCHANDO? - LÓGICA PRINCIPAL
 * Emparejamiento de sonidos y objetos, efectos de audio y felicitaciones
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initQueSonidoGame();
  playAudioFile();
});

function initQueSonidoGame() {
  // ------------------------------------------------------------------------
  // 1. DEFINICIÓN DE LOS 6 ELEMENTOS Y SUS SONIDOS
  // ------------------------------------------------------------------------
  const SOUND_ITEMS = [
    {
      id: "gato",
      name: "El Gato",
      soundEffect: "meow",
      praise: "¡Muy bien! Ese sonido lo hace el gato.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
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
      id: "perro",
      name: "El Perro",
      soundEffect: "bark",
      praise: "¡Excelente! Ese es el ladrido del perro.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
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
    },
    {
      id: "auto",
      name: "El Auto",
      soundEffect: "horn",
      praise: "¡Fantástico! Ese sonido lo produce el auto.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 36 L18 22 Q20 18 25 18 L39 18 Q44 18 47 22 L54 36 Z" fill="#35A7FF" />
              <rect x="8" y="32" width="48" height="16" rx="4" fill="#35A7FF" />
              <polygon points="21,22 25,22 25,32 17,32" fill="#FFFFFF" opacity="0.85" />
              <polygon points="28,22 38,22 43,32 28,32" fill="#FFFFFF" opacity="0.85" />
              <circle cx="18" cy="48" r="7" fill="#2C3539" />
              <circle cx="18" cy="48" r="3" fill="#EEF3FA" />
              <circle cx="46" cy="48" r="7" fill="#2C3539" />
              <circle cx="46" cy="48" r="3" fill="#EEF3FA" />
              <circle cx="53" cy="37" r="2" fill="#FFD166" />
            </svg>`
    },
    {
      id: "campana",
      name: "La Campana",
      soundEffect: "bell",
      praise: "¡Genial! Ese es el tintineo de la campana.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <rect x="29" y="8" width="6" height="8" rx="3" fill="#B37D00" />
              <path d="M18 42 C18 26 24 16 32 16 C40 16 46 26 46 42 L14 42 Z" fill="#FFD166" />
              <ellipse cx="32" cy="42" rx="18" ry="5" fill="#FFAA00" />
              <circle cx="32" cy="47" r="5" fill="#791E94" />
              <path d="M22 28 Q26 24 32 24" stroke="#FFFDF9" stroke-width="2.5" fill="none" stroke-linecap="round" />
            </svg>`
    },
    {
      id: "pajaro",
      name: "El Pajarito",
      soundEffect: "chirp",
      praise: "¡Bravo! Ese es el alegre canto del pajarito.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Cuerpo -->
              <ellipse cx="30" cy="36" rx="16" ry="14" fill="#48BF84" />
              <!-- Cabeza -->
              <circle cx="38" cy="24" r="11" fill="#48BF84" />
              <!-- Ojo -->
              <circle cx="41" cy="22" r="2.5" fill="#2C3539" />
              <circle cx="42" cy="21" r="1" fill="#FFFFFF" />
              <!-- Pico -->
              <polygon points="48,24 58,26 48,30" fill="#FFD166" />
              <!-- Ala -->
              <path d="M20 34 C24 26 34 32 32 42 C24 42 18 38 20 34 Z" fill="#3ca36f" />
              <!-- Patitas -->
              <line x1="28" y1="50" x2="28" y2="56" stroke="#FFAA00" stroke-width="2.5" />
              <line x1="34" y1="50" x2="34" y2="56" stroke="#FFAA00" stroke-width="2.5" />
            </svg>`
    },
    {
      id: "reloj",
      name: "El Reloj",
      soundEffect: "clock",
      praise: "¡Maravilloso! Ese sonido lo hace el reloj.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Campanas superiores despertador -->
              <ellipse cx="18" cy="16" rx="6" ry="4" fill="#791E94" transform="rotate(-30 18 16)" />
              <ellipse cx="46" cy="16" rx="6" ry="4" fill="#791E94" transform="rotate(30 46 16)" />
              <!-- Cuerpo reloj -->
              <circle cx="32" cy="36" r="20" fill="#791E94" />
              <circle cx="32" cy="36" r="16" fill="#FFFFFF" />
              <!-- Manecillas -->
              <line x1="32" y1="36" x2="32" y2="25" stroke="#2C3539" stroke-width="2.5" stroke-linecap="round" />
              <line x1="32" y1="36" x2="40" y2="36" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" />
              <circle cx="32" cy="36" r="2" fill="#2C3539" />
              <!-- Patas -->
              <line x1="20" y1="53" x2="16" y2="58" stroke="#791E94" stroke-width="3" stroke-linecap="round" />
              <line x1="44" y1="53" x2="48" y2="58" stroke="#791E94" stroke-width="3" stroke-linecap="round" />
            </svg>`
    },
    {
      id: "guitar",
      name: "La Guitarra",
      soundEffect: "guitar",
      praise: "¡Eso es! Ese sonido lo hace la guitarra.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Mástil -->
              <rect x="29" y="8" width="6" height="24" rx="1" fill="#D4A373" />
              <!-- Clavijero superior -->
              <rect x="27" y="5" width="10" height="7" rx="2" fill="#2C3539" />
              <!-- Cuerpo inferior de la guitarra (Caja grande) -->
              <circle cx="32" cy="45" rx="14" ry="15" fill="#FF5964" />
              <!-- Cuerpo superior de la guitarra (Caja chica) -->
              <circle cx="32" cy="29" rx="10" ry="9" fill="#FF5964" />
              <!-- Tapa central superpuesta para unificar forma -->
              <ellipse cx="32" cy="36" rx="11" ry="9" fill="#FF5964" />
              <!-- Boca de la guitarra (Agujero central) -->
              <circle cx="32" cy="39" r="4.5" fill="#2C3539" />
              <!-- Puente y cuerdas -->
              <line x1="32" y1="12" x2="32" y2="52" stroke="#FFFFFF" stroke-width="1" opacity="0.8" />
              <line x1="30.5" y1="12" x2="30.5" y2="52" stroke="#FFFFFF" stroke-width="0.8" opacity="0.6" />
              <line x1="33.5" y1="12" x2="33.5" y2="52" stroke="#FFFFFF" stroke-width="0.8" opacity="0.6" />
              <rect x="29" y="46" width="6" height="3" rx="1" fill="#FFD166" />
            </svg>`
    },
    {
      id: "vaca",
      name: "La Vaca",
      soundEffect: "vaca",
      praise: "¡Eso es! Ese sonido lo hace la vaca.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Orejas -->
              <ellipse cx="16" cy="28" rx="7" ry="10" fill="#2C3539" transform="rotate(-15 16 28)" />
              <ellipse cx="48" cy="28" rx="7" ry="10" fill="#2C3539" transform="rotate(15 48 28)" />
              <!-- Cabeza base blanca -->
              <circle cx="32" cy="34" r="17" fill="#FFFFFF" />
              <!-- Manchas negras en la cabeza -->
              <path d="M22 22 C26 18 32 20 30 26 C26 30 20 26 22 22 Z" fill="#2C3539" />
              <path d="M42 24 C45 20 50 24 47 29 C44 32 39 28 42 24 Z" fill="#2C3539" />
              <!-- Hocico rosado -->
              <ellipse cx="32" cy="42" rx="10" ry="8" fill="#FF8585" />
              <!-- Fosas nasales -->
              <circle cx="29" cy="42" r="1.5" fill="#2C3539" />
              <circle cx="35" cy="42" r="1.5" fill="#2C3539" />
              <!-- Ojos -->
              <circle cx="25" cy="32" rx="2" ry="3" fill="#2C3539" />
              <circle cx="39" cy="32" rx="2" ry="3" fill="#2C3539" />
              <circle cx="25.5" cy="31" r="1" fill="#FFFFFF" />
              <circle cx="39.5" cy="31" r="1" fill="#FFFFFF" />
              <!-- Cuernitos -->
              <polygon points="23,19 20,13 25,18" fill="#FFD166" />
              <polygon points="41,19 44,13 39,18" fill="#FFD166" />
            </svg>`
    },
    {
      id: "piano",
      name: "El Piano",
      soundEffect: "piano",
      praise: "¡Eso es! Ese sonido lo hace el piano.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Cuerpo exterior del piano (Madera o mueble oscuro / morado mágico) -->
              <rect x="10" y="16" width="44" height="34" rx="4" fill="#791E94" />
              <!-- Tapa interior del teclado -->
              <rect x="13" y="24" width="38" height="23" rx="2" fill="#2C3539" />
              <!-- Teclas blancas individuales -->
              <rect x="14" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="20.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="27" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="33.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="40" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="46.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <!-- Teclas negras (bemoles / sostenidos) superpuestas -->
              <rect x="18" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="25" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="38" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="44.5" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <!-- Patas del piano -->
              <rect x="14" y="50" width="4" height="6" fill="#521264" />
              <rect x="46" y="50" width="4" height="6" fill="#521264" />
            </svg>`
    },
    {
      id: "rana",
      name: "La Rana",
      soundEffect: "rana",
      praise: "¡Eso es! Ese sonido lo hace la rana.",
      svg: `<svg viewBox="0 0 64 64" class="image-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Patitas traseras -->
              <ellipse cx="16" cy="46" rx="8" ry="5" fill="#06D6A0" transform="rotate(-20 16 46)" />
              <ellipse cx="48" cy="46" rx="8" ry="5" fill="#06D6A0" transform="rotate(20 48 46)" />
              <!-- Cuerpo principal -->
              <ellipse cx="32" cy="38" rx="18" ry="14" fill="#06D6A0" />
              <!-- Panza clara -->
              <ellipse cx="32" cy="41" rx="11" ry="8" fill="#E2FEEF" />
              <!-- Ojos abultados superiores -->
              <circle cx="23" cy="20" r="7" fill="#06D6A0" />
              <circle cx="41" cy="20" r="7" fill="#06D6A0" />
              <!-- Pupilas -->
              <circle cx="23" cy="19" r="3.5" fill="#2C3539" />
              <circle cx="41" cy="19" r="3.5" fill="#2C3539" />
              <circle cx="24" cy="18" r="1" fill="#FFFFFF" />
              <circle cx="42" cy="18" r="1" fill="#FFFFFF" />
              <!-- Sonrisa alegre -->
              <path d="M26 36 Q32 42 38 36" stroke="#2C3539" stroke-width="2" fill="none" stroke-linecap="round" />
            </svg>`
    }
  ];

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL JUEGO
  // ------------------------------------------------------------------------
  const matchedPairs = new Set();
  let selectedSoundId = null;
  let isSpeaking = false;
  let shuffledSoundItems = []; // Orden aleatorio de las cajas de sonido

  /**
   * Algoritmo Fisher-Yates para mezclar un arreglo (copia nueva)
   */
  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Elementos DOM
  const screenIntro = document.getElementById('screenIntro');
  const screenGame = document.getElementById('screenGame');
  const screenVictory = document.getElementById('screenVictory');

  const btnStartGame = document.getElementById('btnStartGame');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const robotIntroImg = document.getElementById('robotIntroImg');

  const imagesGrid = document.getElementById('imagesGrid');
  const soundsGrid = document.getElementById('soundsGrid');

  const gameProgressBar = document.getElementById('gameProgressBar');
  const gameProgressCount = document.getElementById('gameProgressCount');
  const headerCounter = document.getElementById('headerCounter');

  const feedbackText = document.getElementById('feedbackText');
  const feedbackAvatar = document.getElementById('feedbackAvatar');

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN
  // ------------------------------------------------------------------------
  setupGameBoards();

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

  // Reiniciar Juego
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      resetGame();
    });
  }

  // ------------------------------------------------------------------------
  // 4. CONFIGURACIÓN Y RENDERIZADO DEL TABLERO
  // ------------------------------------------------------------------------
  function setupGameBoards() {
    // Generar orden aleatorio para las cajas de sonido (solo si no hay orden previo o se reinició)
    if (shuffledSoundItems.length === 0) {
      shuffledSoundItems = shuffleArray(SOUND_ITEMS);
    }
    renderImagesGrid();
    renderSoundsGrid();
    updateProgressUI();
  }

  // Renderizar imágenes (arriba)
  function renderImagesGrid() {
    if (!imagesGrid) return;
    imagesGrid.innerHTML = '';

    SOUND_ITEMS.forEach(item => {
      const isMatched = matchedPairs.has(item.id);

      const card = document.createElement('div');
      card.className = `image-card ${isMatched ? 'is-matched' : ''}`;
      card.id = `img-card-${item.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', isMatched ? '-1' : '0');
      card.setAttribute('aria-label', `Imagen de ${item.name}`);

      card.innerHTML = `
        ${isMatched ? '<div class="matched-badge"><i class="bi bi-check-lg"></i></div>' : ''}
        <div class="image-icon-wrapper">
          ${item.svg}
        </div>
        <h4 class="image-name">${item.name}</h4>
      `;

      card.addEventListener('click', () => {
        if (!isMatched) {
          handleImageSelection(item);
        }
      });

      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isMatched) {
          e.preventDefault();
          handleImageSelection(item);
        }
      });

      imagesGrid.appendChild(card);
    });
  }

  // Renderizar cajas de sonido 🔊 (abajo) - en orden aleatorio
  function renderSoundsGrid() {
    if (!soundsGrid) return;
    soundsGrid.innerHTML = '';

    // Usar el orden aleatorio generado en setupGameBoards
    shuffledSoundItems.forEach((item, index) => {
      const isMatched = matchedPairs.has(item.id);
      const isSelected = selectedSoundId === item.id;

      const box = document.createElement('div');
      box.className = `sound-box-card ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-active' : ''}`;
      box.id = `sound-box-${item.id}`;
      box.setAttribute('role', 'button');
      box.setAttribute('tabindex', isMatched ? '-1' : '0');
      box.setAttribute('aria-label', `Caja de sonido ${index + 1}`);

      box.innerHTML = `
        ${isMatched ? '<div class="matched-badge"><i class="bi bi-check-lg"></i></div>' : ''}
        <div class="sound-box-icon">
          ${isMatched ? '✔️' : '🔊'}
        </div>
        <div class="sound-box-label">Caja ${index + 1}</div>
        <div class="sound-box-hint">${isMatched ? '¡Completada!' : 'Toca para oír'}</div>
      `;

      box.addEventListener('click', () => {
        if (!isMatched) {
          handleSoundBoxSelection(item, box);
        }
      });

      box.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isMatched) {
          e.preventDefault();
          handleSoundBoxSelection(item, box);
        }
      });

      soundsGrid.appendChild(box);
    });
  }

  // ------------------------------------------------------------------------
  // 5. MECÁNICA DE INTERACCIÓN Y EMPAREJAMIENTO
  // ------------------------------------------------------------------------

  /**
   * Al tocar una caja de sonido: se activa y reproduce su sonido correspondiente
   */
  function handleSoundBoxSelection(item, boxElement) {
    selectedSoundId = item.id;

    // Actualizar visualmente la caja activa
    document.querySelectorAll('.sound-box-card').forEach(b => b.classList.remove('is-active'));
    boxElement.classList.add('is-active');

    // Reproducir el sonido correspondiente a este elemento
    playSyntheticSound(item.soundEffect);

    // Feedback del robot en el banner
    setFeedbackMessage(
      `Escuchando sonido... ¿Quién hace ese sonido? <strong>¡Elige su imagen arriba! 👆</strong>`,
      "assets/images/senalando.png"
    );
  }

  /**
   * Al tocar una imagen de la parte superior
   */
  function handleImageSelection(imageItem) {
    // Si no ha seleccionado ninguna caja de sonido todavía
    if (!selectedSoundId) {
      setFeedbackMessage(
        `¡Primero toca una <strong>caja de sonido 🔊</strong> abajo para escuchar!`,
        "assets/images/sorprendido.png"
      );
      speakWithSpeechSynthesis("Primero toca una caja de sonido abajo para escuchar.");
      return;
    }

    // Verificar si la imagen elegida coincide con la caja de sonido seleccionada
    if (imageItem.id === selectedSoundId) {
      // ===== ¡ACIERTO! =====
      handleMatchSuccess(imageItem);
    } else {
      // ===== ¡FALLO / INTENTO ERRÓNEO! =====
      handleMatchFail(imageItem);
    }
  }

  /**
   * Procesar acierto: Felicitar con mensaje personalizado y desactivar pareja
   */
  function handleMatchSuccess(item) {
    matchedPairs.add(item.id);
    selectedSoundId = null;

    // Reproducir fanfarria de acierto
    playSuccessChime();

    // Actualizar estados visuales de completado
    renderImagesGrid();
    renderSoundsGrid();
    updateProgressUI();

    // Mensaje de felicitación personalizado y diferente por cada objeto
    setFeedbackMessage(
      `<strong>${item.praise}</strong> ✨🎉`,
      "assets/images/contento.png"
    );

    // Palabrín emite el audio de felicitación personalizado
    speakWithSpeechSynthesis(item.praise, () => {
      // Verificar si completó todas las parejas (6 de 6)
      if (matchedPairs.size >= SOUND_ITEMS.length) {
        setTimeout(showVictoryScreen, 600);
      }
    });
  }

  /**
   * Procesar fallo: Animar suavemente a intentar de nuevo
   */
  function handleMatchFail(imageItem) {
    const cardEl = document.getElementById(`img-card-${imageItem.id}`);
    if (cardEl) {
      cardEl.classList.add('is-wrong');
      setTimeout(() => cardEl.classList.remove('is-wrong'), 500);
    }

    playFailChime();

    const encouragePhrases = [
      "¡Casi! Ese sonido no es de este objeto. ¡Prueba otra imagen!",
      "¡Inténtalo otra vez! Escucha con mucha atención.",
      "¡No te rindas! Vuelve a escuchar la caja y busca la imagen correcta."
    ];
    const phrase = encouragePhrases[Math.floor(Math.random() * encouragePhrases.length)];

    setFeedbackMessage(
      `<strong>¡Casi!</strong> Ese sonido no pertenece a ${imageItem.name}. ¡Intenta con otra imagen! 💪`,
      "assets/images/emocionado.png"
    );

    speakWithSpeechSynthesis(phrase);
  }

  function setFeedbackMessage(htmlContent, avatarSrc) {
    if (feedbackText) feedbackText.innerHTML = htmlContent;
    if (feedbackAvatar && avatarSrc) feedbackAvatar.src = avatarSrc;
  }

  // ------------------------------------------------------------------------
  // 6. PROGRESO Y CONTADORES
  // ------------------------------------------------------------------------
  function updateProgressUI() {
    const total = SOUND_ITEMS.length;
    const count = matchedPairs.size;
    const percentage = (count / total) * 100;

    if (gameProgressBar) {
      gameProgressBar.style.width = `${percentage}%`;
    }

    const textStatus = `${count} de ${total} parejas descubiertas`;
    if (gameProgressCount) {
      gameProgressCount.textContent = textStatus;
    }

    if (headerCounter) {
      headerCounter.textContent = `${count} / ${total} Sonidos`;
    }
  }

  // ------------------------------------------------------------------------
  // 7. PANTALLA DE FINALIZACIÓN (4 OPCIONES)
  // ------------------------------------------------------------------------
  function showVictoryScreen() {
    if (screenGame) screenGame.style.display = 'none';
    if (screenVictory) {
      screenVictory.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Reproducir audio o locución festiva final
    const victoryAudio = new Audio("assets/audio/felici2.mp3");
    victoryAudio.play().catch(() => {
      speakWithSpeechSynthesis("¡Felicidades! Has descubierto todos los sonidos de la fábrica mágica.");
    });
  }

  function resetGame() {
    matchedPairs.clear();
    selectedSoundId = null;

    // Generar nuevo orden aleatorio para las cajas de sonido
    shuffledSoundItems = shuffleArray(SOUND_ITEMS);

    if (screenVictory) screenVictory.style.display = 'none';
    if (screenIntro) {
      screenIntro.style.display = 'block';
      screenIntro.style.opacity = '1';
    }
    if (screenGame) screenGame.style.display = 'none';

    setupGameBoards();
    setFeedbackMessage(
      `Toca una <strong>caja de sonido 🔊</strong> para comenzar a escuchar.`,
      "assets/images/senalando.png"
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ------------------------------------------------------------------------
  // 8. SINTETIZADOR DE SONIDOS (WEB AUDIO API Y SPEECH SYNTHESIS)
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

  /**
   * Genera los efectos sonoros característicos de cada objeto
   */
  function playSyntheticSound(type) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case "meow": // GATO: Miau
        playAudioFile("assets/audio/gato.mp3");
        break;

      case "bark": // PERRO: Guau guau
        playAudioFile("assets/audio/perro.mp3");
        break;

      case "horn": // AUTO: Bocina Bip Bip
        playAudioFile("assets/audio/carro.mp3");
        break;

      case "bell": // CAMPANA: Tintineo Din Don
        playAudioFile("assets/audio/campana.mp3");
        break;

      case "chirp": // PAJARITO: Pío pío
        playAudioFile("assets/audio/pajaro.mp3");
        break;

      case "clock": // RELOJ: Tic Tac
        playAudioFile("assets/audio/reloj.mp3");
        break;
      case "guitar":
        playAudioFile("assets/audio/guitarra.mp3");
        break;
      case "vaca":
        playAudioFile("assets/audio/vaca.mp3");
        break;
      case "piano":
        playAudioFile("assets/audio/piano.mp3");
        break;
      case "rana":
        playAudioFile("assets/audio/rana.mp3");
        break;
    }
  }

  // Sonido de Acierto Festivo
  function playSuccessChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = t + i * 0.09;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.22, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  // Sonido de Fallo Suave
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

  // Síntesis de voz en español para Palabrín
  function speakWithSpeechSynthesis(text, onEnd) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
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

function playAudioFile(filePath) {
  // Usamos tu misma lógica global para evitar que los audios se encimen
  if (typeof currentActiveAudio !== 'undefined' && currentActiveAudio) {
    currentActiveAudio.pause();
    currentActiveAudio.currentTime = 0;
  }

  currentActiveAudio = new Audio(filePath);
  currentActiveAudio.volume = 0.9;

  currentActiveAudio.play().catch(error => {
    console.log("Error al reproducir el audio:", error);
  });
}


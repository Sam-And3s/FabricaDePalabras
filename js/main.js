/**
 * ==========================================================================
 * LA FÁBRICA MÁGICA DE LAS PALABRAS - SCRIPT PRINCIPAL
 * Interacciones lúdicas, control de navegación y bienvenida del Robot
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes y eventos
  initMagicMenu();
  initGlobalAudioPlayer();
  initInteractiveRobot();
});

/**
 * 1. Control del Menú Hamburguesa / Offcanvas
 * Integra y extiende el componente Offcanvas de Bootstrap 5
 */
let magicOffcanvasInstance = null;

function initMagicMenu() {
  const offcanvasElement = document.getElementById('offcanvasNav');
  const menuButton = document.getElementById('btnMagicMenu');

  if (offcanvasElement && typeof bootstrap !== 'undefined') {
    // Instanciar el objeto Offcanvas de Bootstrap
    magicOffcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

    // Evento de clic en botón menú personalizado
    if (menuButton) {
      menuButton.addEventListener('click', () => {
        toggleMagicMenu();
      });
    }

    // Cerrar automáticamente el menú al hacer clic en un enlace de navegación
    const navLinks = offcanvasElement.querySelectorAll('.magic-nav-item');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMagicMenu();
      });
    });
  }
}

// Variable global para que solo suene un audio a la vez
let currentActiveAudio = null;

function initGlobalAudioPlayer() {
  // Selecciona absolutamente todo lo que tenga el atributo data-audio en la página
  const interactiveElements = document.querySelectorAll('[data-audio]');

  interactiveElements.forEach(element => {
    element.addEventListener('click', function(event) {
      
      // ¡AQUÍ ESTÁ! Evitamos que el clic "suba" al div o contenedor de atrás
      event.stopPropagation();

      const audioPath = this.getAttribute('data-audio');
      const targetUrl = this.getAttribute('href');

      // 1. Si hay un audio sonando, lo pausamos y reiniciamos de inmediato
      if (currentActiveAudio) {
        currentActiveAudio.pause();
        currentActiveAudio.currentTime = 0;
      }

      // 2. Creamos y reproducimos el nuevo audio
      currentActiveAudio = new Audio(audioPath);
      currentActiveAudio.volume = 0.8;

      currentActiveAudio.play().catch(error => {
        console.log("El navegador bloqueó la reproducción automática:", error);
      });

      // 3. Si el elemento es un enlace o debe redirigir al terminar el audio
      if (targetUrl) {
        event.preventDefault(); // Frena el salto inmediato

        currentActiveAudio.addEventListener('ended', function() {
          window.location.href = targetUrl;
        });

        // Respaldo por si el audio falla
        currentActiveAudio.addEventListener('error', function() {
          window.location.href = targetUrl;
        });
      }
    });
  });
}

/**
 * Abre explícitamente el menú lateral
 */
function openMagicMenu() {
  if (magicOffcanvasInstance) {
    magicOffcanvasInstance.show();
  }
}

/**
 * Cierra explícitamente el menú lateral
 */
function closeMagicMenu() {
  if (magicOffcanvasInstance) {
    magicOffcanvasInstance.hide();
  }
}

/**
 * 2. Interacciones visuales y sonoras con el Robot Guardián
 * Controla la secuencia:
 * - Al hacer clic, reproduce el audio de la frase actual sin cambiar imagen ni texto.
 * - Al finalizar el audio, realiza la transición a la siguiente frase e imagen,
 *   y pasa a reproducir el segundo audio.
 * - Evita clics repetidos mientras un audio esté en reproducción.
 */
function initInteractiveRobot() {
  // En index.html el elemento id="robotMascot" es directamente la etiqueta <img>
  const robotElement = document.getElementById('robotMascot');
  const robotImg = robotElement ? (robotElement.tagName === 'IMG' ? robotElement : robotElement.querySelector('img')) : null;
  const speechText = document.getElementById('robotSpeechText');
  const phraseBtn = document.getElementById('btnChangePhrase');

  // 1. Frases educativas y de refuerzo positivo
  const magicPhrases = [
    "¡Bienveni@s a la fábrica de las palabras!",
    "¡Reconoce objetos y aprende sus nombres! 💎",
    "¡Relaciona sonidos con el objeto que lo produce! 🔊👂",
    "Observa el objeto y descríbelo 👀🗣️",
    "¡Encuentra la palabra que dice Palabrín! ⭐✨",
    "¡Ayuda a Palabrín a completar su misión más importante! 🦸‍♂️"
  ];

  // 2. Rutas de las imágenes (relativas a la raíz donde está index.html)
  const magicImages = [
    "assets/images/contento.png",
    "assets/images/senalando.png",
    "assets/images/emocionado.png",
    "assets/images/sorprendido.png",
    "assets/images/smile.png",
    "assets/images/senalandoCompleto.png"
  ];

  // 3. Rutas de los audios correspondientes a cada frase
  const magicAudios = [
    "assets/audio/bienvenidos.mp3",
    "assets/audio/reconoce.mp3",
    "assets/audio/relaciona.mp3",
    "assets/audio/observa.mp3",
    "assets/audio/encuentra.mp3",
    "assets/audio/ayuda.mp3"
  ];

  let phraseIndex = 0;
  let isPlaying = false;
  let hasInitialAudioPlayed = false;
  let currentAudioInstance = null;

  /**
   * Reproduce un audio de forma segura con control de errores y callback al terminar
   */
  function playAudio(audioSrc, onEnded) {
    if (currentAudioInstance) {
      currentAudioInstance.pause();
      currentAudioInstance = null;
    }

    const audio = new Audio(audioSrc);
    audio.volume = 0.7;
    currentAudioInstance = audio;

    let callbackTriggered = false;
    const triggerEnd = () => {
      if (!callbackTriggered) {
        callbackTriggered = true;
        if (typeof onEnded === 'function') onEnded();
      }
    };

    // Evento cuando el audio finaliza normalmente
    audio.addEventListener('ended', triggerEnd);

    // Manejo de error (por ejemplo, si el archivo aún no existe en disco)
    audio.addEventListener('error', (e) => {
      console.warn(`[La Fábrica Mágica] Audio no encontrado o no reproducible: ${audioSrc}`, e);
      setTimeout(triggerEnd, 1000);
    });

    // Intentar reproducir
    audio.play().catch(err => {
      console.warn(`[La Fábrica Mágica] Error al iniciar reproducción de audio:`, err);
      setTimeout(triggerEnd, 800);
    });
  }

  /**
   * Actualiza la interfaz visual (texto del globo e imagen del robot) con animación fade
   */
  function updateRobotUI(newIndex) {
    // Desvanecer texto e imagen
    if (speechText) {
      speechText.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      speechText.style.opacity = '0';
      speechText.style.transform = 'translateY(6px)';
    }

    if (robotImg) {
      robotImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      robotImg.style.opacity = '0';
      robotImg.style.transform = 'scale(0.95)';
    }

    // Cambiar contenido y volver a mostrar
    setTimeout(() => {
      if (speechText) {
        speechText.textContent = magicPhrases[newIndex];
        speechText.style.opacity = '1';
        speechText.style.transform = 'translateY(0)';
      }

      if (robotImg) {
        robotImg.src = magicImages[newIndex];
        robotImg.style.opacity = '1';
        robotImg.style.transform = 'scale(1)';
      }
    }, 250);
  }

  /**
   * Activa/desactiva estados visuales de "hablando"
   */
  function setSpeakingState(speaking) {
    if (robotElement) {
      if (speaking) {
        robotElement.classList.add('is-talking');
      } else {
        robotElement.classList.remove('is-talking');
      }
    }

    if (phraseBtn) {
      if (speaking) {
        phraseBtn.classList.add('disabled');
        phraseBtn.setAttribute('aria-disabled', 'true');
      } else {
        phraseBtn.classList.remove('disabled');
        phraseBtn.removeAttribute('aria-disabled');
      }
    }
  }

  /**
   * Manejador de la interacción (clic en botón o robot)
   */
  function handleRobotInteraction() {
    // Si ya está reproduciendo, ignorar nuevos clics para evitar solapamientos
    if (isPlaying) {
      if (robotElement) {
        robotElement.classList.add('animate-bounce');
        setTimeout(() => robotElement.classList.remove('animate-bounce'), 500);
      }
      return;
    }

    // CASO 1: Primera interacción tras cargar la página
    // No cambia imagen ni texto hasta que termine de sonar el primer audio (bienvenida)
    if (!hasInitialAudioPlayed) {
      isPlaying = true;
      setSpeakingState(true);

      // 1. Reproducir el audio que YA ESTÁ (índice 0: bienvenidos.mp3)
      playAudio(magicAudios[phraseIndex], () => {
        hasInitialAudioPlayed = true;

        // 2. Al acabar el primer audio: cambiar imagen y frase al siguiente índice (1)
        phraseIndex = (phraseIndex + 1) % magicPhrases.length;
        updateRobotUI(phraseIndex);

        // 3. Y pasa a reproducir el segundo audio
        playAudio(magicAudios[phraseIndex], () => {
          isPlaying = false;
          setSpeakingState(false);
        });
      });
      return;
    }

    // CASO 2: Siguientes interacciones
    // Avanza a la siguiente frase e imagen, y reproduce el audio correspondiente
    isPlaying = true;
    setSpeakingState(true);

    phraseIndex = (phraseIndex + 1) % magicPhrases.length;
    updateRobotUI(phraseIndex);

    playAudio(magicAudios[phraseIndex], () => {
      isPlaying = false;
      setSpeakingState(false);
    });
  }

  // Asignar eventos de interacción al hacer clic en el robot o en el botón
  if (robotElement) {
    robotElement.addEventListener('click', handleRobotInteraction);
  }

  if (phraseBtn) {
    phraseBtn.addEventListener('click', handleRobotInteraction);
  }
}


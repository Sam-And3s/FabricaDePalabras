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

document.addEventListener('DOMContentLoaded', function() {
  const btnPlay = document.getElementById('btnPlayVideo');
  const videoWrapper = document.getElementById('magicVideoWrapper');
  const videoElement = document.getElementById('palabrinVideo');

  if (btnPlay && videoWrapper && videoElement) {
    btnPlay.addEventListener('click', function() {
      // 1. Si hay algún audio global de Palabrín sonando, lo pausamos para que no colisione
      if (typeof currentActiveAudio !== 'undefined' && currentActiveAudio) {
        currentActiveAudio.pause();
        currentActiveAudio.currentTime = 0;
      }

      // 2. Lógica de Reinicio / Reproducción:
      // Si el video ya se está reproduciendo o ya avanzó en su tiempo, lo reiniciamos al segundo 0
      if (!videoElement.paused || videoElement.currentTime > 0) {
        videoElement.pause();
        videoElement.currentTime = 0; // Se devuelve al inicio exacto
      }

      // 3. Reproducimos el video
      videoElement.play().catch(error => {
        console.log("El navegador requirió interacción manual para el video:", error);
      });
    });
  }
});

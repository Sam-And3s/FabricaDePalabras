/**
 * ==========================================================================
 * MINIJUEGO 5 FINAL: LA GRAN MISIÓN DE PALABRÍN - SCRIPT PRINCIPAL
 * Integración de los 3 Retos Mágicos:
 *  - Reto 1 (Sonidos): Escuchar sonido, elegir imagen y repetir nombre
 *  - Reto 2 (Nombrar/Observar): Observar imagen, responder preguntas orales
 *  - Reto 3 (Palabras): Escuchar palabra y elegir su imagen
 *
 * Sistema de 3 Estrellas, progresión automática fluida y pantalla de victoria.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMisionPalabrinGame();
});

function initMisionPalabrinGame() {
  // ------------------------------------------------------------------------
  // 1. BANCOS DE DATOS OFICIALES DE CADA MINIJUEGO
  // ------------------------------------------------------------------------

  // Banco Reto 1: Sonidos Mágicos (10 elementos de Minijuego 2)
  const SOUND_POOL = [
    {
      id: "gato",
      name: "El Gato",
      soundEffect: "meow",
      audioFile: "assets/audio/gato.mp3",
      praise: "¡Muy bien! Ese sonido lo hace el gato.",
      hint: "Es una mascota tierna que dice '¡miau!' y ronronea cuando la acaricias.",
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
      id: "perro",
      name: "El Perro",
      soundEffect: "bark",
      audioFile: "assets/audio/perro.mp3",
      praise: "¡Excelente! Ese es el ladrido del perro.",
      hint: "Es el mejor amigo del ser humano, ladra diciendo '¡guau guau!' y mueve la cola.",
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
    },
    {
      id: "auto",
      name: "El Carro",
      soundEffect: "horn",
      audioFile: "assets/audio/carro.mp3",
      praise: "¡Fantástico! Ese sonido lo produce el carro.",
      hint: "Tiene cuatro ruedas y hace sonar su bocina '¡pii-pii!' en la calle.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      audioFile: "assets/audio/campana.mp3",
      praise: "¡Genial! Ese es el tintineo de la campana.",
      hint: "Es de metal dorado y suena '¡ding-dong!' para llamar la atención.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      audioFile: "assets/audio/pajaro.mp3",
      praise: "¡Bravo! Ese es el alegre canto del pajarito.",
      hint: "Tiene alitas de colores, vuela por el cielo y canta con su dulce pío-pío.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="30" cy="36" rx="16" ry="14" fill="#48BF84" />
              <circle cx="38" cy="24" r="11" fill="#48BF84" />
              <circle cx="41" cy="22" r="2.5" fill="#2C3539" />
              <circle cx="42" cy="21" r="1" fill="#FFFFFF" />
              <polygon points="48,24 58,26 48,30" fill="#FFD166" />
              <ellipse cx="24" cy="37" rx="8" ry="5" fill="#3CA36F" transform="rotate(-15 24 37)" />
              <path d="M14 40 L6 36 L12 44 Z" fill="#3CA36F" />
            </svg>`
    },
    {
      id: "reloj",
      name: "El Reloj",
      soundEffect: "clock",
      audioFile: "assets/audio/reloj.mp3",
      praise: "¡Muy bien! Ese es el tic-tac del reloj.",
      hint: "Tiene manecillas que marcan las horas y hace un rítmico '¡tic-tac, tic-tac!'.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="18" cy="16" rx="6" ry="4" fill="#791E94" transform="rotate(-30 18 16)" />
              <ellipse cx="46" cy="16" rx="6" ry="4" fill="#791E94" transform="rotate(30 46 16)" />
              <circle cx="32" cy="36" r="20" fill="#791E94" />
              <circle cx="32" cy="36" r="16" fill="#FFFFFF" />
              <line x1="32" y1="36" x2="32" y2="25" stroke="#2C3539" stroke-width="2.5" stroke-linecap="round" />
              <line x1="32" y1="36" x2="40" y2="36" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" />
              <circle cx="32" cy="36" r="2" fill="#2C3539" />
              <line x1="20" y1="53" x2="16" y2="58" stroke="#791E94" stroke-width="3" stroke-linecap="round" />
              <line x1="44" y1="53" x2="48" y2="58" stroke="#791E94" stroke-width="3" stroke-linecap="round" />
            </svg>`
    },
    {
      id: "guitarra",
      name: "La Guitarra",
      soundEffect: "guitar",
      audioFile: "assets/audio/guitarra.mp3",
      praise: "¡Hermoso! Es la melodía de la guitarra.",
      hint: "Tiene cuerdas musicales y una caja de madera que suena al tocarlas.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="29" y="8" width="6" height="24" rx="1" fill="#D4A373" />
              <rect x="27" y="5" width="10" height="7" rx="2" fill="#2C3539" />
              <circle cx="32" cy="45" r="14" fill="#FF5964" />
              <circle cx="32" cy="29" r="9" fill="#FF5964" />
              <circle cx="32" cy="39" r="4.5" fill="#2C3539" />
              <line x1="32" y1="12" x2="32" y2="52" stroke="#FFFFFF" stroke-width="1" opacity="0.8" />
              <rect x="29" y="46" width="6" height="3" rx="1" fill="#FFD166" />
            </svg>`
    },
    {
      id: "vaca",
      name: "La Vaca",
      soundEffect: "vaca",
      audioFile: "assets/audio/vaca.mp3",
      praise: "¡Súper! La vaca hace muuu.",
      hint: "Vive en la granja, tiene manchas y nos da rica leche.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="28" rx="7" ry="10" fill="#2C3539" transform="rotate(-15 16 28)" />
              <ellipse cx="48" cy="28" rx="7" ry="10" fill="#2C3539" transform="rotate(15 48 28)" />
              <circle cx="32" cy="34" r="17" fill="#FFFFFF" />
              <ellipse cx="32" cy="42" rx="10" ry="8" fill="#FF8585" />
              <circle cx="29" cy="42" r="1.5" fill="#2C3539" />
              <circle cx="35" cy="42" r="1.5" fill="#2C3539" />
              <circle cx="25" cy="32" r="2" fill="#2C3539" />
              <circle cx="39" cy="32" r="2" fill="#2C3539" />
              <polygon points="23,19 20,13 25,18" fill="#FFD166" />
              <polygon points="41,19 44,13 39,18" fill="#FFD166" />
            </svg>`
    },
    {
      id: "piano",
      name: "El Piano",
      soundEffect: "piano",
      audioFile: "assets/audio/piano.mp3",
      praise: "¡Qué bien! Es la música del piano.",
      hint: "Tiene teclas blancas y negras que tocan hermosas canciones.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="16" width="44" height="34" rx="4" fill="#791E94" />
              <rect x="13" y="24" width="38" height="23" rx="2" fill="#2C3539" />
              <rect x="14" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="20.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="27" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="33.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="40" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="46.5" y="25" width="5.5" height="21" rx="1" fill="#FFFFFF" />
              <rect x="18" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="25" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="38" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
              <rect x="44.5" y="25" width="3.5" height="13" rx="0.5" fill="#2C3539" />
            </svg>`
    },
    {
      id: "rana",
      name: "La Rana",
      soundEffect: "rana",
      audioFile: "assets/audio/rana.mp3",
      praise: "¡Genial! La rana hace croac croac.",
      hint: "Es verde, da saltos grandes y le gusta el agua y las lagunas.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="46" rx="8" ry="5" fill="#06D6A0" transform="rotate(-20 16 46)" />
              <ellipse cx="48" cy="46" rx="8" ry="5" fill="#06D6A0" transform="rotate(20 48 46)" />
              <ellipse cx="32" cy="38" rx="18" ry="14" fill="#06D6A0" />
              <circle cx="23" cy="20" r="7" fill="#06D6A0" />
              <circle cx="41" cy="20" r="7" fill="#06D6A0" />
              <circle cx="23" cy="19" r="3.5" fill="#2C3539" />
              <circle cx="41" cy="19" r="3.5" fill="#2C3539" />
              <circle cx="24" cy="18" r="1" fill="#FFFFFF" />
              <circle cx="42" cy="18" r="1" fill="#FFFFFF" />
              <path d="M26 36 Q32 42 38 36" stroke="#2C3539" stroke-width="2" fill="none" stroke-linecap="round" />
            </svg>`
    }
  ];

  // Banco Reto 2: Nombrar y Observar (5 elementos de Minijuego 3)
  const NAMING_POOL = [
    {
      id: "flor",
      name: "La Flor",
      question: "¿Qué objeto es este que estás viendo? ¿De qué color son sus pétalos y qué necesita para crecer?",
      hint: "Crece en jardines, tiene pétalos de colores y necesita agua y sol.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 36 L32 58" stroke="#48BF84" stroke-width="4" stroke-linecap="round" />
              <path d="M32 46 Q24 40 18 46 Q26 52 32 48" fill="#48BF84" />
              <circle cx="32" cy="18" r="8" fill="#FF85C0" />
              <circle cx="44" cy="27" r="8" fill="#FF85C0" />
              <circle cx="39" cy="40" r="8" fill="#FF85C0" />
              <circle cx="25" cy="40" r="8" fill="#FF85C0" />
              <circle cx="20" cy="27" r="8" fill="#FF85C0" />
              <circle cx="32" cy="30" r="7" fill="#FFD166" />
            </svg>`
    },
    {
      id: "casa",
      name: "La Casa",
      question: "¿Qué lugar es este que estás viendo? ¿De qué color es su techo y quiénes viven en ella con amor?",
      hint: "Es el hogar donde vive la familia y nos protege de la lluvia y el frío.",
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
      name: "La Pelota",
      question: "¿Qué objeto redondo es este? ¿Para qué juegos divertidos sirve rebotarla?",
      hint: "Es redonda, rebota contra el suelo y sirve para jugar fútbol y básquetbol.",
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
      name: "El Perro",
      question: "¿Qué animalito estás viendo aquí? ¿Cómo hace su ladrido y cómo juega con su cola?",
      hint: "Es un perrito juguetón que mueve la cola y dice ¡guau guau!",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(15 14 28)" />
              <ellipse cx="50" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(-15 50 28)" />
              <circle cx="32" cy="34" r="18" fill="#D4A373" />
              <circle cx="25" cy="30" r="3" fill="#2C3539" />
              <circle cx="39" cy="30" r="3" fill="#2C3539" />
              <ellipse cx="32" cy="40" rx="9" ry="7" fill="#FAEDCD" />
              <polygon points="32,38 28,34 36,34" fill="#2C3539" />
              <path d="M30 43 Q32 48 34 43 Z" fill="#FF8585" />
            </svg>`
    },
    {
      id: "manzana",
      name: "La Manzana",
      question: "¿Qué fruta deliciosa es esta? ¿De qué color brillante es y a qué sabe cuando la muerdes?",
      hint: "Es una fruta roja, deliciosa y saludable que crece en los árboles.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 14 C35 8 41 5 46 6 C47 11 43 17 38 18 Z" fill="#48BF84" />
              <path d="M32 16 C30 11 26 8 28 4" stroke="#791E94" stroke-width="3" stroke-linecap="round" fill="none" />
              <path d="M32 20 C24 16 12 20 12 34 C12 48 24 58 32 58 C40 58 52 48 52 34 C52 20 40 16 32 20 Z" fill="#FF4D4D" />
              <ellipse cx="24" cy="28" rx="4" ry="7" fill="#FF8585" opacity="0.6" transform="rotate(-20 24 28)" />
            </svg>`
    }
  ];

  // Banco Reto 3: Palabras Mágicas (6 elementos de Minijuego 4)
  const WORDS_POOL = [
    {
      id: "manzana",
      word: "MANZANA",
      name: "Manzana",
      hint: "Es una fruta roja y deliciosa que comienza con la letra M.",
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
      hint: "Es un animalito felino de 4 letras y dice miau.",
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
      hint: "Es una palabra de 3 letras que brilla con calor en el cielo.",
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
      hint: "Es el lugar con techo y puertas donde vivimos con la familia.",
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
      hint: "Es el juguete redondo que bota y rueda por el suelo.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="26" fill="#35A7FF" />
              <path d="M32 6 A26 26 0 0 0 10 44 L32 32 Z" fill="#FFD166" />
              <path d="M32 32 L48 52 A26 26 0 0 0 58 32 Z" fill="#48BF84" />
              <circle cx="32" cy="32" r="8" fill="#FFFFFF" />
            </svg>`
    },
    {
      id: "perro",
      word: "PERRO",
      name: "Perro",
      hint: "Es el animalito peludo con dos 'R' que mueve la cola.",
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(15 14 28)" />
              <ellipse cx="50" cy="28" rx="6" ry="12" fill="#8D5B4C" transform="rotate(-15 50 28)" />
              <circle cx="32" cy="34" r="18" fill="#D4A373" />
              <circle cx="25" cy="30" r="3" fill="#2C3539" />
              <circle cx="39" cy="30" r="3" fill="#2C3539" />
              <ellipse cx="32" cy="40" rx="9" ry="7" fill="#FAEDCD" />
              <polygon points="32,38 28,34 36,34" fill="#2C3539" />
              <path d="M30 43 Q32 48 34 43 Z" fill="#FF8585" />
            </svg>`
    }
  ];

  // Metadatos de presentación de cada uno de los 3 Retos Mágicos
  const RETO_PRESENTATION_DATA = {
    1: {
      badge: "Reto 1: Los Sonidos Mágicos",
      title: "¿Qué sonido estás escuchando?",
      instruction: "Escucha con atención y elige el objeto que hace ese sonido.",
      icon: "bi-volume-up-fill",
      audio: "assets/audio/subti22.mp3",
      avatar: "assets/images/senalando.png"
    },
    2: {
      badge: "Reto 2: El Observador de Detalles",
      title: "¡Cuéntame qué estás viendo!",
      instruction: "Observa y responde a las preguntas que te hace Palabrín.",
      icon: "bi-eye-fill",
      audio: "assets/audio/subti33.mp3",
      avatar: "assets/images/instrucciones.png"
    },
    3: {
      badge: "Reto 3: El Maestro de las Palabras",
      title: "Unamos las palabras con sus imágenes",
      instruction: "Escucha la palabra mágica y selecciona la imagen correspondiente.",
      icon: "bi-fonts",
      audio: "assets/audio/subti4.mp3",
      avatar: "assets/images/contento.png"
    }
  };

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL JUEGO
  // ------------------------------------------------------------------------
  let currentReto = 1; // 1: Sonidos, 2: Nombrar, 3: Palabras
  let currentExerciseIndex = 0; // 0, 1, 2
  const EXERCISES_PER_RETO = 3;

  // Listas de ejercicios seleccionados aleatoriamente en cada partida
  let reto1Exercises = [];
  let reto2Exercises = [];
  let reto3Exercises = [];

  const completedRetos = new Set(); // 1, 2, 3

  // Elementos DOM
  const screenIntro = document.getElementById('screenIntro');
  const screenGame = document.getElementById('screenGame');
  const screenVictory = document.getElementById('screenVictory');

  const btnStartGame = document.getElementById('btnStartGame');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const robotIntroImg = document.getElementById('robotIntroImg');

  const starBadge1 = document.getElementById('starBadge1');
  const starBadge2 = document.getElementById('starBadge2');
  const starBadge3 = document.getElementById('starBadge3');

  const gameProgressBar = document.getElementById('gameProgressBar');
  const gameProgressCount = document.getElementById('gameProgressCount');
  const headerCounter = document.getElementById('headerCounter');

  const feedbackText = document.getElementById('feedbackText');
  const feedbackAvatar = document.getElementById('feedbackAvatar');

  const currentRetoBadge = document.getElementById('currentRetoBadge');
  const currentExerciseBadge = document.getElementById('currentExerciseBadge');
  const challengeContentArea = document.getElementById('challengeContentArea');
  const hintArea = document.getElementById('hintArea');

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN
  // ------------------------------------------------------------------------
  initMissionExercises();

  // Iniciar Gran Misión
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
        loadCurrentExercise(true); // true = presentar reto al entrar
      }, 250);
    });
  }

  // Tocar a Palabrín en la pantalla de inicio para escuchar instrucciones
  if (robotIntroImg) {
    robotIntroImg.addEventListener('click', () => {
      playAudioFile("assets/audio/subti5.mp3", () => {
        speakWithSpeechSynthesis("Tendrás que ayudar a Palabrín con su misión más importante, usando todo lo que ya aprendiste.");
      });
    });
  }

  // Reiniciar Gran Misión
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      resetGame();
    });
  }

  // ------------------------------------------------------------------------
  // 4. GENERACIÓN DE EJERCICIOS ALEATORIOS
  // ------------------------------------------------------------------------
  function initMissionExercises() {
    reto1Exercises = getRandomSubset(SOUND_POOL, EXERCISES_PER_RETO);
    reto2Exercises = getRandomSubset(NAMING_POOL, EXERCISES_PER_RETO);
    reto3Exercises = getRandomSubset(WORDS_POOL, EXERCISES_PER_RETO);
    updateStarsTrackerUI();
    updateProgressUI();
  }

  function getRandomSubset(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // ------------------------------------------------------------------------
  // 5. CONTROLADOR PRINCIPAL DE RETOS Y EJERCICIOS
  // ------------------------------------------------------------------------
  function loadCurrentExercise(isFirstOfReto = false) {
    hideHint();

    // Actualizar contadores y badges
    updateExerciseBadges();
    updateProgressUI();

    // Reproducir audio de presentación al comenzar un nuevo reto
    if (isFirstOfReto || currentExerciseIndex === 0) {
      presentCurrentRetoAudio();
    }

    if (currentReto === 1) {
      renderReto1_Sonidos();
    } else if (currentReto === 2) {
      renderReto2_Nombrar();
    } else if (currentReto === 3) {
      renderReto3_Palabras();
    }
  }

  function updateExerciseBadges() {
    const meta = RETO_PRESENTATION_DATA[currentReto];
    if (currentRetoBadge && meta) {
      currentRetoBadge.innerHTML = `
        <span class="current-reto-pill">
          <i class="bi ${meta.icon}"></i> ${meta.badge}
        </span>`;
    }
    if (currentExerciseBadge) {
      currentExerciseBadge.innerHTML = `
        <span class="current-exercise-pill">Ejercicio ${currentExerciseIndex + 1} de ${EXERCISES_PER_RETO}</span>`;
    }
  }

  function presentCurrentRetoAudio() {
    const meta = RETO_PRESENTATION_DATA[currentReto];
    if (!meta) return;

    setFeedbackMessage(
      `¡Bienvenido a <strong>${meta.badge}</strong>! ${meta.instruction}`,
      meta.avatar
    );

    // Reproducir audio oficial de presentación del reto (subti2, subti3, subti4)
    if (meta.audio) {
      playAudioFile(meta.audio, () => {
        // Fallback a SpeechSynthesis si fuera necesario
      });
    } else {
      speakWithSpeechSynthesis(meta.instruction);
    }
  }

  // Genera el banner HTML de presentación que encabeza cada reto
  function getRetoPresentationBannerHtml() {
    const meta = RETO_PRESENTATION_DATA[currentReto];
    if (!meta) return '';

    return `
      <div class="reto-presentation-banner">
        <div class="reto-presentation-info">
          <div class="reto-presentation-icon">
            <i class="bi ${meta.icon}"></i>
          </div>
          <div>
            <span class="reto-presentation-badge">${meta.badge}</span>
            <h3 class="reto-presentation-title">${meta.title}</h3>
            <p class="reto-presentation-desc">${meta.instruction}</p>
          </div>
        </div>
        <button type="button" id="btnPlayRetoInstruc" class="btn-kid btn-secondary-kid btn-sm shadow-sm" title="Escuchar instrucciones del reto">
          <i class="bi bi-volume-up-fill fs-5"></i> Instrucciones
        </button>
      </div>
    `;
  }

  function bindRetoInstructionsButton() {
    const btn = document.getElementById('btnPlayRetoInstruc');
    if (btn) {
      btn.addEventListener('click', () => {
        const meta = RETO_PRESENTATION_DATA[currentReto];
        if (meta && meta.audio) {
          playAudioFile(meta.audio, () => {
            speakWithSpeechSynthesis(meta.instruction);
          });
        }
      });
    }
  }

  // ========================================================================
  // RETO 1: SONIDOS MÁGICOS
  // ========================================================================
  function renderReto1_Sonidos() {
    const item = reto1Exercises[currentExerciseIndex];
    if (!item) return;

    setFeedbackMessage(
      `Escucha el <strong>sonido mágico</strong> y toca el objeto que lo hace.`,
      "assets/images/senalando.png"
    );

    const options = generateOptions(SOUND_POOL, item);

    challengeContentArea.innerHTML = `
      ${getRetoPresentationBannerHtml()}

      <div class="challenge-prompt-box">
        <p class="challenge-prompt-text">¿Quién hace este sonido mágico?</p>
        <button type="button" id="btnPlaySoundReto1" class="btn-sound-trigger shadow-sm">
          <i class="bi bi-volume-up-fill fs-4"></i> Escuchar Sonido
        </button>
      </div>

      <div class="options-grid" id="reto1Options">
        ${options.map(opt => `
          <div class="option-card" data-id="${opt.id}" role="button" tabindex="0">
            <div class="option-icon-box">${opt.svg}</div>
            <h4 class="option-label">${opt.name}</h4>
          </div>
        `).join('')}
      </div>

      <div id="sayNameConfirmationArea" style="display: none;"></div>
    `;

    bindRetoInstructionsButton();

    // Botón manual de reproducir sonido
    const btnPlay = document.getElementById('btnPlaySoundReto1');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        btnPlay.classList.add('is-playing');
        playSyntheticSound(item.soundEffect, () => {
          btnPlay.classList.remove('is-playing');
        });
        setTimeout(() => btnPlay.classList.remove('is-playing'), 1400);
      });

      // Reproducción suave al entrar en el ejercicio
      setTimeout(() => {
        playSyntheticSound(item.soundEffect);
      }, 1000);
    }

    // Manejar clics en las opciones
    const optionsGrid = document.getElementById('reto1Options');
    const optionCards = optionsGrid.querySelectorAll('.option-card');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        if (optionsGrid.classList.contains('is-answered')) return;

        const selectedId = card.getAttribute('data-id');
        if (selectedId === item.id) {
          optionsGrid.classList.add('is-answered');
          card.classList.add('is-correct');
          playSuccessChime();
          showReto1NamePrompt(item);
        } else {
          card.classList.add('is-wrong');
          playFailChime();
          showHint(item.hint);
          setTimeout(() => card.classList.remove('is-wrong'), 500);
        }
      });
    });
  }

  function showReto1NamePrompt(item) {
    const confirmationArea = document.getElementById('sayNameConfirmationArea');
    if (!confirmationArea) return;

    setFeedbackMessage(
      `¡Muy bien! Ahora <strong>repite su nombre en voz alta</strong>: ¡${item.name}! 🗣️`,
      "assets/images/contento.png"
    );

    speakWithSpeechSynthesis(`¡Muy bien! Ahora di en voz alta: ¡${item.name}!`);

    confirmationArea.style.display = 'block';
    confirmationArea.innerHTML = `
      <div class="name-say-box">
        <span class="fs-5 fw-bold text-magic">
          <i class="bi bi-mic-fill text-primary"></i> Repite en voz alta: ¡${item.name}!
        </span>
        <button type="button" id="btnNextExerciseReto1" class="btn-kid btn-emerald-kid shadow-lg">
          ¡Ya lo dije! ➡️ Siguiente
        </button>
      </div>
    `;

    let advanced = false;
    const proceed = () => {
      if (advanced) return;
      advanced = true;
      advanceExercise();
    };

    const btnNext = document.getElementById('btnNextExerciseReto1');
    if (btnNext) {
      btnNext.addEventListener('click', proceed);
    }

    // Auto-avance tras 7 segundos por si el niño no interactúa con el botón
    setTimeout(proceed, 7000);
  }

  // ========================================================================
  // RETO 2: NOMBRAR Y OBSERVAR DETALLES
  // ========================================================================
  function renderReto2_Nombrar() {
    const item = reto2Exercises[currentExerciseIndex];
    if (!item) return;

    setFeedbackMessage(
      `Observa la imagen con atención y responde a la pregunta de Palabrín.`,
      "assets/images/senalando.png"
    );

    challengeContentArea.innerHTML = `
      ${getRetoPresentationBannerHtml()}

      <div class="reto2-stage">
        <div class="reto2-featured-icon">
          ${item.svg}
        </div>
        <h3 class="reto2-question-title">¿Qué objeto o elemento es este?</h3>
        <p class="reto2-question-sub" id="reto2QuestionText">${item.question}</p>

        <div class="d-flex flex-wrap justify-content-center gap-3 mt-2">
          <button type="button" id="btnRepeatQReto2" class="btn-kid btn-secondary-kid shadow-sm">
            <i class="bi bi-volume-up-fill"></i> Escuchar Pregunta
          </button>
          <button type="button" id="btnConfirmQReto2" class="btn-kid btn-emerald-kid shadow-lg">
            🗣️ ¡Ya lo mencioné en voz alta! ➡️ Siguiente
          </button>
        </div>
      </div>
    `;

    bindRetoInstructionsButton();

    // Narrar pregunta de observación
    setTimeout(() => {
      speakWithSpeechSynthesis(item.question);
    }, 3000);

    const btnRepeat = document.getElementById('btnRepeatQReto2');
    if (btnRepeat) {
      btnRepeat.addEventListener('click', () => {
        speakWithSpeechSynthesis(item.question);
      });
    }

    const btnConfirm = document.getElementById('btnConfirmQReto2');
    if (btnConfirm) {
      let advanced = false;
      const proceed = () => {
        if (advanced) return;
        advanced = true;
        advanceExercise();
      };

      btnConfirm.addEventListener('click', () => {
        btnConfirm.disabled = true;
        playSuccessChime();
        setFeedbackMessage(
          `¡Qué gran observación! Has dado una respuesta maravillosa. ✨`,
          "assets/images/contento.png"
        );
        speakWithSpeechSynthesis("¡Excelente observación! Tu respuesta fue fantástica.", proceed);
        setTimeout(proceed, 8000);
      });
    }
  }

  // ========================================================================
  // RETO 3: PALABRAS MÁGICAS
  // ========================================================================
  function renderReto3_Palabras() {
    const item = reto3Exercises[currentExerciseIndex];
    if (!item) return;

    setFeedbackMessage(
      `Escucha la <strong>palabra mágica</strong> y selecciona la imagen correcta.`,
      "assets/images/senalando.png"
    );

    const options = generateOptions(WORDS_POOL, item);

    challengeContentArea.innerHTML = `
      ${getRetoPresentationBannerHtml()}

      <div class="challenge-prompt-box">
        <p class="challenge-prompt-text mb-2">Encuentra la imagen de esta palabra:</p>
        <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
          <span class="badge rounded-pill bg-light text-primary border border-primary fs-3 px-4 py-2 fw-bolder shadow-sm">
            ${item.word}
          </span>
          <button type="button" id="btnPlayWordReto3" class="btn-sound-trigger shadow-sm">
            <i class="bi bi-volume-up-fill fs-5"></i> Escuchar: ${item.word}
          </button>
        </div>
      </div>

      <div class="options-grid" id="reto3Options">
        ${options.map(opt => `
          <div class="option-card" data-id="${opt.id}" role="button" tabindex="0">
            <div class="option-icon-box">${opt.svg}</div>
          </div>
        `).join('')}
      </div>
    `;

    bindRetoInstructionsButton();

    // Reproducir palabra hablada
    const playWordFunc = () => {
      speakWithSpeechSynthesis(`¡${item.name}!`);
    };

    const btnPlay = document.getElementById('btnPlayWordReto3');
    if (btnPlay) {
      btnPlay.addEventListener('click', playWordFunc);
    }
    setTimeout(playWordFunc, 2000);

    // Clic en las opciones de imagen
    const optionsGrid = document.getElementById('reto3Options');
    const optionCards = optionsGrid.querySelectorAll('.option-card');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        if (optionsGrid.classList.contains('is-answered')) return;

        const selectedId = card.getAttribute('data-id');
        if (selectedId === item.id) {
          optionsGrid.classList.add('is-answered');
          card.classList.add('is-correct');
          playSuccessChime();

          setFeedbackMessage(
            `¡Correcto! <strong>¡${item.word}!</strong> Has elegido la imagen adecuada. 🎉`,
            "assets/images/contento.png"
          );

          // Auto-avance infalible al siguiente acertijo o victoria
          let advanced = false;
          const proceed = () => {
            if (advanced) return;
            advanced = true;
            advanceExercise();
          };

          speakWithSpeechSynthesis(`¡Muy bien! ¡${item.name}!`, proceed);
          setTimeout(proceed, 3000);

        } else {
          card.classList.add('is-wrong');
          playFailChime();
          showHint(item.hint);
          setTimeout(() => card.classList.remove('is-wrong'), 500);
        }
      });
    });
  }

  // Generador de 3 opciones aleatorias (1 correcta + 2 distractores)
  function generateOptions(pool, correctItem) {
    const distractors = pool.filter(p => p.id !== correctItem.id);
    const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 2);
    const all = [correctItem, ...shuffledDistractors];
    return all.sort(() => 0.5 - Math.random());
  }

  // ------------------------------------------------------------------------
  // 6. AVANCE ENTRE EJERCICIOS Y RETOS
  // ------------------------------------------------------------------------
  function advanceExercise() {
    currentExerciseIndex++;

    if (currentExerciseIndex < EXERCISES_PER_RETO) {
      // Siguiente ejercicio dentro del mismo reto
      loadCurrentExercise(false);
    } else {
      // Reto superado: otorgar estrella y pasar al siguiente
      completeCurrentReto();
    }
  }

  function completeCurrentReto() {
    completedRetos.add(currentReto);
    updateStarsTrackerUI();
    updateProgressUI();
    playChallengeCelebrationChime();

    if (currentReto === 1) {
      setFeedbackMessage(
        `⭐ <strong>¡Reto 1 Superado!</strong> Has ganado la Estrella de los Sonidos. ¡Vamos al Reto 2!`,
        "assets/images/emocionado.png"
      );
      currentReto = 2;
      currentExerciseIndex = 0;
      setTimeout(() => {
        loadCurrentExercise(true);
      }, 1500);

    } else if (currentReto === 2) {
      setFeedbackMessage(
        `⭐ <strong>¡Reto 2 Superado!</strong> Has ganado la Estrella de la Observación. ¡Vamos al último reto!`,
        "assets/images/emocionado.png"
      );
      currentReto = 3;
      currentExerciseIndex = 0;
      setTimeout(() => {
        loadCurrentExercise(true);
      }, 1500);

    } else if (currentReto === 3) {
      // ¡MISIÓN COMPLETA! Se suman las 3 estrellas y se pasa a la pantalla espacial
      setFeedbackMessage(
        `🏆 <strong>¡MISIÓN CUMPLIDA!</strong> Has completado los 3 grandes retos. ¡Eres un héroe!`,
        "assets/images/emocionado.png"
      );
      setTimeout(() => {
        showVictoryScreen();
      }, 1400);
    }
  }

  // Pista de Palabrín
  function showHint(hintText) {
    if (!hintArea) return;
    hintArea.style.display = 'block';
    hintArea.innerHTML = `
      <div class="hint-banner">
        <i class="bi bi-lightbulb-fill text-warning fs-4"></i>
        <span><strong>Pista de Palabrín:</strong> ${hintText}</span>
      </div>
    `;
    speakWithSpeechSynthesis(`Una pista: ${hintText}`);
  }

  function hideHint() {
    if (hintArea) {
      hintArea.style.display = 'none';
      hintArea.innerHTML = '';
    }
  }

  function setFeedbackMessage(htmlContent, avatarSrc) {
    if (feedbackText) feedbackText.innerHTML = htmlContent;
    if (feedbackAvatar && avatarSrc) feedbackAvatar.src = avatarSrc;
  }

  // ------------------------------------------------------------------------
  // 7. PROGRESO Y CONTADORES DE ESTRELLAS
  // ------------------------------------------------------------------------
  function updateProgressUI() {
    const completedCount = completedRetos.size;
    const percentage = Math.min((completedCount / 3) * 100, 100);

    if (gameProgressBar) {
      gameProgressBar.style.width = `${percentage}%`;
    }

    if (gameProgressCount) {
      gameProgressCount.textContent = `${completedCount} de 3 retos superados`;
    }

    if (headerCounter) {
      headerCounter.textContent = `${completedCount} / 3 Estrellas`;
    }
  }

  function updateStarsTrackerUI() {
    if (starBadge1) {
      starBadge1.className = `mission-star-badge ${completedRetos.has(1) ? 'achieved' : ''}`;
    }
    if (starBadge2) {
      starBadge2.className = `mission-star-badge ${completedRetos.has(2) ? 'achieved' : ''}`;
    }
    if (starBadge3) {
      starBadge3.className = `mission-star-badge ${completedRetos.has(3) ? 'achieved' : ''}`;
    }
  }

  // ------------------------------------------------------------------------
  // 8. FINALIZACIÓN Y REINICIO
  // ------------------------------------------------------------------------
  function showVictoryScreen() {
    if (screenGame) screenGame.style.display = 'none';
    if (screenVictory) {
      screenVictory.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Audio festivo oficial de victoria final (felici5.mp3)
    playAudioFile("assets/audio/felici5.mp3", () => {
      speakWithSpeechSynthesis("¡Felicitaciones, pequeño gran héroe! Has completado la gran misión de Palabrín.");
    });
  }

  function resetGame() {
    currentReto = 1;
    currentExerciseIndex = 0;
    completedRetos.clear();

    if (screenVictory) screenVictory.style.display = 'none';
    if (screenIntro) {
      screenIntro.style.display = 'block';
      screenIntro.style.opacity = '1';
    }
    if (screenGame) screenGame.style.display = 'none';

    initMissionExercises();
    setFeedbackMessage(
      `¡Prepárate para el <strong>primer reto</strong> de la misión!`,
      "assets/images/senalando.png"
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ------------------------------------------------------------------------
  // 9. REPRODUCTOR DE ARCHIVOS DE AUDIO Y SINTETIZADOR
  // ------------------------------------------------------------------------
  let activeGameAudio = null;

  function playAudioFile(filePath, onEnded) {
    // Detener audio previo si existe
    if (activeGameAudio) {
      activeGameAudio.pause();
      activeGameAudio.currentTime = 0;
    }

    activeGameAudio = new Audio(filePath);
    activeGameAudio.volume = 0.9;

    let finished = false;
    const handleEnd = () => {
      if (!finished) {
        finished = true;
        if (typeof onEnded === 'function') onEnded();
      }
    };

    activeGameAudio.addEventListener('ended', handleEnd, { once: true });
    activeGameAudio.addEventListener('error', handleEnd, { once: true });

    const playPromise = activeGameAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Reproducción automática no permitida o archivo no disponible:", filePath);
        handleEnd();
      });
    }
  }

  /**
   * Mapeo y reproducción de los efectos de sonido para los animales y objetos del Reto 1
   */
  function playSyntheticSound(type, onEnded) {
    const soundMap = {
      meow: "assets/audio/gato.mp3",
      gato: "assets/audio/gato.mp3",
      bark: "assets/audio/perro.mp3",
      perro: "assets/audio/perro.mp3",
      horn: "assets/audio/carro.mp3",
      carro: "assets/audio/carro.mp3",
      auto: "assets/audio/carro.mp3",
      bell: "assets/audio/campana.mp3",
      campana: "assets/audio/campana.mp3",
      bird: "assets/audio/pajaro.mp3",
      chirp: "assets/audio/pajaro.mp3",
      pajaro: "assets/audio/pajaro.mp3",
      pajarito: "assets/audio/pajaro.mp3",
      clock: "assets/audio/reloj.mp3",
      reloj: "assets/audio/reloj.mp3",
      guitar: "assets/audio/guitarra.mp3",
      guitarra: "assets/audio/guitarra.mp3",
      vaca: "assets/audio/vaca.mp3",
      piano: "assets/audio/piano.mp3",
      rana: "assets/audio/rana.mp3"
    };

    const targetAudio = soundMap[type];
    if (targetAudio) {
      playAudioFile(targetAudio, onEnded);
    } else {
      if (typeof onEnded === 'function') onEnded();
    }
  }

  // Chime de Acierto Festivo con Web Audio API
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playSuccessChime() {
    try {
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
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.4);
      });
    } catch (e) {
      console.warn("Web Audio chime no disponible");
    }
  }

  // Fanfarria de Reto Superado (estrella ganada)
  function playChallengeCelebrationChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = t + i * 0.1;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.24, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.6);
      });
    } catch (e) {
      console.warn("Celebration chime no disponible");
    }
  }

  // Sonido de Fallo Suave
  function playFailChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.22);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) {}
  }

  // Síntesis de voz infantil con timeout de protección infalible
  function speakWithSpeechSynthesis(text, onEnd) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.pitch = 1.15;

      let ended = false;
      const finish = () => {
        if (!ended) {
          ended = true;
          if (typeof onEnd === 'function') onEnd();
        }
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      // Timeout de seguridad indispensable en Chrome para evitar deadlocks
      setTimeout(finish, 1800);

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        finish();
      }
    } else {
      setTimeout(() => {
        if (typeof onEnd === 'function') onEnd();
      }, 600);
    }
  }
}

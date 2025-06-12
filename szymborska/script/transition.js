// Configuração do Reveal
      Reveal.initialize({
        hash: true,
        slideNumber: true,
        controls: true,
        progress: true,
        transition: "slide",
        transitionSpeed: "fast",
      });

      // Cores por slide
      const accentPalette = [
        "#000000", // Slide 0
        "#00e4ff", // Slide 1
        "#00ff88", // Slide 2
        "#ffc400", // Slide 3
        "#ff6b6b", // Slide 4
        "#9b59b6", // Slide 5
        "#f39c12", // Slide 6 - Futuro
        "#2ecc71", // Slide 7
        "#3498db", // Slide 8
        "#e74c3c", // Slide 9
        "#8e44ad", // Slide 10
        "#FFFFFF", // Slide 11 - Nada?
        "#FFFFFF"
      ];

      function animateAccent(oldColor, newColor, duration = 600) {
        const textTargets = document.querySelectorAll(
          ".reveal h1, .reveal h2, .reveal h3, .reveal p"
        );
        const progressBar = document.querySelector(".reveal .progress span");

        textTargets.forEach((el) => {
          el.animate([{ color: oldColor }, { color: newColor }], {
            duration,
            fill: "forwards",
            easing: "ease-in-out",
          });
        });

        if (progressBar) {
          progressBar.animate(
            [{ backgroundColor: oldColor }, { backgroundColor: newColor }],
            {
              duration,
              fill: "forwards",
              easing: "ease-in-out",
            }
          );
        }
      }

      Reveal.on("slidechanged", (event) => {
        const root = document.documentElement;
        const oldColor =
          getComputedStyle(root).getPropertyValue("--accent").trim() ||
          accentPalette[0];
        const newColor = accentPalette[event.indexh] || "#ffc400";

        animateAccent(oldColor, newColor);
        setTimeout(() => root.style.setProperty("--accent", newColor), 0);

        if (event.indexh === 11 || event.indexh === 12) {
          // Slide 11 - Nada?
            root.style.setProperty("--background", "#000000");
            
        } else {
            // Outros slides - cor de fundo padrão
            root.style.setProperty("--background", "#ffffff");
        }

      });

      // ANIMAÇÃO FUTURO
      (function () {
        let wordCount = 0;
        const words = [];

        function createWord() {
          console.log("Tentando criar palavra...");

          // Verificar se estamos no slide correto
          const currentSlide = Reveal.getCurrentSlide();
          console.log("Slide atual:", currentSlide);
          console.log(
            "Tem classe futuro-animation-slide?",
            currentSlide.classList.contains("futuro-animation-slide")
          );

          if (!currentSlide.classList.contains("futuro-animation-slide")) {
            console.log("Não está no slide correto");
            return;
          }

          const animationContainer =
            currentSlide.querySelector(".animation-area");
          console.log("Animation container:", animationContainer);

          if (!animationContainer) {
            console.log("Não encontrou animation-area");
            return;
          }

          // Remover palavra anterior se existir
          if (words.length > 0) {
            const prevWord = words[0];
            if (prevWord.container.parentNode) {
              prevWord.container.remove();
            }
            words.splice(0, 1);
          }

          console.log("Criando palavra...");
          wordCount++;
          const wordContainer = document.createElement("div");
          wordContainer.className = "word-container";
          wordContainer.style.fontSize = `clamp(8px, 1.5vw, 12px)`;
          wordContainer.style.top = "calc(50% - 60px)";

          const word = "FUTURO";
          const letters = [];

          // Criar cada letra como um span separado
          for (let i = 0; i < word.length; i++) {
            const letterSpan = document.createElement("span");
            letterSpan.className = "letter";
            letterSpan.textContent = word[i];
            letterSpan.style.marginRight = "0px";
            wordContainer.appendChild(letterSpan);
            letters.push(letterSpan);
          }

          animationContainer.appendChild(wordContainer);
          words.push({ container: wordContainer, letters: letters });
          console.log("Palavra adicionada ao DOM");

          // Criar efeito de "sopro"
          const breathLine = currentSlide.querySelector(".breath-line");
          if (breathLine) {
            breathLine.style.background = "#ff6b6b";
            breathLine.style.boxShadow = "0 0 10px rgba(255, 107, 107, 0.5)";

            setTimeout(() => {
              breathLine.style.background = "rgba(51, 51, 51, 0.5)";
              breathLine.style.boxShadow = "none";
            }, 200);
          }

          // Animar o espaçamento das letras
          function updateLetterSpacing() {
            const rect = wordContainer.getBoundingClientRect();
            const containerRect = animationContainer.getBoundingClientRect();
            const verticalLinePosition = containerRect.right - 30; // Linha na posição 30px da direita do container

            const containerWidth = containerRect.width;
            const progress = Math.max(
              0,
              1 - (rect.right - (containerRect.left + 150)) / containerWidth
            );
            const maxSpacing = 30;
            const spacing = progress * maxSpacing;

            letters.forEach((letter, index) => {
              letter.style.marginRight = spacing + "px";

              const letterRect = letter.getBoundingClientRect();
              if (letterRect.right < verticalLinePosition) {
                letter.classList.add("past");
              } else {
                letter.classList.remove("past");
              }
            });

            if (rect.right > containerRect.left - 100) {
              requestAnimationFrame(updateLetterSpacing);
            }
          }

          requestAnimationFrame(updateLetterSpacing);

          // Remover a palavra após a animação
          setTimeout(() => {
            if (wordContainer.parentNode) {
              wordContainer.remove();
              const index = words.findIndex(
                (w) => w.container === wordContainer
              );
              if (index > -1) {
                words.splice(index, 1);
              }
            }
          }, 4000);
        }

        // Event listener para ENTER
        function handleKeydown(event) {
          console.log("Tecla pressionada:", event.code);
          if (event.code === "Enter") {
            const currentSlide = Reveal.getCurrentSlide();
            if (currentSlide.classList.contains("futuro-animation-slide")) {
              console.log("ENTER no slide correto!");
              event.preventDefault();
              createWord();
            }
          }
        }

        // Inicializar quando o Reveal estiver pronto
        Reveal.on("ready", function () {
          console.log("Reveal ready!");
          document.addEventListener("keydown", handleKeydown);
        });

        // Auto-iniciar a animação quando chegar no slide
        Reveal.on("slidechanged", function (event) {
          console.log("Slide mudou para:", event.indexh);
          if (event.currentSlide.classList.contains("futuro-animation-slide")) {
            console.log("Chegou no slide da animação!");
            setTimeout(() => {
              createWord();
            }, 500);
          }
        });
      })
      ();
/* === SILÊNCIO – emoji 🤫 que pode explodir quantas vezes quiser === */
(() => {
  /** Dispara a explosão do silêncio no slide atual */
  function breakSilence(slide){
    const box  = slide.querySelector('.emoji-container');
    const seed = box.querySelector('.seed');
    if(!box || !seed) return;

    /* 1. limpa fragmentos antigos */
    box.querySelectorAll('.emoji-piece:not(.seed)').forEach(n=>n.remove());

    /* 2. (re)inicia o seed – garante que ele está visível e sem animação */
    seed.style.animation = 'none';
    seed.style.opacity   = '0.3';
    seed.style.transform = 'translate(-50%, -50%)';
    seed.offsetWidth;               // força reflow para reiniciar animação

    /* 3. dá a animação shatter ao seed */
    seed.style.animation = 'shatter 0.9s forwards ease-in';

    /* 4. gera fragmentos extras (opcional, só efeito visual) */
    const num = 6;
    for(let i=0;i<num;i++){
      const frag = seed.cloneNode(true);
      frag.classList.remove('seed');
      frag.style.setProperty('--dx',  `${Math.random()*180-90}px`);
      frag.style.setProperty('--dy',  `${Math.random()*120-60}px`);
      frag.style.setProperty('--rot', `${Math.random()*720-360}deg`);
      frag.style.animationDelay = `${i*0.05}s`;
      box.appendChild(frag);
      setTimeout(()=>frag.remove(), 950);        // limpa logo após a animação
    }

    /* 5. quando o seed terminar de “estilhaçar”, traz de volta para o centro */
    seed.addEventListener('animationend', function restore(){
      seed.style.animation = 'none';
      seed.style.opacity   = '0.3';
      seed.style.transform = 'translate(-50%, -50%)';
      seed.removeEventListener('animationend', restore);
    }, { once:true });
  }

  /* dispara sempre que ENTER for pressionado dentro do slide */
  document.addEventListener('keydown', e=>{
    if(e.code === 'Enter'){
      const s = Reveal.getCurrentSlide();
      if(s.classList.contains('silencio-animation-slide')){
        breakSilence(s);
      }
    }
  });
})();

(function () {
  function emojiSupported(char) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = '32px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
    ctx.fillText(char, 0, 32);
    const pixels = ctx.getImageData(16, 16, 1, 1).data;
    return pixels[0] + pixels[1] + pixels[2] + pixels[3] !== 0; // algum pixel colorido?
  }

  if (!emojiSupported('🤫')) {
    twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
  }
})();
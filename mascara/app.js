(() => {
  "use strict";

  const slides = [...document.querySelectorAll('.slide')];
  const nav = document.getElementById('slideNavigation');
  const counter = document.getElementById('slideCounter');
  const topic = document.getElementById('currentTopic');
  const previous = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const fullButton = document.getElementById('fullscreenBtn');
  const overviewDialog = document.getElementById('overviewDialog');
  const helpDialog = document.getElementById('helpDialog');
  const overviewGrid = document.getElementById('overviewGrid');
  let active = 0;
  let touchStart = null;

  const formatNumber = n => String(n).padStart(2, '0');

  // Keep the iframe off the page until its viewer explicitly starts the video.
  // Each slide uses the YouTube video relationship found in the original .pptx.
  function stopVideo(slide) {
    slide.querySelectorAll('.video-embed').forEach(container => {
      const iframe = container.querySelector('iframe');
      if (iframe) iframe.remove();
      container.classList.remove('is-playing');
      const playButton = container.querySelector('.play-button');
      if (playButton) playButton.disabled = false;
    });
  }

  function displaySlide(index, options = {}) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target !== active) stopVideo(slides[active]);
    active = target;

    slides.forEach((slide, slideIndex) => {
      const selected = slideIndex === active;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
      slide.querySelectorAll('a, button').forEach(control => {
        if (selected) control.removeAttribute('tabindex');
        else control.setAttribute('tabindex', '-1');
      });
      if (selected) slide.scrollTop = 0;
    });

    nav.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-current', dotIndex === active);
      dot.setAttribute('aria-current', dotIndex === active ? 'step' : 'false');
    });
    counter.innerHTML = `<strong>${formatNumber(active + 1)}</strong><span> / ${formatNumber(slides.length)}</span>`;
    topic.textContent = slides[active].dataset.title;
    previous.disabled = active === 0;
    next.disabled = active === slides.length - 1;
    next.setAttribute('aria-label', active === slides.length - 1 ? 'Fim da apresentação' : 'Próximo slide');

    if (!options.fromHash) {
      const newHash = `#slide-${active + 1}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }
  }

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'progress-dot';
    dot.title = `${formatNumber(index + 1)} · ${slide.dataset.title}`;
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}: ${slide.dataset.title}`);
    dot.innerHTML = `<span class="dot-fill"></span>`;
    dot.addEventListener('click', () => displaySlide(index));
    nav.append(dot);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'overview-item';
    item.innerHTML = `<span class="overview-thumb overview-thumb-${index + 1}"><span class="overview-thumb-number">${formatNumber(index + 1)}</span><span class="overview-thumb-title">${slide.dataset.title}</span></span><span class="overview-item-title">${slide.dataset.title}</span>`;
    item.addEventListener('click', () => {
      overviewDialog.close();
      displaySlide(index);
    });
    overviewGrid.append(item);
  });

  previous.addEventListener('click', () => displaySlide(active - 1));
  next.addEventListener('click', () => displaySlide(active + 1));
  document.getElementById('overviewBtn').addEventListener('click', () => overviewDialog.showModal());
  document.getElementById('helpBtn').addEventListener('click', () => helpDialog.showModal());
  document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  [overviewDialog, helpDialog].forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) {
      console.warn('O navegador não permitiu tela cheia:', error);
    }
  }
  fullButton.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullButton.setAttribute('aria-label', isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia');
    fullButton.title = isFullscreen ? 'Sair da tela cheia (F)' : 'Tela cheia (F)';
  });

  // Videos are privacy-enhanced embeds; captions, if provided by YouTube,
  // can be enabled through the YouTube player as usual.
  document.querySelectorAll('.video-embed').forEach(container => {
    const button = container.querySelector('.play-button');
    button.addEventListener('click', () => {
      const id = container.dataset.videoId;
      if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
      const frame = document.createElement('iframe');
      frame.title = container.dataset.label || 'Vídeo do YouTube';
      // A real HTTPS origin allows YouTube to identify the embedding website.
      // GitHub Pages provides it; local file:// URLs do not.
      const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1' });
      if (window.location.protocol === 'https:' || window.location.protocol === 'http:') {
        params.set('origin', window.location.origin);
      }
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}`;
      frame.loading = 'eager';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.setAttribute('frameborder', '0');
      container.append(frame);
      container.classList.add('is-playing');
      button.disabled = true;
    });
  });

  document.addEventListener('keydown', event => {
    const target = event.target;
    if (target instanceof HTMLElement && (/INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable)) return;
    if (overviewDialog.open || helpDialog.open) return;
    const videoFocus = target instanceof HTMLElement && target.closest('.video-embed');
    if (videoFocus && event.code === 'Space') return;
    switch (event.key) {
      case 'ArrowRight': case 'PageDown':
        event.preventDefault(); displaySlide(active + 1); break;
      case 'ArrowLeft': case 'PageUp':
        event.preventDefault(); displaySlide(active - 1); break;
      case ' ':
        event.preventDefault(); displaySlide(active + 1); break;
      case 'Home':
        event.preventDefault(); displaySlide(0); break;
      case 'End':
        event.preventDefault(); displaySlide(slides.length - 1); break;
      case 'f': case 'F':
        event.preventDefault(); toggleFullscreen(); break;
      case 'g': case 'G':
        event.preventDefault(); overviewDialog.showModal(); break;
      case '?':
        event.preventDefault(); helpDialog.showModal(); break;
    }
  });

  const stage = document.getElementById('stage');
  stage.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || event.target.closest('.video-embed, a, button, .table-wrapper')) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) displaySlide(active + (dx < 0 ? 1 : -1));
  }, { passive: true });

  function readHash() {
    const matched = window.location.hash.match(/^#slide-(\d+)$/);
    return matched ? Number(matched[1]) - 1 : 0;
  }
  window.addEventListener('hashchange', () => displaySlide(readHash(), { fromHash: true }));
  displaySlide(readHash(), { fromHash: true });
})();

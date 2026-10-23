// ==========================================================================
// SEASTRIDE ENGINEERING — Core site behavior
// ==========================================================================

(() => {
  const pageLoader = document.querySelector('.page-loader');
  if (!pageLoader) return;

  const minimumDisplayTime = 10000;
  const loaderStartedAt = performance.now();
  const hidePageLoader = () => {
    const delay = Math.max(0, minimumDisplayTime - (performance.now() - loaderStartedAt));
    window.setTimeout(() => {
      pageLoader.classList.add('page-loader--hidden');
      document.body.removeAttribute('aria-busy');
      window.setTimeout(() => pageLoader.remove(), 500);
    }, delay);
  };

  if (document.readyState === 'complete') hidePageLoader();
  else window.addEventListener('load', hidePageLoader, { once: true });
})();

document.addEventListener('DOMContentLoaded', () => {

  const certificateDialog = document.getElementById('certificate-preview-dialog');
  if (certificateDialog instanceof HTMLDialogElement) {
    const previewImage = certificateDialog.querySelector('.cert-preview-dialog__image');
    const previewTitle = certificateDialog.querySelector('.cert-preview-dialog__title');
    const closeButton = certificateDialog.querySelector('.cert-preview-dialog__close');

    document.querySelectorAll('.cert-preview-trigger').forEach(button => {
      button.addEventListener('click', () => {
        previewImage.src = button.dataset.certificateSrc || '';
        previewImage.alt = button.dataset.certificateAlt || '';
        previewTitle.textContent = button.dataset.certificateTitle || 'Certificate preview';
        certificateDialog.showModal();
      });
    });

    if (closeButton) closeButton.addEventListener('click', () => certificateDialog.close());
    certificateDialog.addEventListener('cancel', event => {
      event.preventDefault();
      certificateDialog.close();
    });
    document.addEventListener('keydown', event => {
      if (certificateDialog.open && (event.key === 'Escape' || event.code === 'Escape' || event.key === 'Esc')) {
        event.preventDefault();
        certificateDialog.close();
      }
    });
    certificateDialog.addEventListener('click', event => {
      if (event.target === certificateDialog) certificateDialog.close();
    });
  }

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const toTop = document.querySelector('.to-top');
    if (toTop) {
      if (window.scrollY > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });

  const testiWrap = document.querySelector('.testi-wrap');
  if (testiWrap) {
    const track = testiWrap.querySelector('.testi-slides');
    const slides = testiWrap.querySelectorAll('.testi-slide');
    const dotsWrap = testiWrap.querySelector('.testi-nav');
    let idx = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('.testi-dot');

    function goTo(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === idx));
      resetTimer();
    }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(idx + 1), 6000);
    }
    goTo(0);
    resetTimer();
  }

  const statNums = document.querySelectorAll('.stats-grid .num');
  if (statNums.length) {
    const parseTarget = (str) => {
      const match = str.match(/[\d.]+/);
      const value = match ? parseFloat(match[0]) : 0;
      const prefix = str.split(match ? match[0] : '')[0] || '';
      const suffix = str.slice((prefix + (match ? match[0] : '')).length);
      const decimals = (match && match[0].includes('.')) ? match[0].split('.')[1].length : 0;
      return { value, prefix, suffix, decimals };
    };

    const animateCount = (el) => {
      const { value, prefix, suffix, decimals } = parseTarget(el.dataset.target);
      const duration = 1400;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = value * ease(progress);
        el.textContent = prefix + current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = prefix + value.toFixed(decimals) + suffix;
        }
      };
      requestAnimationFrame(tick);
    };

    statNums.forEach(el => { el.dataset.target = el.textContent.trim(); el.textContent = '0'; });

    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      statNums.forEach(el => statIo.observe(el));
    } else {
      statNums.forEach(el => { el.textContent = el.dataset.target; });
    }
  }

  const langButtons = document.querySelectorAll('.nav-lang button');
  const stored = localStorage.getItem('seastride_lang') || 'en';
  applyLang(stored);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('seastride_lang', lang);
      applyLang(lang);
    });
  });

  function applyLang(lang) {
    langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = lang === 'ur' ? el.dataset.ur : el.dataset.en;
      if (val !== undefined) el.textContent = val;
    });
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    document.body.style.fontFamily = lang === 'ur'
      ? "'Noto Nastaliq Urdu', var(--font-body)"
      : "";
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

});

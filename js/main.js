// ================================
// SCROLL TO TOP
// ================================
(function () {
  var btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

// ================================
// PAGE FADE-IN
// ================================
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
});

// ================================
// STICKY NAV
// ================================
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}());

// ================================
// MOBILE NAV
// ================================
(function () {
  var hamburger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.nav-overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', function () {
    overlay.classList.toggle('open');
  });

  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      overlay.classList.remove('open');
    });
  });
}());

// ================================
// SCROLL-BASED NAV ACTIVE STATE
// ================================
(function () {
  var sections = ['work', 'about', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!sections.length) return;

  var navLinks = document.querySelectorAll('.nav-links a, .nav-overlay a');

  function update() {
    var atBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - 50;
    var active = null;
    if (atBottom) {
      active = 'contact';
    } else {
      var triggerY = window.scrollY + window.innerHeight * 0.25;
      sections.forEach(function (section) {
        if (section.offsetTop <= triggerY) {
          active = section.id;
        }
      });
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('active', active !== null && link.getAttribute('href') === '#' + active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}());

// ================================
// WORK PAGE FILTER
// ================================
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      var showing = [];

      // First, fade out and hide all cards
      cards.forEach(function (card) {
        card.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(6px)';
      });

      // After fade-out, show matching cards with staggered fade-in
      setTimeout(function () {
        cards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            showing.push(card);
          } else {
            card.style.display = 'none';
          }
        });

        showing.forEach(function (card, i) {
          setTimeout(function () {
            card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 50);
        });
      }, 150);
    });
  });
}());

// ================================
// CAROUSEL + LIGHTBOX
// ================================
(function () {
  var mainImg = document.querySelector('.carousel-main-img');
  if (!mainImg) return;

  var thumbs = Array.from(document.querySelectorAll('.carousel-thumb'));
  var images = thumbs.map(function (t) { return { src: t.src, alt: t.alt }; });
  var current = 0;
  var timer = null;

  // Hide thumbs strip if only one image
  if (thumbs.length <= 1) {
    var thumbsEl = document.querySelector('.carousel-thumbs');
    if (thumbsEl) thumbsEl.style.display = 'none';
  }

  function showSlide(index) {
    current = (index + images.length) % images.length;
    mainImg.src = images[current].src;
    mainImg.alt = images[current].alt;
    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === current);
    });
  }

  function startAutoplay() {
    if (images.length <= 1) return;
    timer = setInterval(function () { showSlide(current + 1); }, 4500);
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  var userInteracted = false;

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () {
      userInteracted = true;
      stopAutoplay();
      showSlide(i);
    });
  });

  var carouselEl = document.querySelector('.project-carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', function () {
      if (!userInteracted) startAutoplay();
    });
  }

  startAutoplay();

  // --- Lightbox ---
  var lbOverlay = document.createElement('div');
  lbOverlay.className = 'lightbox';
  lbOverlay.setAttribute('role', 'dialog');
  lbOverlay.setAttribute('aria-modal', 'true');
  lbOverlay.setAttribute('aria-label', 'Image viewer');

  var lbImg = document.createElement('img');
  lbImg.className = 'lightbox-img';

  var btnClose = document.createElement('button');
  btnClose.className = 'lightbox-btn lightbox-close';
  btnClose.setAttribute('aria-label', 'Close');
  btnClose.innerHTML = '&times;';

  var btnPrev = document.createElement('button');
  btnPrev.className = 'lightbox-btn lightbox-prev';
  btnPrev.setAttribute('aria-label', 'Previous image');
  btnPrev.innerHTML = '&#8592;';

  var btnNext = document.createElement('button');
  btnNext.className = 'lightbox-btn lightbox-next';
  btnNext.setAttribute('aria-label', 'Next image');
  btnNext.innerHTML = '&#8594;';

  lbOverlay.appendChild(lbImg);
  lbOverlay.appendChild(btnClose);
  if (images.length > 1) {
    lbOverlay.appendChild(btnPrev);
    lbOverlay.appendChild(btnNext);
  }
  document.body.appendChild(lbOverlay);

  function openLightbox(index) {
    current = (index + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    stopAutoplay();
  }

  function closeLightbox() {
    lbOverlay.classList.remove('open');
    document.body.style.overflow = '';
    startAutoplay();
  }

  function lbShow(index) {
    current = (index + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    thumbs.forEach(function (t, i) { t.classList.toggle('active', i === current); });
    mainImg.src = images[current].src;
    mainImg.alt = images[current].alt;
  }

  mainImg.addEventListener('click', function () { openLightbox(current); });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', function () { lbShow(current - 1); });
  btnNext.addEventListener('click', function () { lbShow(current + 1); });

  lbOverlay.addEventListener('click', function (e) {
    if (e.target === lbOverlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lbOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbShow(current - 1);
    if (e.key === 'ArrowRight') lbShow(current + 1);
  });
}());

// ================================
// CONTACT FORM
// ================================
(function () {
  var form = document.getElementById('contact-form');
  var successMsg = document.querySelector('.form-success');
  var errorMsg = document.querySelector('.form-error');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';
    if (errorMsg) errorMsg.style.display = 'none';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
          if (errorMsg) errorMsg.style.display = 'block';
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        if (errorMsg) errorMsg.style.display = 'block';
      });
  });
}());

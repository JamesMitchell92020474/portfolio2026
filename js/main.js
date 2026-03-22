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

  // Set active link for current page (desktop nav + mobile overlay)
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

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

      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.transition = 'opacity 0.2s ease';
          card.style.display = 'block';
          requestAnimationFrame(function () {
            card.style.opacity = '1';
          });
        } else {
          card.style.transition = 'opacity 0.2s ease';
          card.style.opacity = '0';
          setTimeout(function () {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}());

// ================================
// LIGHTBOX
// ================================
(function () {
  var images = Array.from(document.querySelectorAll('.project-hero img, .project-gallery img'));
  if (!images.length) return;

  var current = 0;

  // Build overlay
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');

  var img = document.createElement('img');
  img.className = 'lightbox-img';

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

  overlay.appendChild(img);
  overlay.appendChild(btnClose);
  if (images.length > 1) {
    overlay.appendChild(btnPrev);
    overlay.appendChild(btnNext);
  }
  document.body.appendChild(overlay);

  function show(index) {
    current = (index + images.length) % images.length;
    img.src = images[current].src;
    img.alt = images[current].alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  images.forEach(function (image, i) {
    image.style.cursor = 'zoom-in';
    image.addEventListener('click', function () { show(i); });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}());

// ================================
// CONTACT FORM
// ================================
(function () {
  var form = document.getElementById('contact-form');
  var successMsg = document.querySelector('.form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) {
            successMsg.style.display = 'block';
          }
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
          alert('Something went wrong. Please try again or email me directly.');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        alert('Something went wrong. Please try again or email me directly.');
      });
  });
}());

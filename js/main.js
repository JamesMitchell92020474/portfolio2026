/* ========================================
   STICKY NAV — add shadow on scroll
   ======================================== */
(function () {
  var nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}());


/* ========================================
   NAV ACTIVE STATE — highlight link for
   whichever section is currently in view
   ======================================== */
(function () {
  var navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  var sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  function setActive() {
    var scrollY = window.scrollY + 80; // offset for sticky nav height
    var current = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive(); // run on load
}());


/* ========================================
   HAMBURGER MENU — mobile nav toggle
   ======================================== */
(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var mobileNav = document.getElementById('nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close when a link is tapped
  mobileNav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}());


/* ========================================
   WORK FILTER — show/hide cards by category
   ======================================== */
(function () {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.work-grid .card');
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;

      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      cards.forEach(function (card) {
        var matches = filter === 'all' || card.dataset.category === filter;

        if (matches) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transition = 'none';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              card.style.transition = 'opacity 0.2s ease';
              card.style.opacity = '1';
            });
          });
        } else {
          card.style.transition = 'opacity 0.2s ease';
          card.style.opacity = '0';
          setTimeout(function () {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}());


/* ========================================
   CONTACT FORM — Formspree submission via fetch
   ======================================== */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successMsg = document.getElementById('form-success');
  var errorMsg = document.getElementById('form-error');
  var submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorMsg) errorMsg.classList.remove('visible');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.classList.add('visible');
        } else {
          return response.json().then(function (data) {
            throw new Error(data.error || 'Server error');
          });
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        if (errorMsg) {
          errorMsg.textContent = 'Something went wrong. Please try again or reach out to me directly.';
          errorMsg.classList.add('visible');
        }
      });
  });
}());

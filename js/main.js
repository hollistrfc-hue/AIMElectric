// ── AIM Electric LLC — Main JS ──

// Hamburger menu
(function () {
  var btn = document.querySelector('.hamburger');
  var nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', !open);
    var spans = btn.querySelectorAll('span');
    if (!open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
})();

// Scroll fade-up
(function () {
  var els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Netlify form with in-page thank-you
function attachFormSuccess(formSelector, successId) {
  var form = document.querySelector(formSelector);
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function () {
      form.style.display = 'none';
      var wrap = form.closest('.estimate-form-wrap, .form-card');
      if (wrap) {
        wrap.querySelectorAll('h3, p.subtitle').forEach(function (el) {
          el.style.display = 'none';
        });
      }
      var success = document.getElementById(successId);
      if (success) {
        success.style.display = 'flex';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }).catch(function () {
      form.submit();
    });
  });
}

attachFormSuccess('form[name="contact"]', 'contact-success');
attachFormSuccess('form[name="estimate"]', 'estimate-success');

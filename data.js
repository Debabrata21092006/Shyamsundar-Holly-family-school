/* =======================================
   SHYAMSUNDAR HOLY FAMILY SCHOOL — JS
   ======================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- STICKY NAVBAR ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ---- GALLERY LIGHTBOX ---- */
  const galleryItems = Array.from(document.querySelectorAll('.g-item'));
  const lightbox = document.getElementById('lightbox');
  const lbEmoji  = document.getElementById('lbEmoji');
  const lbLabel  = document.getElementById('lbLabel');
  let   lbIndex  = 0;

  function openLB(index) {
    lbIndex = index;
    const item = galleryItems[lbIndex];
    lbEmoji.textContent = item.dataset.emoji;
    lbLabel.textContent = item.dataset.label;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function stepLB(dir) {
    lbIndex = (lbIndex + dir + galleryItems.length) % galleryItems.length;
    const item = galleryItems[lbIndex];
    lbEmoji.textContent = item.dataset.emoji;
    lbLabel.textContent = item.dataset.label;
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
  document.getElementById('lbClose').addEventListener('click', closeLB);
  document.getElementById('lbPrev').addEventListener('click', () => stepLB(-1));
  document.getElementById('lbNext').addEventListener('click', () => stepLB(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLB();
    if (e.key === 'ArrowLeft')   stepLB(-1);
    if (e.key === 'ArrowRight')  stepLB(1);
  });

  /* ---- TESTIMONIAL SLIDER ---- */
  const ttrack  = document.getElementById('ttrack');
  const tdots   = document.getElementById('tdots');
  const tPrev   = document.getElementById('tPrev');
  const tNext   = document.getElementById('tNext');
  const tcards  = ttrack ? ttrack.querySelectorAll('.tcard') : [];
  let tIndex    = 0;
  let tAuto;

  // Determine cards per view
  function tPerView() {
    if (window.innerWidth >= 900)  return 3;
    if (window.innerWidth >= 600)  return 2;
    return 1;
  }

  function buildDots() {
    if (!tdots) return;
    tdots.innerHTML = '';
    const count = Math.ceil(tcards.length / tPerView());
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'tdot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      tdots.appendChild(d);
    }
  }

  function goTo(index) {
    const count = Math.ceil(tcards.length / tPerView());
    tIndex = (index + count) % count;
    const perView = tPerView();
    const cardWidth = ttrack.offsetWidth / perView;
    ttrack.style.transform = `translateX(-${tIndex * cardWidth * perView}px)`;
    // Update dots
    document.querySelectorAll('.tdot').forEach((d, i) => {
      d.classList.toggle('active', i === tIndex);
    });
  }

  if (ttrack && tcards.length) {
    buildDots();
    tPrev.addEventListener('click', () => { goTo(tIndex - 1); resetAuto(); });
    tNext.addEventListener('click', () => { goTo(tIndex + 1); resetAuto(); });

    function resetAuto() {
      clearInterval(tAuto);
      tAuto = setInterval(() => goTo(tIndex + 1), 4500);
    }
    resetAuto();

    window.addEventListener('resize', () => {
      buildDots();
      goTo(0);
    });
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  const formOk      = document.getElementById('formOk');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const msg = document.getElementById('f-msg').value.trim();
      if (!name || !email || !msg) return;
      // Simulate success
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      if (formOk) formOk.classList.add('show');
      setTimeout(() => formOk && formOk.classList.remove('show'), 5000);
    });
  }

  /* ---- BACK TO TOP ---- */
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => {
    btt && btt.classList.toggle('show', window.scrollY > 400);
  });
  btt && btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

});
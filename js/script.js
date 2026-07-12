console.log("Mlabs website loaded");

// =============================
// ACTIVE NAVIGATION HIGHLIGHTING
// =============================
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveNav);

// =============================
// SMOOTH SCROLLING
// =============================
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// =============================
// SCROLL TO TOP BUTTON
// =============================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// =============================
// CARD HOVER EFFECTS
// =============================
document.querySelectorAll('.service-card, .exam-card, .feature, .mentor, .program-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// =============================
// BUTTON ANIMATIONS
// =============================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// =============================
// FORM FOCUS EFFECTS
// =============================
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('focus', function() {
    this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
  });
  
  field.addEventListener('blur', function() {
    this.style.boxShadow = 'none';
  });
});

// =============================
// SERVICE CARD INTERACTIONS
// =============================
document.querySelectorAll('.service-card, .exam-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderColor = '#2563eb';
    this.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.1)';
    this.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.borderColor = '#e5e7eb';
    this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    this.style.transform = 'translateY(0)';
  });
});

// =============================
// MENTOR CARD INTERACTIONS
// =============================
document.querySelectorAll('.mentor').forEach(mentor => {
  mentor.addEventListener('mouseenter', function() {
    this.style.borderColor = '#2563eb';
    this.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.1)';
    this.style.transform = 'scale(1.05)';
  });
  
  mentor.addEventListener('mouseleave', function() {
    this.style.borderColor = '#e5e7eb';
    this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    this.style.transform = 'scale(1)';
  });
});

// =============================
// NAVIGATION RESPONSIVE
// =============================
function handleMobileNav() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  if (window.innerWidth <= 768) {
    header.style.flexWrap = 'wrap';
  } else {
    header.style.flexWrap = 'nowrap';
  }
}

window.addEventListener('resize', handleMobileNav);
handleMobileNav();

// =============================
// LAZY LOADING IMAGES
// =============================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// =============================
// FOUNDER IMAGE CAROUSEL (if exists)
// =============================
const founderCarousel = document.getElementById('founderCarousel');
if (founderCarousel) {
  const track = founderCarousel.querySelector('.carousel-track');
  const prevBtn = founderCarousel.querySelector('.carousel-btn.prev');
  const nextBtn = founderCarousel.querySelector('.carousel-btn.next');
  const images = [
    { src: 'images/sajad.jpeg', alt: 'Sajad Ahmad Mir' },
    { src: 'images/dp.jpg', alt: 'Sajad Ahmad Mir' },
    { src: 'images/image.jpeg', alt: 'Sajad Ahmad Mir' }
  ];
  let currentIndex = 0;
  let autoSlideInterval = null;
  let touchStartX = 0;
  let touchEndX = 0;

  track.innerHTML = images.map(item => `
    <div class="carousel-slide">
      <img src="${item.src}" alt="${item.alt}" class="founder-image" loading="lazy">
    </div>
  `).join('');

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === currentIndex));
    const showControls = slides.length > 1;
    prevBtn.style.display = showControls ? 'flex' : 'none';
    nextBtn.style.display = showControls ? 'flex' : 'none';
  };

  const showSlide = (index) => {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    currentIndex = index;
    updateCarousel();
  };

  const startAutoSlide = () => {
    if (autoSlideInterval) return;
    autoSlideInterval = setInterval(() => showSlide(currentIndex + 1), 3600);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  };

  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    stopAutoSlide();
    startAutoSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    stopAutoSlide();
    startAutoSlide();
  });

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      showSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      stopAutoSlide();
      startAutoSlide();
    }
  });

  founderCarousel.addEventListener('mouseenter', stopAutoSlide);
  founderCarousel.addEventListener('mouseleave', startAutoSlide);

  updateCarousel();
  startAutoSlide();
}

// =============================
// MOBILE NAV (hamburger toggle)
// =============================
function initMobileNav() {
  document.querySelectorAll('header').forEach(header => {
    if (header.querySelector('.nav-toggle')) return;

    const nav = header.querySelector('nav');
    if (!nav) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('nav-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    header.insertBefore(toggle, nav);
  });
}

// =============================
// DARK MODE TOGGLE
// =============================
function initThemeToggle() {
  const setStoredTheme = (value) => {
    try { localStorage.setItem('mlabs-theme', value); } catch (e) { /* storage unavailable */ }
  };

  document.querySelectorAll('header nav').forEach(nav => {
    if (nav.querySelector('.theme-toggle')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';

    btn.addEventListener('click', () => {
      const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (currentlyDark) {
        document.documentElement.removeAttribute('data-theme');
        setStoredTheme('light');
        btn.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        setStoredTheme('dark');
        btn.textContent = '☀️';
      }
    });

    nav.appendChild(btn);
  });
}

// =============================
// HERO BACKGROUND: NEURAL NETWORK + MATH SYMBOLS
// =============================
function initHeroBackground() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.hero').forEach(hero => {
    if (hero.querySelector('.hero-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');

    let w, h;
    const resize = () => {
      w = canvas.width = hero.clientWidth;
      h = canvas.height = hero.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const symbols = ['∑', '∫', 'π', '√', '∞', 'Δ', 'λ', 'θ', '∇', '≈'];
    const count = Math.max(14, Math.min(34, Math.floor((w * h) / 22000)));
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      symbol: Math.random() < 0.3 ? symbols[Math.floor(Math.random() * symbols.length)] : null
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(255,255,255,${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        if (n.symbol) {
          ctx.fillStyle = 'rgba(255,255,255,0.22)';
          ctx.font = '22px Georgia, serif';
          ctx.fillText(n.symbol, n.x, n.y);
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.45)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    if (reduceMotion) {
      drawFrame();
      return;
    }

    const loop = () => {
      drawFrame();
      requestAnimationFrame(loop);
    };
    loop();
  });
}

// =============================
// ANIMATED STAT COUNTERS
// =============================
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([\d,.]+)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = match[1] + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// =============================
// STAGGERED GRID REVEAL
// =============================
function initStaggerReveal() {
  const grids = document.querySelectorAll('.services, .features-grid, .stats-grid, .mentor-grid, .exam-grid, .testimonials, .dashboard, .video-grid');

  grids.forEach(grid => {
    const children = Array.from(grid.children);
    if (!children.length) return;

    children.forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(16px)';
      child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
          gridObserver.unobserve(grid);
        }
      });
    }, { threshold: 0.15 });

    gridObserver.observe(grid);
  });
}

// =============================
// FAQ ACCORDION
// =============================
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      const list = item.parentElement;

      list.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0px';
        }
      });

      if (wasOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0px';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// =============================
// TESTIMONIAL CAROUSEL
// =============================
function initTestimonialCarousel() {
  const el = document.getElementById('testimonialCarousel');
  if (!el) return;

  const track = el.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const dotsWrap = el.querySelector('.testimonial-dots');
  const prevBtn = el.querySelector('.carousel-btn.prev');
  const nextBtn = el.querySelector('.carousel-btn.next');

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  let index = 0;
  let timer = null;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    update();
    restart();
  };

  const start = () => {
    if (timer || slides.length <= 1) return;
    timer = setInterval(() => goTo(index + 1), 5000);
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const restart = () => { stop(); start(); };

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  el.addEventListener('mouseenter', stop);
  el.addEventListener('mouseleave', start);

  update();
  start();
}

// =============================
// PRACTICE PROBLEM OF THE DAY
// =============================
function initProblemWidget() {
  const widget = document.getElementById('problemWidget');
  if (!widget) return;

  const problems = [
    { tag: 'Mathematics · Calculus', text: 'Evaluate the limit:\n\nlim(x→0) (sin 3x) / x', answer: 'Since lim(x→0) sin(kx)/x = k, the answer is 3.' },
    { tag: 'Coding · Arrays', text: 'Given an array of integers, find two numbers that add up to a target value. What is the optimal time complexity, and why?', answer: 'O(n): store each visited number in a hash map and check whether (target − current) has already been seen while iterating once.' },
    { tag: 'AI · Linear Algebra', text: 'A 3×3 matrix A has eigenvalues 2, 3, and 5. What is det(A)?', answer: 'det(A) equals the product of the eigenvalues: 2 × 3 × 5 = 30.' },
    { tag: 'Mathematics · Number Theory', text: 'What is the remainder when 7^100 is divided by 5?', answer: '7 ≡ 2 (mod 5), and 2^4 ≡ 1 (mod 5). Since 100 = 4 × 25, 2^100 ≡ 1 (mod 5) → remainder 1.' },
    { tag: 'Coding · Dynamic Programming', text: 'How do you compute the nth Fibonacci number in O(n) time using only O(1) extra space?', answer: 'Track only the last two values: start a=0, b=1, then repeat (a, b) = (b, a+b) for n steps instead of storing the whole sequence.' },
    { tag: 'AI · Probability', text: 'A fair coin is tossed 3 times. What is the probability of getting exactly 2 heads?', answer: 'C(3,2) × (1/2)³ = 3/8 = 0.375.' }
  ];

  let current = -1;
  const tagEl = document.getElementById('problemTag');
  const textEl = document.getElementById('problemText');
  const answerWrap = document.getElementById('problemAnswerWrap');
  const answerText = document.getElementById('problemAnswerText');
  const showBtn = document.getElementById('showAnswerBtn');
  const newBtn = document.getElementById('newProblemBtn');

  const render = () => {
    let next = Math.floor(Math.random() * problems.length);
    if (problems.length > 1 && next === current) next = (next + 1) % problems.length;
    current = next;

    const p = problems[current];
    tagEl.textContent = p.tag;
    textEl.textContent = p.text;
    answerText.textContent = p.answer;
    answerWrap.classList.remove('open');
    showBtn.textContent = 'Show Answer';
  };

  showBtn.addEventListener('click', () => {
    const open = answerWrap.classList.toggle('open');
    showBtn.textContent = open ? 'Hide Answer' : 'Show Answer';
  });

  newBtn.addEventListener('click', render);

  render();
}

// =============================
// FAQ-BOT CHAT ASSISTANT (client-side, no backend)
// =============================
function initChatWidget() {
  if (document.getElementById('mlabsChatLauncher')) return;

  const inServices = /\/services\//.test(window.location.pathname);
  const link = (name) => {
    const map = {
      home: 'index.html',
      apply: 'apply.html',
      mentors: 'mentors.html',
      blog: 'blog.html',
      teaching: inServices ? 'teaching.html' : 'services/teaching.html',
      coding: inServices ? 'coding.html' : 'services/coding.html',
      exams: inServices ? 'exams.html' : 'services/exams.html'
    };
    let href = map[name] || map.home;
    if (inServices && !['teaching', 'coding', 'exams'].includes(name)) href = '../' + href;
    return href;
  };

  const rules = [
    { keys: ['hi', 'hello', 'hey', 'hii', 'yo'], reply: "Hi! 👋 I'm the Mlabs assistant. Ask me about courses, exams, mentors, fees, or how to apply.", related: ['Courses', 'Exams', 'Mentors'] },
    { keys: ['course', 'courses', 'program', 'programs', 'offer', 'offering', 'services'], reply: `We run three core programs: <strong>Teaching</strong> (Math, Data Science &amp; AI foundations), <strong>Competitive Coding</strong> (DSA &amp; contests), and <strong>Exam Preparation</strong> (SAT, IIT JAM, GATE, CSIR NET, JKSSB). See the <a href="${link('home')}">homepage</a> for an overview.`, related: ['Teaching', 'Coding', 'Exams'] },
    { keys: ['math', 'mathematics', 'teaching', 'foundation'], reply: `Our Teaching program covers Mathematics Fundamentals, Data Science &amp; Statistics, and AI/ML basics — structured 10-12 week courses. Details: <a href="${link('teaching')}">Teaching page</a>.`, related: ['Duration', 'Fees', 'How to apply'] },
    { keys: ['coding', 'programming', 'algorithm', 'dsa', 'contest', 'codeforces', 'leetcode'], reply: `Our Competitive Coding track covers data structures &amp; algorithms, contest prep (Codeforces, AtCoder, ICPC, IOI), and intensive problem solving. Details: <a href="${link('coding')}">Coding page</a>.`, related: ['Duration', 'Fees', 'How to apply'] },
    { keys: ['exam', 'exams'], reply: `We prepare students for SAT, IIT JAM, GATE, CSIR NET and JKSSB, plus custom exam coaching on request. Details: <a href="${link('exams')}">Exam Prep page</a>.`, related: ['SAT', 'IIT JAM', 'GATE', 'CSIR NET', 'JKSSB'] },
    { keys: ['sat'], reply: `SAT prep covers Reading, Writing and Math with a target score of 1400+. We focus on test strategy, timing, and skill building — 92% of our SAT students hit their target. Details: <a href="${link('exams')}">Exam Prep page</a>.`, related: ['GATE', 'IIT JAM', 'How to apply'] },
    { keys: ['jam', 'iit jam'], reply: `IIT JAM Mathematics prep covers real analysis, abstract algebra, complex analysis and linear algebra at MSc-entrance depth, taught by Sajad (himself an IIT JAM qualifier). 96% success rate.`, related: ['CSIR NET', 'GATE', 'How to apply'] },
    { keys: ['gate'], reply: `GATE prep (Engineering Mathematics, CS, Data Science &amp; AI) covers linear algebra, calculus, probability and optimization, with a 95% student success rate.`, related: ['CSIR NET', 'IIT JAM', 'How to apply'] },
    { keys: ['csir', 'net', 'csir net'], reply: `CSIR NET Mathematical Sciences coaching draws directly on Sajad's own AIR 36 qualifying rank — deep coverage of pure &amp; applied math at PhD-entrance level. 94% success rate.`, related: ['GATE', 'IIT JAM', 'How to apply'] },
    { keys: ['jkssb'], reply: `JKSSB Mathematics/Science prep is tailored for Jammu &amp; Kashmir state civil service exams, with local insights and region-specific strategy. 93% success rate.`, related: ['Exams', 'How to apply'] },
    { keys: ['mentor', 'mentors', 'teacher', 'instructor', 'faculty', 'sajad', 'founder'], reply: `Mlabs is led by Sajad Ahmad Mir (PhD researcher @ NTU Singapore, CSIR-NET AIR 36) alongside a team of PhDs and competition veterans. Meet the team: <a href="${link('mentors')}">Mentors page</a>.`, related: ['Team', 'How to apply'] },
    { keys: ['team', 'staff', 'faculty members'], reply: `Beyond Sajad, the team includes Dr. Arjun Kumar (Olympiad &amp; pure math), Prof. Li Chen (algorithms &amp; CS), Dr. Sarah Lee (data science &amp; statistics), Prof. Raj Patel (GATE &amp; civil services), Dr. Maya Sharma (AI/ML) and Prof. James Wilson (research mathematics). Full bios: <a href="${link('mentors')}">Mentors page</a>.`, related: ['Mentors', 'How to apply'] },
    { keys: ['fee', 'fees', 'price', 'pricing', 'cost', 'payment', 'money'], reply: `Pricing depends on the program and format (group / one-on-one / self-paced). Fill out the <a href="${link('apply')}">sign-up form</a> and our team will share exact pricing within 24 hours.`, related: ['Scholarship', 'Refund policy', 'How to apply'] },
    { keys: ['scholarship', 'financial aid'], reply: `We offer performance-based scholarships to deserving students. Mention it in your sign-up, or ask our team after enrollment to discuss options.`, related: ['Fees', 'How to apply'] },
    { keys: ['duration', 'how long', 'weeks', 'length'], reply: `Most programs run 10-14 weeks depending on the course, with flexible scheduling so you can move at your own pace.`, related: ['Courses', 'Fees'] },
    { keys: ['refund', 'cancel', 'money back', 'money-back', 'refund policy'], reply: `We offer a 7-day money-back guarantee. After that, refunds are prorated based on course completion.`, related: ['Fees', 'How to apply'] },
    { keys: ['success', 'result', 'results', 'rate', 'placement'], reply: `We maintain a 95%+ success rate across exams, with 1000+ students trained by 50+ expert instructors.`, related: ['Courses', 'Mentors'] },
    { keys: ['practice problem', 'problem of the day', 'practice'], reply: `Check out the "Practice Problem of the Day" widget on the <a href="${link('home')}">homepage</a> — a fresh math/coding/AI problem you can try, with the answer one click away.`, related: ['Courses', 'How to apply'] },
    { keys: ['testimonial', 'review', 'reviews'], reply: `Real student stories are on the <a href="${link('home')}">homepage</a> testimonials carousel — covering IIT JAM, GATE, CSIR NET and competitive coding results.`, related: ['Success rate', 'How to apply'] },
    { keys: ['dark mode', 'theme', 'light mode'], reply: `There's a 🌙/☀️ toggle in the navigation bar on every page — it remembers your preference for next time.`, related: ['Courses'] },
    { keys: ['video', 'videos', 'youtube', 'channel'], reply: `Watch free lessons and walkthroughs on our <a href="https://www.youtube.com/@mlabs-1" target="_blank" rel="noopener">YouTube channel</a> — a few are also embedded on the <a href="${link('home')}">homepage</a>.`, related: ['Courses', 'How to apply'] },
    { keys: ['whatsapp'], reply: `You can message us directly on WhatsApp using the green button in the corner of any page.`, related: ['Talk to a human'] },
    { keys: ['apply', 'enroll', 'enrol', 'signup', 'sign up', 'register', 'join', 'start', 'how to apply'], reply: `You can apply directly here: <a href="${link('apply')}">Sign Up page</a>. Our team responds within 24 hours of your submission.`, related: ['Fees', 'Talk to a human'] },
    { keys: ['contact', 'support', 'help', 'reach', 'human', 'talk to someone', 'talk to a human'], reply: `The quickest way to reach us is the <a href="${link('apply')}">sign-up form</a>, or message us instantly on WhatsApp — I can open that for you.`, related: ['Talk to a human', 'How to apply'] },
    { keys: ['blog', 'article', 'articles'], reply: `Check out tips and strategies on our <a href="${link('blog')}">Blog</a>.`, related: ['Courses'] },
    { keys: ['thank', 'thanks'], reply: `You're welcome! Let me know if you have more questions.` },
    { keys: ['who are you', 'what are you', 'bot'], reply: `I'm a simple scripted assistant for the Mlabs site — I can point you to courses, exams, mentors, fees, and the sign-up process. For anything more complex, tap "Talk to a human".`, related: ['Talk to a human'] }
  ];

  const defaultQuickReplies = ['Courses', 'Exams', 'Mentors', 'Fees', 'How to apply', 'Talk to a human'];

  const getReply = (message) => {
    const text = message.toLowerCase();
    let best = null;
    let bestScore = 0;

    rules.forEach(rule => {
      let score = 0;
      rule.keys.forEach(k => { if (text.includes(k)) score += k.length; });
      if (score > bestScore) {
        bestScore = score;
        best = rule;
      }
    });

    if (best) return { reply: best.reply, related: best.related };
    return {
      reply: `I don't have a specific answer for that yet. Try asking about <em>courses</em>, <em>exams</em>, <em>mentors</em>, <em>fees</em>, or <em>how to apply</em> — or talk to a human via WhatsApp.`,
      related: ['Talk to a human', 'Courses', 'Exams']
    };
  };

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="mlabsChatLauncher" class="chat-launcher" type="button" aria-label="Open chat assistant">
      💬<span class="chat-badge"></span>
    </button>
    <div id="mlabsChatWindow" class="chat-window" role="dialog" aria-label="Mlabs assistant chat">
      <div class="chat-header">
        <div>
          <div class="chat-header-title">Mlabs Assistant</div>
          <div class="chat-header-sub">Ask about courses, exams &amp; more</div>
        </div>
        <button class="chat-close" type="button" aria-label="Close chat">✕</button>
      </div>
      <div class="chat-messages" id="mlabsChatMessages"></div>
      <div class="chat-quick-replies" id="mlabsChatQuick"></div>
      <div class="chat-input-row">
        <input type="text" id="mlabsChatInput" placeholder="Type a question..." autocomplete="off">
        <button type="button" id="mlabsChatSend">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const launcher = document.getElementById('mlabsChatLauncher');
  const win = document.getElementById('mlabsChatWindow');
  const closeBtn = win.querySelector('.chat-close');
  const messagesEl = document.getElementById('mlabsChatMessages');
  const quickEl = document.getElementById('mlabsChatQuick');
  const input = document.getElementById('mlabsChatInput');
  const sendBtn = document.getElementById('mlabsChatSend');

  const STORAGE_KEY = 'mlabs-chat-history';
  const OPEN_KEY = 'mlabs-chat-open';

  const loadHistory = () => {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { return []; }
  };
  const saveHistory = () => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch (e) { /* storage unavailable */ }
  };

  const history = loadHistory();

  const addMessage = (html, from, persist = true) => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${from}`;
    msg.innerHTML = html;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    if (persist) {
      history.push({ html, from });
      saveHistory();
    }
  };

  const escapeHtml = (str) => str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const openWhatsApp = () => {
    closeChat();
    const waWin = document.getElementById('whatsappWindow');
    const waInput = document.getElementById('whatsappInput');
    if (waWin) {
      waWin.classList.add('open');
      if (waInput) { waInput.focus(); waInput.select(); }
    }
  };

  const renderQuickReplies = (labels) => {
    quickEl.innerHTML = '';
    (labels && labels.length ? labels : defaultQuickReplies).forEach(label => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-quick-reply';
      btn.textContent = label;
      if (label === 'Talk to a human') {
        btn.addEventListener('click', openWhatsApp);
      } else {
        btn.addEventListener('click', () => respondTo(label));
      }
      quickEl.appendChild(btn);
    });
  };

  let typingEl = null;
  const showTyping = () => {
    typingEl = document.createElement('div');
    typingEl.className = 'chat-msg bot chat-typing';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };
  const hideTyping = () => {
    if (typingEl) {
      typingEl.remove();
      typingEl = null;
    }
  };

  const respondTo = (text) => {
    addMessage(escapeHtml(text), 'user');
    showTyping();
    const delay = 500 + Math.random() * 400;
    setTimeout(() => {
      hideTyping();
      const { reply, related } = getReply(text);
      addMessage(reply, 'bot');
      renderQuickReplies(related);
    }, delay);
  };

  history.forEach(m => addMessage(m.html, m.from, false));
  if (history.length) renderQuickReplies();

  const sendFromInput = () => {
    const value = input.value.trim();
    if (!value) return;
    respondTo(value);
    input.value = '';
  };

  sendBtn.addEventListener('click', sendFromInput);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendFromInput();
  });

  const openChat = () => {
    win.classList.add('open');
    launcher.setAttribute('aria-expanded', 'true');
    try { sessionStorage.setItem(OPEN_KEY, 'true'); } catch (e) { /* storage unavailable */ }
    if (history.length === 0) {
      addMessage("Hi! 👋 I'm the Mlabs assistant. Ask me about courses, exams, mentors, fees, or how to apply — or tap a quick reply below.", 'bot');
      renderQuickReplies();
    }
    input.focus();
  };
  const closeChat = () => {
    win.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    try { sessionStorage.setItem(OPEN_KEY, 'false'); } catch (e) { /* storage unavailable */ }
  };

  launcher.addEventListener('click', () => {
    if (win.classList.contains('open')) {
      closeChat();
    } else {
      const waWin = document.getElementById('whatsappWindow');
      if (waWin) waWin.classList.remove('open');
      openChat();
    }
  });
  closeBtn.addEventListener('click', closeChat);

  try {
    if (sessionStorage.getItem(OPEN_KEY) === 'true') openChat();
  } catch (e) { /* storage unavailable */ }
}

// =============================
// WHATSAPP CHAT WIDGET (opens a composer, hands off to wa.me)
// =============================
function initWhatsAppWidget() {
  if (document.getElementById('mlabsWhatsApp')) return;

  const phone = '919682185278';
  const defaultMessage = "Hi, I'm interested in Mlabs courses.";
  const whatsappIcon = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.002c-5.522 0-10 4.478-10 9.998 0 1.757.47 3.47 1.358 4.978L2 22l5.06-1.36a9.962 9.962 0 0 0 4.94 1.36h.001c5.522 0 10-4.478 10-9.998 0-5.52-4.478-9.998-10-9.998zm5.5 14.666c-.244.686-1.44 1.35-2.038 1.437-.552.077-1.156.105-2.598-.611-1.978-.718-3.257-2.143-3.380-2.283-.124-.141-1.164-1.32-1.166-2.521-.002-1.202.781-1.84.968-2.047.185-.208.403-.264.584-.264.18 0 .366.006.527.01.166.003.39-.062.59.472.2.534.687 1.712.748 1.84.058.128.104.215.022.355-.083.14-.126.221-.242.339-.116.118-.235.263-.34.363-.11.105-.223.203-.084.402.14.197.625.962 1.342 1.58.924.778 1.71 1.029 2.019 1.144.31.114.48.082.657-.049.176-.131.712-.826.91-1.114.2-.29.398-.238.658-.144.258.094 1.616.759 1.89.846.277.087.46.13.528.202.067.071.067.405-.178 1.091z" fill="white"/></svg>';

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="mlabsWhatsApp" class="whatsapp-launcher" type="button" aria-label="Chat with us on WhatsApp">
      ${whatsappIcon}<span class="chat-badge"></span>
    </button>
    <div id="whatsappWindow" class="chat-window whatsapp-window" role="dialog" aria-label="WhatsApp chat">
      <div class="chat-header">
        <div>
          <div class="chat-header-title">Chat on WhatsApp</div>
          <div class="chat-header-sub">We usually reply within a day</div>
        </div>
        <button class="chat-close" type="button" aria-label="Close">✕</button>
      </div>
      <div class="chat-messages" id="whatsappMessages">
        <div class="chat-msg bot">Hi! 👋 Type your message below, hit send, and it'll open WhatsApp so you can message our team directly.</div>
      </div>
      <div class="chat-input-row">
        <input type="text" id="whatsappInput" value="${defaultMessage}" autocomplete="off">
        <button type="button" id="whatsappSend">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const launcher = document.getElementById('mlabsWhatsApp');
  const win = document.getElementById('whatsappWindow');
  const closeBtn = win.querySelector('.chat-close');
  const messagesEl = document.getElementById('whatsappMessages');
  const input = document.getElementById('whatsappInput');
  const sendBtn = document.getElementById('whatsappSend');

  const openWin = () => {
    const chatWin = document.getElementById('mlabsChatWindow');
    if (chatWin) chatWin.classList.remove('open');
    win.classList.add('open');
    input.focus();
    input.select();
  };
  const closeWin = () => win.classList.remove('open');

  launcher.addEventListener('click', () => {
    win.classList.contains('open') ? closeWin() : openWin();
  });
  closeBtn.addEventListener('click', closeWin);

  const send = () => {
    const text = input.value.trim();
    if (!text) return;

    const bubble = document.createElement('div');
    bubble.className = 'chat-msg user';
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
}

// =============================
// INITIALIZE NEW INTERACTIVE FEATURES
// =============================
initMobileNav();
initThemeToggle();
initHeroBackground();
initStatCounters();
initStaggerReveal();
initFaqAccordion();
initTestimonialCarousel();
initProblemWidget();
initChatWidget();
initWhatsAppWidget();

// =============================
// PAGE LOAD COMPLETE
// =============================
console.log("Mlabs JavaScript enhancements loaded successfully");
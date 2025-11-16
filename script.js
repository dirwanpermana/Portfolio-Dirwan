// Download CV function
const downloadBtn = document.getElementById('downloadCV');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/CV DAN PORTFOLIO DIRWAN PERMANA.pdf';
    link.download = 'Dirwan-Permana-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Copy Email function
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const email = 'permanadirwan5@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      // Show feedback
      const originalText = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = '<span>✓</span> Copied!';
      copyEmailBtn.style.backgroundColor = '#28a745';
      
      setTimeout(() => {
        copyEmailBtn.innerHTML = originalText;
        copyEmailBtn.style.backgroundColor = '';
      }, 2000);
    }).catch(() => {
      alert('Gagal copy email. Silakan coba lagi.');
    });
  });
}

// Certificate Download function
document.querySelectorAll('.cert-download-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const certType = btn.getAttribute('data-cert');
    const certMap = {
      'udemy': { file: 'assets/Certificate/The Complete 2024 Software Testing Bootcamp.pdf', name: 'SQA-Bootcamp-certificate Dirwan.pdf' },
      'codepolitan': { file: 'assets/Certificate/certificate fullstack codepolitan - dirwan.zip', name: 'Fullstack-Codepolitan-Dirwan.zip' },
      'buildwithangga': { file: 'assets/Certificate/full-stack-javascript-mern-developer-web-beli-tiket-bioskop-dirwan-permana.pdf', name: 'MERN Develover - Certificate Dirwan.pdf' },
      'cypress': { file: 'assets/Certificate/Certificate QA Engineer - Cypress.pdf', name: 'Cypress Automation-certificate Dirwan.pdf' },
      'selenium': { file: 'assets/Certificate/Dirwan Permana - Certification Bootcamp Selenium.pdf', name: 'Selenium Automation-certificate Dirwan.pdf' },
    };
    
    const cert = certMap[certType];
    if (cert) {
      const link = document.createElement('a');
      link.href = cert.file;
      link.download = cert.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show feedback
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>✓</span> Downloaded!';
      btn.style.opacity = '0.8';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
      }, 2000);
    } else {
      alert('Certificate file not available yet.');
    }
  });
});

// Toggle mobile nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// Close mobile nav when clicking on a link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile nav if open
        if (window.innerWidth <= 900 && mainNav) {
          mainNav.classList.remove('active');
        }
      }
    }
  });
});

// Fade-in on scroll using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Sticky header shadow toggle
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Project slider smooth scroll buttons
const slider = document.querySelector('.project-slider');
if (slider) {
  // Auto scroll functionality
  let isScrolling = false;
  slider.addEventListener('wheel', (e) => {
    if (!isScrolling) {
      isScrolling = true;
      slider.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 100);
      e.preventDefault();
    }
  }, { passive: false });
}

// Smooth page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

/* Card sliders (About & Skills & Projects) */
function initCardSliders() {
  document.querySelectorAll('.card-slider').forEach((sliderEl) => {
    const track = sliderEl.querySelector('.slider-track');
    const btnPrev = sliderEl.querySelector('.slider-btn.prev');
    const btnNext = sliderEl.querySelector('.slider-btn.next');
    const dotsWrap = sliderEl.querySelector('.slider-dots');

    if (!track || !btnPrev || !btnNext) return;

    const slides = Array.from(track.querySelectorAll('.slide'));
    let currentIndex = 0;

    // Ensure buttons are proper buttons
    btnPrev.type = 'button';
    btnNext.type = 'button';

    // Build dots
    if (dotsWrap) {
      slides.forEach((slide, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.dataset.index = i;
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          goToSlide(i);
        });
        
        dotsWrap.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('button').forEach(dot => {
        dot.classList.remove('active');
      });
      const activeDot = dotsWrap.querySelector(`button[data-index="${currentIndex}"]`);
      if (activeDot) activeDot.classList.add('active');
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      const slide = slides[currentIndex];
      if (slide) {
        const offset = slide.offsetLeft - track.offsetLeft;
        track.scrollTo({ left: offset, behavior: 'smooth' });
      }
      updateDots();
    }

    // Button handlers
    const handlePrev = () => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    };

    const handleNext = () => {
      if (currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      }
    };

    btnPrev.addEventListener('click', handlePrev);
    btnNext.addEventListener('click', handleNext);

    // Update index on scroll
    let scrollTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollLeft = track.scrollLeft;
        const trackWidth = track.clientWidth;
        const center = scrollLeft + trackWidth / 2;

        let closest = 0;
        let closestDist = Infinity;

        slides.forEach((slide, i) => {
          const slideLeft = slide.offsetLeft - track.offsetLeft;
          const slideCenter = slideLeft + slide.offsetWidth / 2;
          const dist = Math.abs(slideCenter - center);

          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });

        currentIndex = closest;
        updateDots();
      }, 100);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardSliders);
} else {
  initCardSliders();
}
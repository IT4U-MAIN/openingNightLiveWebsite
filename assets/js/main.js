// Opening Night Live - Main JavaScript
// Vanilla JS | ES6+ | Accessible Components

(function() {
  'use strict';

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  
  const initMobileNav = () => {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    const menuLinks = document.querySelectorAll('.nav__link');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-active');
      const isOpen = menu.classList.contains('is-active');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '✕' : '☰';
    });
    
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });
    
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    });
  };

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ============================================
  // INTERSECTION OBSERVER - FADE IN
  // ============================================
  
  const initFadeIn = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
  };

  // ============================================
  // COUNTDOWN MODULE
  // ============================================
  
  const initCountdown = () => {
    const countdown = document.querySelector('[data-launch]');
    if (!countdown) return;
    
    const launchDate = new Date(countdown.getAttribute('data-launch')).getTime();
    
    if (isNaN(launchDate)) {
      countdown.classList.add('is-hidden');
      return;
    }
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance < 0) {
        countdown.classList.add('is-hidden');
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      const daysEl = countdown.querySelector('[data-countdown="days"]');
      const hoursEl = countdown.querySelector('[data-countdown="hours"]');
      const minutesEl = countdown.querySelector('[data-countdown="minutes"]');
      const secondsEl = countdown.querySelector('[data-countdown="seconds"]');
      
      if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
      if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
      if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
      if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  };

  // ============================================
  // CAROUSEL
  // ============================================
  
  class Carousel {
    constructor(element) {
      this.carousel = element;
      this.track = element.querySelector('.carousel__track');
      this.slides = Array.from(element.querySelectorAll('.carousel__slide'));
      this.prevBtn = element.querySelector('[data-carousel="prev"]');
      this.nextBtn = element.querySelector('[data-carousel="next"]');
      this.dotsContainer = element.querySelector('.carousel__dots');
      this.currentIndex = 0;
      this.autoplayInterval = null;
      
      this.init();
    }
    
    init() {
      if (!this.track || this.slides.length === 0) return;
      
      this.createDots();
      this.attachEvents();
      this.startAutoplay();
      
      this.slides[0].setAttribute('aria-hidden', 'false');
      this.slides.slice(1).forEach(slide => slide.setAttribute('aria-hidden', 'true'));
    }
    
    createDots() {
      if (!this.dotsContainer) return;
      
      this.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('is-active');
        
        dot.addEventListener('click', () => this.goToSlide(index));
        this.dotsContainer.appendChild(dot);
      });
    }
    
    attachEvents() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prev());
      }
      
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.next());
      }
      
      this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
      
      this.carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
    }
    
    goToSlide(index) {
      this.currentIndex = index;
      const offset = -100 * index;
      this.track.style.transform = `translateX(${offset}%)`;
      
      this.slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== index);
      });
      
      this.updateDots();
    }
    
    next() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    }
    
    prev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    }
    
    updateDots() {
      if (!this.dotsContainer) return;
      
      const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === this.currentIndex);
      });
    }
    
    startAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      this.autoplayInterval = setInterval(() => this.next(), 5000);
    }
    
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }
  }
  
  const initCarousels = () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
      new Carousel(carousel);
    });
  };

  // ============================================
  // MODAL
  // ============================================
  
  class Modal {
    constructor() {
      this.modals = document.querySelectorAll('.modal');
      this.init();
    }
    
    init() {
      document.querySelectorAll('[data-modal-open]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.getAttribute('data-modal-open');
          this.open(modalId);
        });
      });
      
      this.modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        
        if (closeBtn) {
          closeBtn.addEventListener('click', () => this.close(modal));
        }
        
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.close(modal);
        });
        
        modal.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') this.close(modal);
        });
      });
    }
    
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
      
      this.trapFocus(modal);
    }
    
    close(modal) {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    
    trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    }
  }

  // ============================================
  // FORM VALIDATION
  // ============================================
  
  const initFormValidation = () => {
    const forms = document.querySelectorAll('.form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const honeypot = form.querySelector('.form__honeypot input');
        if (honeypot && honeypot.value) {
          return;
        }
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
          const errorEl = input.parentElement.querySelector('.form__error');
          
          if (!input.value.trim()) {
            isValid = false;
            input.setAttribute('aria-invalid', 'true');
            if (errorEl) {
              errorEl.classList.add('is-visible');
              input.setAttribute('aria-describedby', errorEl.id);
            }
          } else {
            input.setAttribute('aria-invalid', 'false');
            if (errorEl) {
              errorEl.classList.remove('is-visible');
              input.removeAttribute('aria-describedby');
            }
          }
          
          if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              isValid = false;
              input.setAttribute('aria-invalid', 'true');
              if (errorEl) {
                errorEl.textContent = 'Please enter a valid email address';
                errorEl.classList.add('is-visible');
              }
            }
          }
        });
        
        if (isValid) {
          console.log('Form is valid - ready for backend integration');
        }
      });
      
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          const errorEl = input.parentElement.querySelector('.form__error');
          
          if (input.hasAttribute('required') && !input.value.trim()) {
            input.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.classList.add('is-visible');
          } else {
            input.setAttribute('aria-invalid', 'false');
            if (errorEl) errorEl.classList.remove('is-visible');
          }
        });
      });
    });
  };

  // ============================================
  // MULTI-STEP FORM
  // ============================================
  
  const initMultiStepForm = () => {
    const form = document.querySelector('.form--multi-step');
    if (!form) return;
    
    const steps = Array.from(form.querySelectorAll('.form__step'));
    const indicators = Array.from(form.querySelectorAll('.form__step-indicator'));
    const prevBtn = form.querySelector('[data-form="prev"]');
    const nextBtn = form.querySelector('[data-form="next"]');
    const submitBtn = form.querySelector('[data-form="submit"]');
    let currentStep = 0;
    
    const showStep = (index) => {
      steps.forEach((step, i) => {
        step.classList.toggle('is-active', i === index);
        step.setAttribute('aria-hidden', i !== index);
      });
      
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('is-active', i <= index);
      });
      
      if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'block';
      if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? 'none' : 'block';
      if (submitBtn) submitBtn.style.display = index === steps.length - 1 ? 'block' : 'none';
    };
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }
    
    showStep(0);
  };

  // ============================================
  // COPY TO CLIPBOARD
  // ============================================
  
  const initCopyToClipboard = () => {
    const copyBtns = document.querySelectorAll('[data-copy]');
    
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.backgroundColor = 'var(--color-accent-warm)';
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  };

  // ============================================
  // PRICING TOGGLE
  // ============================================
  
  const initPricingToggle = () => {
    const toggle = document.querySelector('[data-pricing-toggle]');
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
      const cards = document.querySelectorAll('.pricing__card');
      cards.forEach(card => {
        const features = card.querySelector('.pricing__features');
        if (features) {
          features.style.display = features.style.display === 'none' ? 'block' : 'none';
        }
      });
      
      toggle.textContent = toggle.textContent.includes('Show') ? 'Hide details' : 'Show details';
    });
  };

  // ============================================
  // PARALLAX EFFECT
  // ============================================
  
  const initParallax = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  };

  // ============================================
  // INIT ALL
  // ============================================
  
  const init = () => {
    initMobileNav();
    initSmoothScroll();
    initFadeIn();
    initCountdown();
    initCarousels();
    new Modal();
    initFormValidation();
    initMultiStepForm();
    initCopyToClipboard();
    initPricingToggle();
    initParallax();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

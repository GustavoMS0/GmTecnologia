/**
 * GM Tecnologia - Main Script
 * Handles Navigation, Mobile Drawer, ScrollSpy, Copy Email Toast, and Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initIcons = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };
  initIcons();
  window.addEventListener('load', initIcons);

  // 2. Header Scroll Effect
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu?.classList.remove('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    menuIcon?.classList.add('hidden');
    closeIcon?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    mobileMenu?.classList.add('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  mobileMenuBtn?.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuBtn?.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  // 4. ScrollSpy (Active Navigation Highlighting)
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('nav a.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  const handleBackToTopVisibility = () => {
    if (window.scrollY > 450) {
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  };
  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  handleBackToTopVisibility();

  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. Copy Email to Clipboard with Visual Toast Feedback
  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('copy-toast');
  let toastTimeout = null;

  function showToast(message = 'E-mail copiado com sucesso!') {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const email = btn.getAttribute('data-email') || 'gustavo.suportetec@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('E-mail copiado com sucesso!');
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast('E-mail copiado com sucesso!');
        } catch {
          window.location.href = `mailto:${email}`;
        }
        document.body.removeChild(textarea);
      }
    });
  });

  // 7. Accordion Single-Open Enhancement (Optional smooth behavior)
  const accordionDetails = document.querySelectorAll('#tecnologias details');
  accordionDetails.forEach((targetDetail) => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        accordionDetails.forEach((otherDetail) => {
          if (otherDetail !== targetDetail && otherDetail.open) {
            otherDetail.removeAttribute('open');
          }
        });
      }
    });
  });
});

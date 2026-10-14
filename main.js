/**
 * GM Tecnologia - Main Script
 * Handles Navigation, Mobile Drawer, ScrollSpy, Fluid Accordion Animations, and Copy Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons (script carregado com defer antes deste arquivo)
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  const isMenuOpen = () => mobileMenuBtn?.getAttribute('aria-expanded') === 'true';

  // Elementos focáveis do diálogo: o botão de alternância (que fecha o menu) + links do menu
  const getMenuFocusables = () => {
    const items = mobileMenu
      ? Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      : [];
    return mobileMenuBtn ? [mobileMenuBtn, ...items] : items;
  };

  function openMobileMenu() {
    mobileMenu?.classList.remove('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    mobileMenuBtn?.setAttribute('aria-label', 'Fechar menu de navegação');
    menuIcon?.classList.add('hidden');
    closeIcon?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    // Move o foco para o primeiro link do menu
    mobileMenu?.querySelector('a[href]')?.focus();
  }

  function closeMobileMenu({ restoreFocus = true } = {}) {
    mobileMenu?.classList.add('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    mobileMenuBtn?.setAttribute('aria-label', 'Abrir menu de navegação');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (restoreFocus) mobileMenuBtn?.focus();
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
      // O foco segue a navegação para a âncora; não devolve ao botão
      closeMobileMenu({ restoreFocus: false });
    });
  });

  // Escape fecha o menu; Tab/Shift+Tab ficam presos dentro do diálogo enquanto aberto
  document.addEventListener('keydown', (e) => {
    if (!isMenuOpen()) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMobileMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getMenuFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!focusables.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
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
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });

  // 6. Copy Email to Clipboard with Visual Toast Feedback
  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('copy-toast');
  let toastTimeout = null;

  function showToast(message = 'E-mail copiado com sucesso!', type = 'success') {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    toast.querySelector('.toast-icon-success')?.classList.toggle('hidden', type !== 'success');
    toast.querySelector('.toast-icon-error')?.classList.toggle('hidden', type === 'success');

    // O texto só é inserido quando o toast é exibido, para ser anunciado pela região aria-live
    if (toastText) toastText.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
      if (toastText) toastText.textContent = '';
    }, type === 'success' ? 3200 : 5000);
  }

  // Fallback para navegadores sem Clipboard API (ou fora de contexto seguro)
  function legacyCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  copyEmailButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'gustavo.suportetec@gmail.com';
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch {
        copied = false;
      }
      if (!copied) copied = legacyCopy(email);

      if (copied) {
        showToast('E-mail copiado com sucesso!', 'success');
      } else {
        showToast(`Não foi possível copiar. Use: ${email}`, 'error');
      }
    });
  });

  // 7. Fluid, Smoothly Animated Accordion (Web Animations API)
  function initAnimatedAccordion() {
    const detailsList = document.querySelectorAll('#tecnologias details');

    detailsList.forEach((el) => {
      const summary = el.querySelector('summary');
      const content = el.querySelector('.accordion-body') || el.querySelector('div:not(summary)');
      if (!summary || !content) return;

      let animation = null;
      let isClosing = false;
      let isExpanding = false;

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        el.style.overflow = 'hidden';

        if (isClosing || !el.open) {
          // Smoothly close any other open accordion in this section
          detailsList.forEach((other) => {
            if (other !== el && other.open && other._shrink) {
              other._shrink();
            }
          });
          openAccordion();
        } else if (isExpanding || el.open) {
          shrinkAccordion();
        }
      });

      function shrinkAccordion() {
        if (isClosing) return;
        isClosing = true;
        el.classList.remove('is-open');

        const startHeight = `${el.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight}px`;

        if (animation) animation.cancel();

        animation = el.animate(
          { height: [startHeight, endHeight] },
          { duration: prefersReducedMotion() ? 0 : 280, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );

        animation.onfinish = () => {
          el.open = false;
          isClosing = false;
          el.style.height = '';
          el.style.overflow = '';
        };

        animation.oncancel = () => {
          isClosing = false;
        };
      }

      function openAccordion() {
        el.style.height = `${el.offsetHeight}px`;
        el.open = true;
        el.classList.add('is-open');

        window.requestAnimationFrame(() => {
          isExpanding = true;
          const startHeight = `${el.offsetHeight}px`;
          const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

          if (animation) animation.cancel();

          animation = el.animate(
            { height: [startHeight, endHeight] },
            { duration: prefersReducedMotion() ? 0 : 320, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );

          animation.onfinish = () => {
            isExpanding = false;
            el.style.height = '';
            el.style.overflow = '';
          };

          animation.oncancel = () => {
            isExpanding = false;
          };
        });
      }

      el._shrink = shrinkAccordion;
    });
  }

  initAnimatedAccordion();
});

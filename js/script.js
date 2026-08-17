document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  setupServiceGalleries();
});

/* Fotos de cada serviço — adicione os caminhos das imagens em cada lista
   abaixo (ex.: "images/servicos/limpeza-1.jpg") para ativar a galeria do
   card correspondente. Cards sem fotos continuam não-clicáveis. */
const SERVICE_GALLERIES = {
  'limpeza-aterro': [
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.39 (1).webp',
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.39 (2).webp',
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.40.webp',
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.40 (1).webp',
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.40 (2).webp',
    'images/Limpeza de Terrenos e Aterro/WhatsApp Image 2026-08-14 at 16.30.42.webp',
  ],
  'demolicoes': [],
  'piscinas': [],
  'baldrames': [],
};

function setupServiceGalleries() {
  const modal = document.getElementById('galleryModal');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalGrid = document.getElementById('galleryModalGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  if (!modal || !modalTitle || !modalGrid || !lightbox || !lightboxImg) {
    return;
  }

  // 0 = fechado, 1 = galeria de miniaturas aberta, 2 = foto em tela cheia
  let openLevel = 0;

  function updateBodyScrollLock() {
    document.body.style.overflow = openLevel > 0 ? 'hidden' : '';
  }

  function openGalleryFor(card) {
    const key = card.dataset.gallery;
    const photos = SERVICE_GALLERIES[key] || [];
    if (!photos.length) {
      return;
    }

    const title = card.dataset.galleryTitle || '';
    modalTitle.textContent = title;
    modalGrid.innerHTML = '';

    photos.forEach((src, index) => {
      const thumbBtn = document.createElement('button');
      thumbBtn.type = 'button';
      thumbBtn.setAttribute('aria-label', `Ampliar foto ${index + 1} de ${title}`);

      const img = document.createElement('img');
      img.src = src;
      img.alt = `${title} — foto ${index + 1}`;
      img.loading = 'lazy';

      thumbBtn.appendChild(img);
      thumbBtn.addEventListener('click', () => openLightbox(src, img.alt));
      modalGrid.appendChild(thumbBtn);
    });

    history.pushState({ agGallery: true }, '');
    openLevel = 1;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    updateBodyScrollLock();
  }

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    history.pushState({ agLightbox: true }, '');
    openLevel = 2;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    updateBodyScrollLock();
  }

  function hideLightboxOnly() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  function hideModalOnly() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Fecha via clique (fora da foto/galeria ou no X): delega para o
  // histórico, que aciona o handler de popstate abaixo — assim o botão
  // "voltar" do celular e o clique fora fazem exatamente a mesma coisa.
  function requestClose() {
    if (openLevel > 0) {
      history.back();
    }
  }

  window.addEventListener('popstate', () => {
    if (openLevel === 2) {
      hideLightboxOnly();
      openLevel = 1;
    } else if (openLevel === 1) {
      hideModalOnly();
      openLevel = 0;
    }
    updateBodyScrollLock();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && openLevel > 0) {
      requestClose();
    }
  });

  document.querySelectorAll('.service-card[data-gallery]').forEach((card) => {
    const key = card.dataset.gallery;
    const photos = SERVICE_GALLERIES[key] || [];
    if (!photos.length) {
      return;
    }

    card.classList.add('service-card--clickable');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => openGalleryFor(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGalleryFor(card);
      }
    });
  });

  modal.querySelectorAll('[data-gallery-close]').forEach((el) => {
    el.addEventListener('click', requestClose);
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', requestClose);
  });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

const mediaItems = Array.from(document.querySelectorAll('.lightbox-item'));
let currentIndex = -1;

function showInLightbox(index) {
  const media = mediaItems[index];
  if (!media) return;

  lightboxContent.innerHTML = '';
  let content;

  if (media.classList.contains('youtube-thumbnail')) {
    const videoId = media.dataset.videoId;
    const start = media.dataset.start || 0;
    content = document.createElement('iframe');
    content.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${start}`;
    content.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    content.allowFullscreen = true;
    content.frameBorder = 0;
  } else {
    content = media.cloneNode(true);
    content.removeAttribute('class');
    if (content.tagName === 'VIDEO') {
      content.setAttribute('controls', true);
      content.removeAttribute('muted');
    }
  }

  content.style.width = '90vw';
  content.style.height = 'calc(100vh - 80px)';
  content.style.borderRadius = '10px';

  lightboxContent.appendChild(content);
  lightbox.style.display = 'flex';
  currentIndex = index;
}

mediaItems.forEach((media, index) => {
  media.addEventListener('click', () => showInLightbox(index));
});

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxContent.innerHTML = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxContent.innerHTML = '';
  }
});

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  showInLightbox((currentIndex - 1 + mediaItems.length) % mediaItems.length);
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  showInLightbox((currentIndex + 1) % mediaItems.length);
});

const fadeImage = document.querySelector('.scroll-fade-image');

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    fadeImage.classList.add('visible');
  } else {
    fadeImage.classList.remove('visible');
  }
}, {
  threshold: 0.1,
});

if (fadeImage) {
  observer.observe(fadeImage);
}

document.addEventListener('DOMContentLoaded', () => {
  const fadeImage = document.querySelector('.scroll-fade-image');

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      fadeImage.classList.add('visible');
    } else {
      fadeImage.classList.remove('visible');
    }
  }, { threshold: 0.1 });

  if (fadeImage) {
    observer.observe(fadeImage);
  }
});

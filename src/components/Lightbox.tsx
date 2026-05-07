import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

interface SlideData {
  src: string;
  width: number;
  height: number;
  alt: string;
  msrc?: string;
}

function isEligible(img: HTMLImageElement): boolean {
  if (img.closest('header, footer, [data-no-zoom], button')) return false;
  if (img.dataset.lightbox || img.dataset.gallery || img.closest('[data-lightbox],[data-gallery]')) return true;
  const w = img.naturalWidth || img.offsetWidth || img.width;
  const h = img.naturalHeight || img.offsetHeight || img.height;
  return w >= 80 && h >= 80;
}

function findGallery(img: HTMLImageElement): HTMLImageElement[] {
  const explicit = img.closest('[data-gallery]');
  if (explicit) {
    const id = (explicit as HTMLElement).dataset.gallery;
    const scope = document.querySelectorAll<HTMLElement>(`[data-gallery="${id}"]`);
    const imgs: HTMLImageElement[] = [];
    scope.forEach((el) => el.querySelectorAll<HTMLImageElement>('img').forEach((i) => isEligible(i) && imgs.push(i)));
    if (imgs.length) return imgs;
  }
  let node: HTMLElement | null = img.parentElement;
  while (node) {
    const candidates = Array.from(node.querySelectorAll<HTMLImageElement>('img')).filter(isEligible);
    if (candidates.length >= 2) return candidates;
    node = node.parentElement;
  }
  return [img];
}

async function probeDimensions(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve({ w: probe.naturalWidth || 1600, h: probe.naturalHeight || 1200 });
    probe.onerror = () => resolve({ w: 1600, h: 1200 });
    probe.src = src;
  });
}

function toSlide(img: HTMLImageElement): SlideData {
  const src = img.currentSrc || img.src;
  const w = img.naturalWidth || img.dataset.pswpWidth ? Number(img.dataset.pswpWidth) : 0;
  const h = img.naturalHeight || img.dataset.pswpHeight ? Number(img.dataset.pswpHeight) : 0;
  return {
    src,
    width: w || 1600,
    height: h || 1200,
    alt: img.alt || '',
    msrc: src,
  };
}

export function Lightbox() {
  useEffect(() => {
    let pswp: PhotoSwipeLightbox | null = null;

    async function open(target: HTMLImageElement) {
      const siblings = findGallery(target);
      const dataSource: SlideData[] = await Promise.all(
        siblings.map(async (img) => {
          const slide = toSlide(img);
          if (img.naturalWidth && img.naturalHeight) {
            slide.width = img.naturalWidth;
            slide.height = img.naturalHeight;
          } else {
            const dims = await probeDimensions(slide.src);
            slide.width = dims.w;
            slide.height = dims.h;
          }
          return slide;
        }),
      );
      const startIndex = Math.max(
        0,
        siblings.findIndex((s) => (s.currentSrc || s.src) === (target.currentSrc || target.src)),
      );

      pswp = new PhotoSwipeLightbox({
        dataSource,
        pswpModule: PhotoSwipe,
        bgOpacity: 0.94,
        showHideAnimationType: 'fade',
        zoom: true,
        wheelToZoom: true,
        loop: true,
        padding: { top: 40, bottom: 40, left: 16, right: 16 },
      });

      pswp.on('uiRegister', () => {
        pswp?.pswp?.ui?.registerElement({
          name: 'caption',
          order: 9,
          isButton: false,
          appendTo: 'root',
          html: '',
          onInit: (el) => {
            el.classList.add('pswp__caption');
            pswp?.pswp?.on('change', () => {
              const slide = pswp?.pswp?.currSlide?.data as SlideData | undefined;
              el.innerText = slide?.alt || '';
            });
          },
        });
      });

      pswp.on('close', () => {
        pswp?.destroy();
        pswp = null;
      });

      pswp.init();
      pswp.loadAndOpen(startIndex);
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLImageElement)) return;
      if (!isEligible(target)) return;
      e.preventDefault();
      e.stopPropagation();
      void open(target);
    }

    document.addEventListener('click', onClick, true);

    function markZoomable() {
      const imgs = document.querySelectorAll<HTMLImageElement>('main img');
      imgs.forEach((img) => {
        if (img.closest('[data-no-zoom], button')) return;
        if (img.dataset.zoomable === 'true') return;
        const explicit =
          img.dataset.lightbox || img.dataset.gallery || img.closest('[data-lightbox],[data-gallery]');
        if (explicit) {
          img.dataset.zoomable = 'true';
          img.style.cursor = 'zoom-in';
          return;
        }
        const w = img.naturalWidth || img.offsetWidth || img.width;
        const h = img.naturalHeight || img.offsetHeight || img.height;
        if (w < 80 || h < 80) return;
        img.dataset.zoomable = 'true';
        img.style.cursor = 'zoom-in';
      });
    }
    markZoomable();
    const interval = window.setInterval(markZoomable, 1500);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearInterval(interval);
      pswp?.destroy();
      pswp = null;
    };
  }, []);

  return null;
}

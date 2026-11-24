'use client'

import { useEffect } from 'react'

/*
 * Drives the site's motion (styles in app/globals.css). Everything is one quiet pass on a single rAF per frame:
 *
 *  - Entrance reveals: adds `.in` to each pending element once its top reaches 92% of the viewport (including ones
 *    already scrolled past, so a fast fling or an anchor jump never leaves a section hidden). A MutationObserver picks
 *    up content that arrives later (client navigation, the case-study filter).
 *  - Count-ups: `[data-count]` numbers count from zero when they are revealed.
 *  - Parallax: `[data-parallax="0.1"]` sets --shift on the element (px), which the CSS applies to its image so the
 *    photo drifts slower than the page.
 *  - Timelines: `[data-timeline]` gets --progress (0…1) as it scrolls through the viewport, and each `[data-step]`
 *    child gets `.lit` once the line has reached it.
 *  - Spotlight: `.spotlight` elements get --mx/--my under the mouse for a soft highlight.
 *
 * The hidden starting states only exist when the head script has added `js` to <html>, so without JavaScript nothing
 * is hidden. With reduced motion, reveals are opacity-only, timelines start complete and nothing moves with scroll.
 */
const PENDING = [
  '.reveal:not(.in)',
  '.reveal-scale:not(.in)',
  '.reveal-left:not(.in)',
  '.rise:not(.in)',
  '.draw-line:not(.in)',
  '.marquee:not(.in)',
  '.motif:not(.in)',
  'main section h2:not(.in)',
  '[data-count]:not(.in)',
].join(',')

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count)
  if (!Number.isFinite(target)) return
  const suffix = el.dataset.suffix ?? ''
  const duration = 1800
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // expo out: quick start, long gentle settle
    el.textContent = `${Math.round(target * eased)}${suffix}`
    if (t < 1) requestAnimationFrame(tick)
  }
  el.textContent = `0${suffix}`
  requestAnimationFrame(tick)
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

function updateTimeline(ol: HTMLElement, vh: number, still: boolean) {
  const steps = [...ol.querySelectorAll<HTMLElement>('[data-step]')]
  if (!steps.length) return
  let progress = 1
  // Steps laid out in a row fill over a short scroll; a column fills as the list itself passes through the view.
  const inRow = steps.length > 1 && Math.abs(steps[1].offsetTop - steps[0].offsetTop) < 8
  if (!still) {
    const r = ol.getBoundingClientRect()
    progress = inRow ? clamp((vh * 0.88 - r.top) / (vh * 0.42)) : clamp((vh * 0.78 - r.top) / Math.max(1, r.height))
  }
  ol.style.setProperty('--progress', progress.toFixed(4))
  steps.forEach((step, i) => {
    const at = inRow ? i / Math.max(1, steps.length - 1) : (step.offsetTop + step.offsetHeight / 2) / ol.offsetHeight
    step.classList.toggle('lit', progress >= at - 0.02 || progress === 1)
  })
}

export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('motion-ready')
    if (!root.classList.contains('js')) return
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches

    let queued = false
    const frame = () => {
      queued = false
      const vh = window.innerHeight
      const limit = vh * 0.92
      document.querySelectorAll<HTMLElement>(PENDING).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (!r.width && !r.height) return // not displayed yet
        if (r.top < limit) {
          el.classList.add('in')
          if (el.dataset.count) countUp(el)
        }
      })
      document.querySelectorAll<HTMLElement>('[data-timeline]').forEach((ol) => updateTimeline(ol, vh, still))
      if (still) return
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -100 || r.top > vh + 100) return
        const speed = Number(el.dataset.parallax) || 0.1
        // The photo moves against the scroll (starts high, drifts down), so it travels slower than the page.
        const shift = clamp(-(r.top + r.height / 2 - vh / 2) * speed, -r.height * 0.06, r.height * 0.06)
        el.style.setProperty('--shift', `${shift.toFixed(1)}px`)
      })
    }
    const queue = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(frame)
      }
    }

    // Soft highlight that follows the mouse across spotlight panels (the contact CTA).
    const onPointer = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.spotlight')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }

    const observer = new MutationObserver(queue)
    observer.observe(document.body, { childList: true, subtree: true })
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    addEventListener('hashchange', queue)
    addEventListener('pointermove', onPointer, { passive: true })
    frame()

    return () => {
      observer.disconnect()
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      removeEventListener('hashchange', queue)
      removeEventListener('pointermove', onPointer)
    }
  }, [])

  return null
}

/** Runs before first paint: enables the hidden starting states only when motion is allowed. */
export const motionHeadScript = `(function(){try{var d=document.documentElement;if(!('requestAnimationFrame' in window))return;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},6000)}catch(e){}})();`

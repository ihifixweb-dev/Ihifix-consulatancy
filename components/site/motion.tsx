'use client'

import { useEffect } from 'react'

/*
 * Plays the entrance animations once, as each element first scrolls into view (styles in app/globals.css).
 * The hidden starting state only exists when the head script has added `js` to <html>, so without JavaScript nothing
 * is hidden. Visitors who prefer reduced motion get opacity-only fades: no movement, scaling or loops.
 *
 * Every scroll frame reveals each pending element whose top has reached 92% of the viewport, including ones already
 * scrolled past, so a fast fling or an anchor jump never leaves a section hidden. A MutationObserver picks up content
 * that arrives later (client navigation, the case-study filter).
 */
const PENDING = [
  '.reveal:not(.in)',
  '.reveal-scale:not(.in)',
  '.reveal-left:not(.in)',
  '.rise:not(.in)',
  '.draw-line:not(.in)',
  'main section h2:not(.in)',
  '[data-count]:not(.in)',
].join(',')

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count)
  if (!Number.isFinite(target)) return
  const suffix = el.dataset.suffix ?? ''
  const duration = 1400
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 4)
    el.textContent = `${Math.round(target * eased)}${suffix}`
    if (t < 1) requestAnimationFrame(tick)
  }
  el.textContent = `0${suffix}`
  requestAnimationFrame(tick)
}

export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('motion-ready')
    if (!root.classList.contains('js')) return

    let queued = false
    const check = () => {
      queued = false
      const limit = window.innerHeight * 0.92
      document.querySelectorAll<HTMLElement>(PENDING).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (!r.width && !r.height) return // not displayed yet
        if (r.top < limit) {
          el.classList.add('in')
          if (el.dataset.count) countUp(el)
        }
      })
    }
    const queue = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(check)
      }
    }

    const observer = new MutationObserver(queue)
    observer.observe(document.body, { childList: true, subtree: true })
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    addEventListener('hashchange', queue)
    check()

    return () => {
      observer.disconnect()
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      removeEventListener('hashchange', queue)
    }
  }, [])

  return null
}

/** Runs before first paint: enables the hidden starting states only when motion is allowed. */
export const motionHeadScript = `(function(){try{var d=document.documentElement;if(!('requestAnimationFrame' in window))return;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},6000)}catch(e){}})();`

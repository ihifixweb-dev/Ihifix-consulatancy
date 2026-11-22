'use client'

import { useEffect, useRef } from 'react'

/*
 * The Ihifix Triple Helix: three strands (Consultancy, Education, Foundation) rotate around one another
 * and converge into one mission. Strands are painted on a canvas back-to-front each frame so depth is
 * correct where they cross; labels and the mission node sit in an SVG overlay so text stays crisp.
 * Honours prefers-reduced-motion with a single static frame.
 */

const W = 800
const H = 600
const CY = 300
const X0 = 40
const XEND = 668
const A0 = 108
const WAVE = 280
const MX = XEND + 30
const BG = [7, 26, 110]

const strands = [
  { name: 'Consultancy', color: '#e42c04', glow: '255,90,46' },
  { name: 'Education', color: '#5b84ff', glow: '134,165,255' },
  { name: 'Foundation', color: '#f5b544', glow: '255,209,122' },
]

// Each strand's label is pinned at the x where that strand crosses the front at rest
const labels = [
  { k: 2, nodeX: X0 + WAVE / 3, sub: 'Innovation Foundation', note: 'Expanding access', box: { x: 24, y: 74, w: 206 } },
  { k: 1, nodeX: X0 + (WAVE * 2) / 3, sub: 'Digital Academy & School', note: 'Building talent', box: { x: 128, y: 452, w: 216 } },
  { k: 0, nodeX: X0 + WAVE, sub: 'Ihifix Technologies', note: 'Digital solutions & advisory', box: { x: 250, y: 74, w: 216 }, here: true },
]
const BOX_H = 96

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const conv = (x: number) => smooth(430, XEND, x)
const amp = (x: number) => A0 * (1 - conv(x))
const fadeIn = (x: number) => smooth(X0, X0 + 90, x)

function point(x: number, k: number, t: number) {
  const ph = (2 * Math.PI * (x - X0)) / WAVE - t + (k * 2 * Math.PI) / 3
  const c = conv(x)
  return { y: CY + amp(x) * Math.sin(ph), z: Math.cos(ph) * (1 - c) + c * 0.5 }
}

// Solid colours blended toward the background stand in for depth, so overlapping caps never bead
const LEVELS = 32
const palettes = strands.map((s) => {
  const rgb = [1, 3, 5].map((i) => parseInt(s.color.slice(i, i + 2), 16))
  return Array.from({ length: LEVELS + 1 }, (_, i) => {
    const m = 0.3 + (0.7 * i) / LEVELS
    return `rgb(${rgb.map((v, j) => Math.round(BG[j] + (v - BG[j]) * m)).join(',')})`
  })
})

type Item = { z: number; draw: (ctx: CanvasRenderingContext2D) => void }

const STEP = 5
const PARTICLES = 3

export function TripleHelix() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const leaderRefs = useRef<(SVGLineElement | null)[]>([])
  const boxRefs = useRef<(SVGGElement | null)[]>([])
  const missionRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !canvas || !ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = motionQuery.matches
    let raf = 0
    let visible = false
    let started: number | null = null
    let last = 0
    let phase = 0
    let clock = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = wrap.clientWidth
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(((w * H) / W) * dpr)
      ctx.setTransform((w / W) * dpr, 0, 0, (w / W) * dpr, 0, 0)
    }

    const draw = (progress: number, withParticles: boolean) => {
      const xMax = X0 + (XEND - X0) * progress
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'

      // Rungs, like base pairs
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.5
      for (let x = X0 + 30; x < Math.min(560, xMax); x += 14) {
        const ys = [0, 1, 2].map((k) => point(x, k, phase).y)
        ctx.globalAlpha = 0.13 * fadeIn(x) * (1 - smooth(430, 560, x))
        ctx.beginPath()
        ctx.moveTo(x, Math.min(...ys))
        ctx.lineTo(x, Math.max(...ys))
        ctx.stroke()
      }

      // Soft glow under each strand
      strands.forEach((s, k) => {
        ctx.beginPath()
        for (let x = X0; x <= xMax; x += STEP) {
          const p = point(x, k, phase)
          if (x === X0) ctx.moveTo(x, p.y)
          else ctx.lineTo(x, p.y)
        }
        ctx.globalAlpha = 1
        ctx.strokeStyle = `rgba(${s.glow},0.08)`
        ctx.lineWidth = 30
        ctx.stroke()
        ctx.strokeStyle = `rgba(${s.glow},0.14)`
        ctx.lineWidth = 18
        ctx.stroke()
      })

      // Depth-sorted strands, nodes and particles
      const items: Item[] = []
      strands.forEach((_, k) => {
        for (let x = X0; x < xMax; x += STEP) {
          const x2 = Math.min(x + STEP, xMax)
          const a = point(x, k, phase)
          const b = point(x2, k, phase)
          const z = (a.z + b.z) / 2
          const depth = (z + 1) / 2
          const alpha = fadeIn(x)
          items.push({
            z,
            draw: (c) => {
              c.globalAlpha = alpha
              c.strokeStyle = palettes[k][Math.round(depth * LEVELS)]
              c.lineWidth = 4 + 8 * depth
              c.beginPath()
              c.moveTo(x, a.y)
              c.lineTo(x2, b.y)
              c.stroke()
            },
          })
        }
      })

      labels.forEach((l, i) => {
        const p = point(l.nodeX, l.k, phase)
        const depth = (p.z + 1) / 2
        const show = smooth(l.nodeX - 20, l.nodeX + 40, xMax)
        leaderRefs.current[i]?.setAttribute('y2', String(p.y + (l.box.y < CY ? -16 : 16)))
        const box = boxRefs.current[i]
        if (box) box.style.opacity = String(show)
        if (show <= 0) return
        items.push({
          z: p.z + 0.001,
          draw: (c) => {
            c.globalAlpha = show
            c.beginPath()
            c.arc(l.nodeX, p.y, 9 + 4 * depth, 0, Math.PI * 2)
            c.fillStyle = palettes[l.k][Math.round(depth * LEVELS)]
            c.fill()
            c.lineWidth = 3.5
            c.strokeStyle = `rgba(255,255,255,${0.35 + 0.65 * depth})`
            c.stroke()
          },
        })
      })

      if (withParticles) {
        const span = XEND - X0
        strands.forEach((s, k) => {
          for (let i = 0; i < PARTICLES; i++) {
            const x = X0 + ((clock * 70 + (i * span) / PARTICLES + k * 47) % span)
            if (x > xMax) continue
            const p = point(x, k, phase)
            const depth = (p.z + 1) / 2
            const life = smooth(X0, X0 + 60, x) * (1 - smooth(XEND - 40, XEND, x))
            items.push({
              z: p.z + 0.002,
              draw: (c) => {
                c.globalAlpha = life * (0.25 + 0.75 * depth)
                c.fillStyle = `rgba(${s.glow},0.35)`
                c.beginPath()
                c.arc(x, p.y, 7 + 3 * depth, 0, Math.PI * 2)
                c.fill()
                c.fillStyle = '#ffffff'
                c.beginPath()
                c.arc(x, p.y, 2 + 1.5 * depth, 0, Math.PI * 2)
                c.fill()
              },
            })
          }
        })
      }

      items.sort((a, b) => a.z - b.z)
      for (const it of items) it.draw(ctx)
      ctx.globalAlpha = 1

      if (missionRef.current) missionRef.current.style.opacity = String(smooth(0.82, 1, progress))
    }

    const frame = (now: number) => {
      if (started === null) {
        started = now
        last = now
      }
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      clock += dt
      phase += dt * ((2 * Math.PI) / 10) // one full turn every 10s
      const progress = smooth(0, 1, (now - started) / 1800)
      draw(progress, true)
      raf = visible ? requestAnimationFrame(frame) : 0
    }

    const start = () => {
      if (reduced) {
        phase = 0
        draw(1, false)
        return
      }
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
      },
      { threshold: 0.15 },
    )

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced || !raf) draw(reduced || started !== null ? 1 : 0, false)
    })

    const onMotionChange = () => {
      reduced = motionQuery.matches
      cancelAnimationFrame(raf)
      raf = 0
      started = reduced ? started : null
      if (visible) start()
    }

    resize()
    draw(reduced ? 1 : 0, false)
    ro.observe(wrap)
    io.observe(wrap)
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="The Ihifix Triple Helix: Consultancy (Ihifix Technologies), Education (Digital Academy and School) and Foundation (Innovation Foundation) intertwine and converge into one mission"
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#0a1f80_0%,#05145a_55%,#030c3d_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1.1px,transparent_1.2px)] bg-[length:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_50%,rgba(51,85,255,0.28),transparent_60%)]"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
        <text x={W - 32} y={44} textAnchor="end" fontSize={11.5} fontWeight={700} letterSpacing={2.4} fill="#fff" fillOpacity={0.55}>
          IHIFIX GROUP
        </text>

        <g ref={missionRef} className="transition-opacity duration-500">
          <circle cx={MX} cy={CY} r={70} fill="url(#helix-mission-glow)" />
          <circle className="helix-pulse" cx={MX} cy={CY} r={30} fill="none" stroke="#ff8a66" strokeWidth={2} />
          <circle className="helix-pulse helix-pulse-late" cx={MX} cy={CY} r={30} fill="none" stroke="#ff8a66" strokeWidth={2} />
          <circle cx={MX} cy={CY} r={38} fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={1.5} />
          <circle cx={MX} cy={CY} r={27} fill="#fff" />
          <circle cx={MX} cy={CY} r={27} fill="none" stroke="#e42c04" strokeWidth={4} />
          <circle cx={MX} cy={CY} r={7} fill="#e42c04" />
          <text x={MX} y={CY + 70} textAnchor="middle" fontSize={17} fontWeight={700} fill="#fff">
            One mission
          </text>
          <text x={MX} y={CY + 90} textAnchor="middle" fontSize={12} fill="#fff" fillOpacity={0.65}>
            Shared impact
          </text>
        </g>

        {labels.map((l, i) => {
          const s = strands[l.k]
          const above = l.box.y < CY
          return (
            <g key={s.name} ref={(el) => void (boxRefs.current[i] = el)} className="transition-opacity duration-500">
              <line
                ref={(el) => void (leaderRefs.current[i] = el)}
                x1={l.nodeX}
                x2={l.nodeX}
                y1={above ? l.box.y + BOX_H : l.box.y}
                y2={CY + (above ? -16 : 16)}
                stroke={s.color}
                strokeWidth={1.5}
                strokeDasharray="3 4"
              />
              <rect x={l.box.x} y={l.box.y} width={l.box.w} height={BOX_H} rx={18} fill="#0b1f78" fillOpacity={0.9} stroke={s.color} strokeOpacity={0.55} />
              <rect x={l.box.x + 16} y={l.box.y + 18} width={16} height={16} rx={5} fill={s.color} />
              <text x={l.box.x + 40} y={l.box.y + 31} fontSize={16} fontWeight={700} fill="#fff">
                {s.name}
              </text>
              {l.here && (
                <g>
                  <rect x={l.box.x + l.box.w - 104} y={l.box.y - 11} width={88} height={22} rx={11} fill="#e42c04" stroke="#05145a" strokeWidth={2} />
                  <text x={l.box.x + l.box.w - 60} y={l.box.y + 4} textAnchor="middle" fontSize={10.5} fontWeight={700} letterSpacing={0.4} fill="#fff">
                    YOU ARE HERE
                  </text>
                </g>
              )}
              <text x={l.box.x + 16} y={l.box.y + 58} fontSize={12.5} fontWeight={600} fill="#fff" fillOpacity={0.92}>
                {l.sub}
              </text>
              <text x={l.box.x + 16} y={l.box.y + 78} fontSize={12} fill="#fff" fillOpacity={0.62}>
                {l.note}
              </text>
            </g>
          )
        })}

        <text x={W - 32} y={H - 34} textAnchor="end" fontSize={12} fontWeight={600} letterSpacing={1.6} fill="#fff" fillOpacity={0.7}>
          TECHNOLOGY · TALENT · ACCESS
        </text>

        <defs>
          <radialGradient id="helix-mission-glow">
            <stop offset="0" stopColor="#ff6a3d" stopOpacity={0.55} />
            <stop offset="1" stopColor="#e42c04" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

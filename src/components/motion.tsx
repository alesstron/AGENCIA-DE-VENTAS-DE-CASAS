"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Tokens de movimiento. DESIGN.md no define animación, así que se derivan de su carácter
 * (museo, sobrio, sin sombras): un solo easing de desaceleración y duraciones de 0,6–0,9 s.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.3, base: 0.6, slow: 0.9, hero: 1.2 } as const;

/** Respeta prefers-reduced-motion en todos los componentes animados. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Aparición al hacer scroll: fade-up + scale-in (o volteo 3D con variant="flip"). */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: "up" | "flip";
  className?: string;
}) {
  const from =
    variant === "flip"
      ? { opacity: 0, y: 40, rotateX: -35, scale: 0.97, filter: "blur(8px)" }
      : { opacity: 0, y: 32, scale: 0.96 };
  return (
    <motion.div
      initial={from}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
      style={{ transformPerspective: 1000 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Inclinación 3D + brillo dinámico (glare) siguiendo el puntero. Solo con ratón; en táctil queda estático. */
export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const gx = useTransform(px, [0, 1], [0, 100]);
  const gy = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,237,215,0.2), transparent 55%)`;
  const [hover, setHover] = useState(false);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function leave() {
    px.set(0.5);
    py.set(0.5);
    setHover(false);
  }

  return (
    <div className="h-full w-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={leave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: DUR.fast }}
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-card"
        />
      </motion.div>
    </div>
  );
}

/** Contador que se anima al entrar en pantalla. */
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: EASE, onUpdate: setN });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

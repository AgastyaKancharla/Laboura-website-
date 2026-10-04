"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 * ─────────────────────────────────────────────────────────────── */

export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 32 */
  perspective?: number;
  /** Card width in world units. @default 17 */
  cardWidth?: number;
  /** Card height in world units. @default 24 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.6 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 44 */
  exitHeight?: number;
  /** Lateral offset at birth. Negative starts the card across the axis. @default -10 */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 45 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.2 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 24,
  cardWidth: 22,
  cardHeight: 31,
  cardRadius: 0.8,
  birthHeight: 2.2,
  exitHeight: 64,
  railBirth: -10,
  railExit: 56,
  fan: 3.0,
  turnBirth: 4,
  turnExit: 32,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(
  dir: 1 | -1,
  name: string,
  p: Required<CorridorPath>,
  vertical: boolean,
) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    // Vertical rails travel in cqh so cards always exit at the top/bottom edge,
    // while size and depth stay in cqw so cards always fit the width.
    const move = vertical
      ? `translate3d(0,${(dir * rail).toFixed(2)}cqh,${z.toFixed(2)}cqw) rotateX(${(dir * turn).toFixed(2)}deg)`
      : `translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)`;
    steps.push(`${(u * 100).toFixed(2)}%{transform:${move}}`);
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
  label?: string;
};

export type ImageStreamHeroProps = {
  /** Images cycled onto rails. If leftImages/rightImages are provided, they take precedence. */
  images?: StreamImage[];
  /** Distinct images dedicated to the left rail (preventing duplicate mirroring). */
  leftImages?: StreamImage[];
  /** Distinct images dedicated to the right rail (preventing duplicate mirroring). */
  rightImages?: StreamImage[];
  /** Cards on each rail at once. @default 9 */
  cards?: number;
  /** Seconds for one card to travel the whole corridor. @default 18 */
  speed?: number;
  /** Vertical placement of the corridor's axis, as percentage of height. @default 50 */
  axis?: number;
  /** Override corridor geometry. */
  path?: CorridorPath;
  /** "vertical" runs the rails up and down instead of left and right. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images = [],
  leftImages,
  rightImages,
  cards = 9,
  speed = 18,
  axis = 50,
  path,
  orientation = "horizontal",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);
  const vertical = orientation === "vertical";

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p, vertical)}${keyframes(-1, left, p, vertical)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p, vertical],
  );

  // Derive distinct left and right image lists so no image is mirrored or duplicated
  const resolvedLeftImages = React.useMemo(() => {
    if (leftImages && leftImages.length > 0) return leftImages;
    if (images.length >= 2) {
      // Split or offset: take odd indices
      return images.filter((_, idx) => idx % 2 === 1);
    }
    return images;
  }, [leftImages, images]);

  const resolvedRightImages = React.useMemo(() => {
    if (rightImages && rightImages.length > 0) return rightImages;
    if (images.length >= 2) {
      // Split or offset: take even indices
      return images.filter((_, idx) => idx % 2 === 0);
    }
    return images;
  }, [rightImages, images]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: vertical ? "size" : "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Render Right Rail */}
          {Array.from({ length: cards }, (_, i) => {
            const img = resolvedRightImages[i % Math.max(resolvedRightImages.length, 1)];
            return (
              <div
                key={`${right}-${i}`}
                className={cn(card, "absolute overflow-hidden group select-none")}
                style={{
                  left: "50%",
                  top: `${axis}%`,
                  width: `${p.cardWidth}cqw`,
                  height: `${p.cardHeight}cqw`,
                  marginLeft: `${-p.cardWidth / 2}cqw`,
                  marginTop: `${-p.cardHeight / 2}cqw`,
                  borderRadius: `${p.cardRadius}cqw`,
                  boxShadow: "0 16px 36px -4px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  animation: `${right} ${speed}s linear infinite`,
                  animationDelay: `${-(i * speed) / cards}s`,
                  backfaceVisibility: "hidden",
                }}
              >
                {img ? (
                  <div className="relative w-full h-full">
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    {img.label && (
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-bold text-white text-center tracking-wider uppercase border border-white/20 truncate shadow-sm">
                        {img.label}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Render Left Rail */}
          {Array.from({ length: cards }, (_, i) => {
            const img = resolvedLeftImages[i % Math.max(resolvedLeftImages.length, 1)];
            return (
              <div
                key={`${left}-${i}`}
                className={cn(card, "absolute overflow-hidden group select-none")}
                style={{
                  left: "50%",
                  top: `${axis}%`,
                  width: `${p.cardWidth}cqw`,
                  height: `${p.cardHeight}cqw`,
                  marginLeft: `${-p.cardWidth / 2}cqw`,
                  marginTop: `${-p.cardHeight / 2}cqw`,
                  borderRadius: `${p.cardRadius}cqw`,
                  boxShadow: "0 16px 36px -4px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  animation: `${left} ${speed}s linear infinite`,
                  animationDelay: `${-(i * speed) / cards}s`,
                  backfaceVisibility: "hidden",
                }}
              >
                {img ? (
                  <div className="relative w-full h-full">
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    {img.label && (
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-bold text-white text-center tracking-wider uppercase border border-white/20 truncate shadow-sm">
                        {img.label}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;

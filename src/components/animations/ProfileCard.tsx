import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  imageUrl?: string;
  name: string;
  role: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  contactText?: string;
  showUserInfo?: boolean;
}

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  role,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  contactText = "Contact",
  showUserInfo = true,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        } else {
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--background-x": "50%",
        "--background-y": "50%",
        "--pointer-from-center": "0",
        "--pointer-from-top": "0.5",
        "--pointer-from-left": "0.5",
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
      }) as React.CSSProperties,
    []
  );

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper flex justify-center items-center ${className}`.trim()}
      style={cardStyle}
    >
      <section
        ref={cardRef}
        className="pc-card relative w-80 h-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform-gpu transition-transform duration-500 ease-out"
        style={{
          transform: 'translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="pc-inside absolute inset-1 rounded-3xl bg-white dark:bg-gray-800"
        style={{ transform: 'translate3d(0, 0, 0.01px)' }}
        >
          <div className="pc-content pc-avatar-content absolute inset-0 flex flex-col items-center justify-end overflow-hidden"
           style={{ transform: 'translate3d(0, 0, 0.1px)' }}
          >
            <img
              className="avatar w-full h-auto object-cover rounded-full"
              src={imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%) scale(1)',
                bottom: '0',
              }}
            />
            {showUserInfo && (
              <div className="pc-user-info absolute bottom-5 left-5 right-5 p-3 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-between"
              style={{ zIndex: 2, pointerEvents: 'auto' }}
              >
                <div className="flex flex-col items-start">
                   <div className="pc-handle text-white font-bold text-lg">{name}</div>
                   <div className="flex items-center gap-3 mt-1">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-600 p-1 bg-gradient-to-r from-blue-400 to-purple-600 flex-shrink-0">
                         <img
                           src={imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"}
                           alt={`${name || "User"} mini avatar`}
                           className="w-full h-full object-cover rounded-full bg-gray-200 dark:bg-gray-700"
                           loading="lazy"
                         />
                       </div>
                      <div className="pc-status text-white text-sm">{role}</div>
                   </div>
                 </div>
                 <Link
                   to="/contact"
                   className="pc-contact-btn inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg ml-auto"
                   style={{ pointerEvents: "auto" }}
                 >
                   <Mail size={18} className="mr-1"/>
                   <span>{contactText}</span>
                 </Link>
              </div>
            )}
          </div>

          <div className="pc-content absolute inset-0 flex flex-col items-center justify-start pt-8"
          style={{ transform: 'translate3d(0, 0, 0.1px)', zIndex: 5, mixBlendMode: 'luminosity' as 'luminosity' }}
          >
            <div className="pc-details text-center">
              {/* Remove name and role from the large box */}
              {/* <h3 className="text-gray-900 dark:text-white font-bold text-3xl">{name}</h3> */}
              {/* <p className="text-gray-600 dark:text-gray-300 text-lg mt-1">{role}</p> */}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;

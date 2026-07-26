import { useEffect, useRef, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

const Home         = lazy(() => import("./pages/Home"));
const About        = lazy(() => import("./pages/About"));
const Projects     = lazy(() => import("./pages/Projects"));
const Skills       = lazy(() => import("./pages/Skills"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact      = lazy(() => import("./pages/Contact"));
const Experience   = lazy(() => import("./pages/Experience"));
const NotFound     = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/* ─── Detect touch/mobile device ───────────────────────────── */
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

/* ─── Custom Cursor (desktop only) ──────────────────────────── */
const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display  = 'block';
    ring.style.display = 'block';

    // Dynamic import GSAP — doesn't block initial render
    import('gsap').then(({ gsap }) => {
      const moveDot   = gsap.quickTo(dot,  "left", { duration: 0.05, ease: "none" });
      const moveDotY  = gsap.quickTo(dot,  "top",  { duration: 0.05, ease: "none" });
      const moveRing  = gsap.quickTo(ring, "left", { duration: 0.18, ease: "power2.out" });
      const moveRingY = gsap.quickTo(ring, "top",  { duration: 0.18, ease: "power2.out" });

      const onMove = (e: MouseEvent) => {
        moveDot(e.clientX); moveDotY(e.clientY);
        moveRing(e.clientX); moveRingY(e.clientY);
      };
      const onEnter = () => { dot.classList.add("hovering"); ring.classList.add("hovering"); };
      const onLeave = () => { dot.classList.remove("hovering"); ring.classList.remove("hovering"); };

      window.addEventListener("mousemove", onMove);
      const hoverEls = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      (dot as any).__cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        hoverEls.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    });
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ display: 'none' }} />
      <div ref={ringRef} className="cursor-ring" style={{ display: 'none' }} />
    </>
  );
};

/* ─── Routes with CSS fade transition ───────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    // key triggers remount + CSS animation on route change
    <div key={location.pathname} className="page-fade-in page-transition">
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/"             element={<Home />}         />
          <Route path="/about"        element={<About />}        />
          <Route path="/projects"     element={<Projects />}     />
          <Route path="/skills"       element={<Skills />}       />
          <Route path="/experience"   element={<Experience />}   />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact"      element={<Contact />}      />
          <Route path="*"             element={<NotFound />}     />
        </Routes>
      </Suspense>
    </div>
  );
};

/* ─── App Content ───────────────────────────────────────────── */
const AppContent = () => {
  useLenis();
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
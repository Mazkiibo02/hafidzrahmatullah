
import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import NotFound from "./pages/NotFound";
import { useLenis } from "./hooks/useLenis";

const queryClient = new QueryClient();

/* ─── Custom Cursor ─────────────────────────────────────────── */
const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDot = gsap.quickTo(dot, "left", { duration: 0.05, ease: "none" });
    const moveDotY = gsap.quickTo(dot, "top", { duration: 0.05, ease: "none" });
    const moveRing = gsap.quickTo(ring, "left", { duration: 0.18, ease: "power2.out" });
    const moveRingY = gsap.quickTo(ring, "top", { duration: 0.18, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    };

    const onEnter = () => {
      dot.classList.add("hovering");
      ring.classList.add("hovering");
    };
    const onLeave = () => {
      dot.classList.remove("hovering");
      ring.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMove);

    // Add hover effect to interactive elements
    const hoverEls = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

/* ─── Page transition variants ──────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } },
};

/* ─── Animated Routes ───────────────────────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="page-transition"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/projects"    element={<Projects />} />
          <Route path="/skills"      element={<Skills />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/experience"  element={<Experience />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
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

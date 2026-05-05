let gsapLoader: Promise<{ gsap: any; ScrollTrigger: any }> | null = null;

export const loadGsap = async () => {
  if (!gsapLoader) {
    gsapLoader = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap ?? gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;
        if (!gsap) {
          throw new Error('Failed to load GSAP');
        }
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }
        return { gsap, ScrollTrigger };
      }
    );
  }
  return gsapLoader;
};

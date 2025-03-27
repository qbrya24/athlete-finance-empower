
import { useEffect, useState } from 'react';

export function useAnimationOnScroll() {
  useEffect(() => {
    const fadeElems = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElems.forEach(elem => {
      observer.observe(elem);
    });
    
    return () => {
      fadeElems.forEach(elem => {
        observer.unobserve(elem);
      });
    };
  }, []);
}

export function useDelayedLoad(delay = 300) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isLoaded;
}

export const staggeredFadeIn = (index: number) => ({
  opacity: 0,
  y: 20,
  transition: {
    delay: 0.1 * index,
    duration: 0.5,
    ease: [0.645, 0.045, 0.355, 1.0],
  },
  animate: {
    opacity: 1,
    y: 0,
  },
});

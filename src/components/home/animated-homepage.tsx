"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AnimatedHomepage({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Animate all sections with data-animate attribute
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    // Stagger animate cards and grid items
    const grids = document.querySelectorAll("[data-stagger]");
    grids.forEach((grid) => {
      const items = grid.children;
      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    // Parallax on hero background
    const heroBg = document.querySelector("[data-parallax]");
    if (heroBg) {
      gsap.to(heroBg, {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: heroBg.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Animate counters
    const counters = document.querySelectorAll("[data-count]");
    counters.forEach((counter) => {
      const end = parseInt(counter.getAttribute("data-count") || "0");
      const suffix = counter.getAttribute("data-suffix") || "";
      const prefix = counter.getAttribute("data-prefix") || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => {
          gsap.to(obj, {
            val: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              (counter as HTMLElement).textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
            },
          });
        },
        once: true,
      });
    });

    // Gold dividers scale in
    const dividers = document.querySelectorAll("[data-divider]");
    dividers.forEach((div) => {
      gsap.set(div, { scaleX: 0 });
      ScrollTrigger.create({
        trigger: div,
        start: "top 90%",
        onEnter: () => {
          gsap.to(div, { scaleX: 1, duration: 0.8, ease: "power3.out" });
        },
        once: true,
      });
    });

    // Cultural background textures fade in on scroll
    const culturalBgs = document.querySelectorAll("[data-cultural-bg]");
    culturalBgs.forEach((bg) => {
      gsap.set(bg, { opacity: 0 });
      ScrollTrigger.create({
        trigger: bg.parentElement,
        start: "top 80%",
        onEnter: () => {
          gsap.to(bg, { opacity: parseFloat((bg as HTMLElement).dataset.culturalBg || "0.03"), duration: 1.5, ease: "power2.out" });
        },
        once: true,
      });
    });

    // Slow parallax for decorative cultural elements
    const slowParallax = document.querySelectorAll("[data-parallax-slow]");
    slowParallax.forEach((el) => {
      gsap.to(el, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return <>{children}</>;
}

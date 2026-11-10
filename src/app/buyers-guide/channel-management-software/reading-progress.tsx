"use client";
import { useEffect, useState } from "react";
import styles from "./guide.module.css";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article");
    const header = document.querySelector<HTMLElement>("header");
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = header?.getBoundingClientRect().height ?? 72;
      const offset = headerHeight + 36;
      const root = document.getElementById("guide-content");
      root?.style.setProperty("--guide-header-height", `${headerHeight}px`);
      if (article) {
        const rect = article.getBoundingClientRect();
        const start = rect.top + window.scrollY - offset;
        const end = rect.bottom + window.scrollY - window.innerHeight;
        setProgress(Math.round(100 * Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)))));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    if (article) observer.observe(article);
    if (header) observer.observe(header);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);
  return <div className={styles.readingProgress} role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}

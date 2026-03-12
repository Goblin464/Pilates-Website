import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef = null,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  stagger = 0.04,
  yOffset = 60,
  triggerStart = 'top 85%',
  triggerEnd = 'top 30%',
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : undefined;

    const wordElements = el.querySelectorAll('.word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        ...(scroller ? { scroller } : {}),
        start: triggerStart,
        end: triggerEnd,
        scrub: 1,
      },
    });

    tl.fromTo(
      wordElements,
      {
        opacity: baseOpacity,
        y: yOffset,
        scale: 0.8,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger,
        ease: 'back.out(2.5)',
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    blurStrength,
    stagger,
    yOffset,
    triggerStart,
    triggerEnd,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;

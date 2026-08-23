import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from './Button';
import RepelText from './RepelText';

const HomeLeft = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.hero-anim-item', {
        y: 40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        clearProps: 'filter',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="font-body relative z-10 flex w-full flex-1 flex-col justify-center px-6 pt-20 pb-6 sm:px-8 sm:py-16 text-(--paper) lg:w-1/2 lg:px-[6vw] lg:py-40"
    >
      <div className="mx-auto w-full max-w-lg text-center lg:mx-0 lg:text-left">
        <span className="hero-anim-item font-ui text-[11px] font-medium uppercase tracking-[0.35em] text-(--paper)/60 block">
          Frontend Developer
        </span>

        <h1 className="hero-anim-item font-name uppercase mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] xl:text-[2.8rem] whitespace-nowrap text-(--paper) tracking-[0.06em] leading-[1.15] cursor-default inline-block">
          <RepelText text="Pritam Singh" radius={80} force={30} />
        </h1>

        <p className="hero-anim-item mt-6 max-w-md text-[15px] sm:text-base leading-[1.75] text-(--paper)/75">
          I build responsive web applications using React, Next.js, and
          Tailwind CSS. Currently learning backend development and DSA while
          building projects that solve real-world problems.
        </p>

        <div className="hero-anim-item mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <Button
            text="Projects"
            onClick={() => {
              document.getElementById('project')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          />
          <Button
            text="Contact"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          />
        </div>
      </div>

      {/* Quiet scroll cue */}
      <div className="hero-anim-item mt-16 hidden items-center gap-3 lg:flex">
        <div className="h-10 w-px bg-(--paper)/30" />
        <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-(--paper)/50">
          Scroll
        </span>
      </div>
    </div>
  );
};

export default HomeLeft;
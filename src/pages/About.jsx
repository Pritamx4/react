import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutLeft from '../components/AboutLeft';
import AboutRight from '../components/AboutRight';
import RepelText from '../components/RepelText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.about-anim-header', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'filter',
      });

      gsap.from('.about-anim-panel', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          once: true,
        },
        y: 50,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'filter',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="about"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-(--ink) py-12 lg:py-16"
    >
      {/* Fine grain texture, matching Projects and Contact */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(244,241,234,0.035) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Heading */}
      <div className="about-anim-header relative z-10 flex flex-col items-center gap-3 pt-16 pb-10 lg:pt-20 lg:pb-12 text-center">
        <span className="font-ui text-[11px] font-medium uppercase tracking-[0.35em] text-(--paper)/60">
          Who&rsquo;s Behind This
        </span>
        <h1 className="font-[ZeroMaster] text-4xl sm:text-5xl lg:text-7xl text-(--paper) tracking-wide leading-none cursor-default">
          <RepelText text="About Me" radius={100} force={35} />
        </h1>
      </div>

      {/* Split panels */}
      <div className="about-anim-panel relative z-10 flex flex-1 flex-col lg:flex-row lg:items-center">
        <AboutLeft />
        <div className="hidden h-3/5 w-px self-center bg-(--paper)/10 lg:block" />
        <AboutRight />
      </div>
    </div>
  );
};

export default About;
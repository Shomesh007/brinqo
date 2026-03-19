/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Home, 
  Briefcase, 
  Zap, 
  User, 
  BarChart3, 
  LayoutGrid, 
  Users, 
  Sparkles,
  PenTool,
  Globe,
  Monitor,
  PencilRuler,
  Palette,
  Layout,
  Lightbulb,
  Brain,
  Rocket,
  Edit3,
  Star,
  ShieldCheck,
  Plus,
  ArrowRight
} from 'lucide-react';
import Projects from './components/Projects';
import { CardStack } from './components/ui/card-stack';
import MobileHero from './components/MobileHero';

// --- Custom Icons (Replicating the hand-drawn style from the design) ---

const UIUXIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform -rotate-6">
    {/* Stylized Hand */}
    <path d="M20 55C20 55 25 60 35 60C45 60 65 50 65 35C65 20 55 10 45 10C35 10 20 20 20 35C20 42 22 48 20 55Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Pencil/Ruler */}
    <rect x="25" y="35" width="40" height="12" transform="rotate(-45 25 35)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 30L45 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 42L18 50L26 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Detail lines */}
    <path d="M55 55C55 55 60 60 70 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GraphicDesignIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Swatch Book / Fan */}
    <path d="M15 15H40V55H15V15Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 15V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 15V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    
    <path d="M40 22H65V62H40V22Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-3 origin-left"/>
    <path d="M48 22V62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-3 origin-left"/>
    <path d="M56 22V62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-3 origin-left"/>
    
    <path d="M15 35H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 42H65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-3 origin-left"/>
  </svg>
);

const WebDesignIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Browser Window */}
    <rect x="12" y="18" width="56" height="44" rx="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 30H68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Dots */}
    <circle cx="20" cy="24" r="2" fill="currentColor"/>
    <circle cx="28" cy="24" r="2" fill="currentColor"/>
    <circle cx="36" cy="24" r="2" fill="currentColor"/>
    {/* Content lines */}
    <path d="M20 40H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 48H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Cursor */}
    <path d="M55 55L65 65M65 65L60 65M65 65L65 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M55 55L50 45L60 50L55 55Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
  </svg>
);

const MotionGraphicsIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Lightbulb */}
    <path d="M40 15C30 15 22 23 22 33C22 41 27 46 32 49V57H48V49C53 46 58 41 58 33C58 23 50 15 40 15Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35 67H45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M37 62H43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Motion lines */}
    <path d="M60 20L68 28M68 20L60 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Detail */}
    <path d="M22 62C22 62 17 67 27 67" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="22" cy="62" r="2.5" stroke="currentColor" strokeWidth="3"/>
  </svg>
);

const AnimatedStep: React.FC<{ className: string; zIndexClass: string; children: React.ReactNode }> = ({ className, zIndexClass, children }) => {
  // Disabled useScroll to prevent Motion.js warning
  // const ref = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start 112px", "end start"]
  // });
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  // const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div className={`relative h-[90vh] md:h-auto w-full ${className} ${zIndexClass}`}>
      <motion.div 
        className="relative sticky top-28 md:static w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
};

const DesktopHero: React.FC = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoReady || videoEnded || !videoRef.current) {
      return;
    }

    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch {
        // Keep first frame visible if autoplay is blocked.
      }
    };

    void playVideo();
  }, [videoReady, videoEnded]);

  return (
    <section className="hidden md:block pt-20 px-6 bg-[#f3e2bf]">
      <div className="desktop-hero-stage max-w-[1440px] mx-auto">
        <img
          src="/hero_first.jpeg"
          alt="Brinqo hero opening"
          className={`desktop-hero-layer ${!videoReady ? 'is-visible' : ''}`}
        />

        <video
          ref={videoRef}
          src="/brinqoooherooo.mp4"
          className={`desktop-hero-layer desktop-hero-video ${videoReady && !videoEnded ? 'is-visible' : ''}`}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onEnded={() => setVideoEnded(true)}
        />

        <img
          src="/hero_final.png"
          alt="Brinqo hero closing"
          className={`desktop-hero-layer desktop-hero-final ${videoEnded ? 'is-visible' : ''}`}
        />
      </div>
    </section>
  );
};
const PROCESS_CARDS = [
  {
    id: 0,
    name: "STEP ONE",
    designation: "Project idea",
    content: (
      <p>Every great work begins with a single, disruptive thought. We help you isolate the core essence of your vision.</p>
    ),
  },
  {
    id: 1,
    name: "INNOVATION",
    designation: "Brainstorming",
    content: (
      <p>We strip away the noise. Through rigorous collaborative sessions, we stress-test the concept against modern brutalist standards.</p>
    ),
  },
  {
    id: 2,
    name: "DEVELOPMENT",
    designation: "Design & Build",
    content: (
      <p>Our craftsmen translate the abstract into the concrete. Thick lines, bold grids, and technical precision define this stage.</p>
    ),
  },
  {
    id: 3,
    name: "CURATION",
    designation: "Launch",
    content: (
      <p>The final curation. We unveil your manuscript to the world with a presence that cannot be ignored.</p>
    ),
  },
];

const WorkingProcess = () => (
  <section className="bg-brinqo-cream font-body selection:bg-brinqo-red/20 selection:text-brinqo-red">
    {/* Process Header Section */}
    <section className="px-8 pb-8 max-w-[1440px] mx-auto pt-12">
      <div className="max-w-4xl">
        <span className="font-headline text-xs font-black uppercase tracking-[0.3em] text-brinqo-red mb-4 block">The Blueprint</span>
        <h1 className="font-bricolage text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-brinqo-secondary-dark">
          Crafting The <br/><span className="italic text-brinqo-red">Unconventional.</span>
        </h1>
        <p className="font-arimo text-xl md:text-2xl text-brinqo-charcoal max-w-2xl leading-relaxed">
          Our workflow is a curated journey from the spark of an idea to a fully realized digital manuscript. We don't just build; we compose.
        </p>
      </div>
    </section>

    {/* Dynamic Process Grid */}
    <section className="px-4 md:px-8 py-12 max-w-[1440px] mx-auto bg-brinqo-warm-cream">
      
      {/* Mobile Automated Stack Representation */}
      <div className="block md:hidden pb-12">
        <CardStack items={PROCESS_CARDS} />
      </div>

      <div className="hidden md:grid md:grid-cols-12 md:gap-8 items-start relative pb-0">
        {/* Step 01: Project Idea */}
        <AnimatedStep className="md:col-span-5" zIndexClass="z-10">
          <div className="absolute -top-6 left-4 z-10 bg-brinqo-secondary-dark text-brinqo-cream px-4 py-1 font-black text-xs tracking-tighter transform -rotate-2 uppercase">STEP ONE</div>
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">01/</span>
              <Lightbulb className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-syne text-3xl font-bold text-brinqo-secondary-dark mb-4">Project idea</h3>
            <p className="font-arimo text-brinqo-secondary-dark text-lg leading-snug mb-6">Every great work begins with a single, disruptive thought. We help you isolate the core essence of your vision.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20 flex gap-4">
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Discovery</span>
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Vision</span>
            </div>
          </div>
        </AnimatedStep>

        {/* Spacer for Asymmetry */}
        <div className="hidden md:block md:col-span-1"></div>

        {/* Step 02: Brainstorming */}
        <AnimatedStep className="md:col-span-6 md:mt-24" zIndexClass="z-20">
          <div className="absolute -right-4 -top-4 z-10 bg-brinqo-soft-cream border-2 border-brinqo-secondary-dark px-4 py-1 font-black text-xs tracking-tighter transform rotate-3 uppercase">INNOVATION</div>
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:translate-x-2 group-hover:-rotate-1">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">02/</span>
              <Brain className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-syne text-3xl font-bold text-brinqo-secondary-dark mb-4">Brainstorming</h3>
            <p className="font-arimo text-brinqo-secondary-dark text-lg leading-snug mb-6">We strip away the noise. Through rigorous collaborative sessions, we stress-test the concept against modern brutalist standards.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20 flex gap-4">
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Strategy</span>
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Debate</span>
            </div>
          </div>
        </AnimatedStep>

        {/* Step 03: Design & Build */}
        <AnimatedStep className="md:col-span-7 md:-mt-12" zIndexClass="z-30">
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-10 rounded-lg editorial-shadow transition-all duration-500 group-hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-16">
              <span className="font-headline text-7xl font-black text-brinqo-secondary-dark opacity-30">03/</span>
              <PencilRuler className="text-brinqo-secondary-dark" size={48} />
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h3 className="font-syne text-4xl font-bold text-brinqo-secondary-dark mb-6 leading-none">Design & Build</h3>
                <p className="font-arimo text-brinqo-secondary-dark text-xl leading-relaxed max-w-md">Our craftsmen translate the abstract into the concrete. Thick lines, bold grids, and technical precision define this stage.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brinqo-secondary-dark/60">Development Stack</span>
                <div className="flex flex-wrap gap-2">
                  <span className="p-2 border border-brinqo-secondary-dark bg-brinqo-soft-cream"><Monitor size={16} /></span>
                  <span className="p-2 border border-brinqo-secondary-dark bg-brinqo-soft-cream"><Palette size={16} /></span>
                  <span className="p-2 border border-brinqo-secondary-dark bg-brinqo-soft-cream"><Layout size={16} /></span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedStep>

        {/* Step 04: Launch */}
        <AnimatedStep className="md:col-span-5 md:mt-12" zIndexClass="z-40">
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:translate-y-4">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">04/</span>
              <Rocket className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-syne text-3xl font-bold text-brinqo-secondary-dark mb-4">Launch</h3>
            <p className="font-arimo text-brinqo-secondary-dark text-lg leading-snug mb-6">The final curation. We unveil your manuscript to the world with a presence that cannot be ignored.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20">
              <button className="w-full bg-brinqo-secondary-dark text-brinqo-cream py-4 font-bold uppercase tracking-widest text-xs hover:bg-brinqo-red transition-all">Publish Live</button>
            </div>
          </div>
        </AnimatedStep>
      </div>
    </section>
  </section>
);




const Testimonials: React.FC = () => {
  return (
    <section className="min-h-screen relative overflow-hidden px-6 lg:px-12 py-12 lg:py-12 bg-brinqo-warm-cream border-t border-brinqo-secondary-dark/10">
      <main className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-4 relative z-50">
          <header className="max-w-md">
            <span className="font-body text-brinqo-red uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Archive_04 // Voices</span>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-brinqo-secondary-dark mb-8 italic">
              The Curator’s <br/> Perspective.
            </h2>
            <p className="font-arimo text-lg text-brinqo-secondary-dark leading-relaxed opacity-80">
              Strategic narratives from the visionaries we've partnered with. A collection of unfiltered dialogues on craft and impact.
            </p>
          </header>
          {/* Annotations for the left side */}
          <div className="mt-20 hidden lg:block">
            <div className="font-body text-[10px] text-brinqo-secondary-dark/40 tracking-[0.5em] vertical-text -rotate-180 inline-block mb-4">AUTHENTICITY_PROTOCOL_v.24</div>
          </div>
        </div>

        {/* Right Column: Staggered Stack Canvas */}
        <div className="lg:col-span-8 relative h-[800px] md:h-[900px] w-full">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 font-headline text-[15rem] text-brinqo-secondary-dark/5 select-none pointer-events-none">VOX</div>
          <div className="absolute bottom-0 right-0 font-headline text-[15rem] text-brinqo-red/5 select-none pointer-events-none italic leading-none">PROOF</div>

          {/* Testimonial 01: Marcus Vane (Black Card) */}
          <motion.div 
            initial={{ opacity: 0, rotate: -5, y: 40 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-[5%] left-[0%] md:left-[5%] w-full max-w-sm bg-brinqo-secondary-dark p-8 editorial-shadow editorial-shadow-hover transition-all duration-500 z-10 group cursor-pointer border-2 border-brinqo-secondary-dark"
          >
            <div className="absolute -top-10 -left-2 font-headline text-[8rem] text-brinqo-cream opacity-10 select-none pointer-events-none">“</div>
            <div className="flex flex-col gap-6">
              <span className="font-body text-[10px] text-brinqo-soft-cream tracking-widest border-l-2 border-brinqo-red pl-3 uppercase">Client_Voice_01 // Verified</span>
              <p className="font-baskerville italic text-xl text-brinqo-cream leading-snug">
                "The Modernist team doesn't just design; they curate an identity. Our digital footprint went from a whisper to an authoritative roar."
              </p>
              <div>
                <h4 className="font-body font-bold text-brinqo-cream text-md">Marcus Vane</h4>
                <p className="font-body text-brinqo-soft-cream text-[10px] uppercase tracking-widest">CEO of Nexus Dynamics</p>
              </div>
            </div>
            <div className="absolute -bottom-4 right-2 font-body text-[9px] text-brinqo-secondary-dark bg-brinqo-cream px-2 py-1 border border-brinqo-secondary-dark rotate-3">TIMESTAMP_2024.08.12</div>
          </motion.div>

          {/* Testimonial 02: Sarah Cheng (Rouge Card) */}
          <motion.div 
            initial={{ opacity: 0, rotate: 5, y: 40 }}
            whileInView={{ opacity: 1, rotate: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-[25%] left-[20%] md:left-[35%] w-full max-w-md bg-brinqo-red p-10 editorial-shadow editorial-shadow-hover transition-all duration-500 z-30 group cursor-pointer border-2 border-brinqo-secondary-dark"
          >
            <div className="absolute -bottom-12 -right-2 font-headline text-[12rem] text-brinqo-secondary-dark opacity-10 select-none pointer-events-none">”</div>
            <div className="flex flex-col gap-6">
              <span className="font-body text-[10px] text-brinqo-secondary-dark tracking-widest border-l-2 border-brinqo-secondary-dark pl-3 uppercase">Client_Voice_02 // Archive_Record</span>
              <p className="font-baskerville italic text-2xl text-brinqo-secondary-dark leading-tight font-bold">
                "Rarely do you find an agency that understands the tension between minimalism and impact. Brinqo is that rare exception."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  alt="Sarah Cheng" 
                  className="w-14 h-14 object-cover grayscale border-2 border-brinqo-secondary-dark shadow-[4px_4px_0px_0px_rgba(28,28,24,1)]" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-body font-bold text-brinqo-secondary-dark text-lg leading-none">Sarah Cheng</h4>
                  <p className="font-body text-brinqo-secondary-dark text-[10px] uppercase tracking-widest opacity-80 mt-1">Creative Lead at Neo-Space</p>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 font-body text-[10px] text-brinqo-cream bg-brinqo-secondary-dark px-3 py-1 -rotate-90 border border-brinqo-cream">VERIFIED_ENTRY_882</div>
          </motion.div>

          {/* Testimonial 03: David Thorne (White Card) */}
          <motion.div 
            initial={{ opacity: 0, rotate: -3, y: 40 }}
            whileInView={{ opacity: 1, rotate: -1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-[20%] left-[5%] md:left-[10%] w-full max-w-sm bg-brinqo-warm-cream p-8 border-2 border-brinqo-secondary-dark editorial-shadow editorial-shadow-hover transition-all duration-500 z-40 group cursor-pointer"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-brinqo-red text-brinqo-red" />
                ))}
              </div>
              <p className="font-baskerville italic text-md text-brinqo-secondary-dark leading-relaxed">
                "The process was as meticulous as the final output. Every detail was debated, every line had a purpose. True craftsmanship."
              </p>
              <div className="mt-2">
                <h4 className="font-headline font-bold text-brinqo-secondary-dark text-base">David Thorne</h4>
                <p className="font-body text-brinqo-secondary-dark/70 text-[9px] uppercase tracking-widest">Founder of Thorne & Co.</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 font-body text-[9px] text-brinqo-secondary-dark bg-brinqo-warm-cream px-2 py-1 border border-brinqo-secondary-dark uppercase font-bold">Record_003</div>
          </motion.div>

          {/* Testimonial 04: Elena Rossi (Black Card - Small) */}
          <motion.div 
            initial={{ opacity: 0, rotate: 5, y: 40 }}
            whileInView={{ opacity: 1, rotate: 3, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-[25%] right-[5%] md:right-[15%] w-full max-w-[280px] bg-brinqo-secondary-dark p-6 editorial-shadow editorial-shadow-hover transition-all duration-500 z-20 group cursor-pointer border-2 border-brinqo-secondary-dark"
          >
            <div className="flex flex-col gap-4">
              <p className="font-baskerville italic text-base text-brinqo-cream opacity-90 leading-snug">
                "An unparalleled eye for editorial aesthetics in a digital-first world."
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-body font-bold text-brinqo-cream text-sm">Elena Rossi</h4>
                  <p className="font-body text-brinqo-soft-cream text-[8px] uppercase tracking-widest">Art Director, VOGUE-IT</p>
                </div>
                <ShieldCheck className="text-brinqo-red" size={20} />
              </div>
            </div>
          </motion.div>

          {/* Global Branding Tag */}
          <div className="absolute bottom-[-20px] right-0 font-body text-[10px] text-brinqo-secondary-dark/40 tracking-[0.5em] uppercase">BRINQO_DESIGN_AGENCY_2024</div>
        </div>
      </main>
    </section>
  );
};

const CuratedQuery = () => {
  return (
    <section className="relative py-12 md:py-16 px-8 md:px-24 overflow-hidden bg-brinqo-cream border-t border-brinqo-secondary-dark/10">
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-12">
        <h2 className="font-bricolage text-6xl md:text-[6.5rem] lg:text-[7.5rem] leading-[0.9] tracking-tighter uppercase font-black text-brinqo-secondary-dark">
          The Curated <br/>
          <span className="text-[#b80e2d] italic">Query.</span>
        </h2>
        
        <div className="max-w-xs w-full group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-4 mb-2 md:mb-4">
          <p className="font-syne text-xl leading-tight uppercase tracking-widest font-extrabold group-hover:text-[#b80e2d] transition-colors duration-300">
            Beyond the pixel: What drives the Brinqo design philosophy?
          </p>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-arimo text-sm leading-relaxed tracking-tighter opacity-70">
              We navigate the intersections of strategy and aesthetic excellence through architectural tension.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Question 1 */}
        <div className="col-span-12 md:col-span-7 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-6 mb-8">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">01 / PROCESS</span>
          <h3 className="font-space text-4xl md:text-5xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            How does Brinqo define a "Manuscript" approach to digital brand identity?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-arimo text-xl leading-relaxed max-w-2xl bg-[#f6f3ec] p-8 border-l-4 border-[#b80e2d]">
              We treat pixels like ink on heavy stock. It’s about the intentionality of the stroke, the weight of the white space, and the architectural tension that guides a user through a narrative rather than just a interface.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-6 mb-8 self-start">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">02 / TIMELINE</span>
          <h3 className="font-space text-3xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            What is the duration of an editorial sprint?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-arimo text-lg leading-relaxed bg-brinqo-secondary-dark text-brinqo-cream p-6">
              Typically six to eight weeks of deep immersion. We don't just "design"; we curate your brand's future archive.
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden md:block col-span-3 h-56 border-4 border-brinqo-secondary-dark relative">
          <div className="absolute inset-0 bg-[#b80e2d] opacity-10"></div>
          <div className="absolute -bottom-4 -right-4 bg-brinqo-secondary-dark text-brinqo-cream px-4 py-2 font-black text-xl">QUERY</div>
        </div>

        {/* Question 3 */}
        <div className="col-span-12 md:col-span-6 md:col-start-5 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-6 mb-8">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">03 / COLLABORATION</span>
          <h3 className="font-space text-3xl md:text-4xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            Can we maintain our existing assets during a rebrand?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-arimo text-xl leading-relaxed max-w-xl">
              We believe in the power of the archive. If your legacy elements have soul, we refine and amplify them within the modernist framework. Evolution over erasure.
            </p>
          </div>
        </div>

        {/* Question 4 */}
        <div className="col-span-12 md:col-span-4 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-6">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">04 / OUTPUT</span>
          <h3 className="font-space text-3xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            What deliverables should we expect?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-arimo text-lg leading-relaxed bg-[#e5e2db] p-6 border-2 border-brinqo-secondary-dark">
              A full design system, editorial brand guidelines, and high-fidelity prototypes that function as living documents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Components ---

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-[1296px] mx-auto px-6">
        {/* Footer Top */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 pb-16 border-b border-[#333]">
          {/* Left Column - Contact Info */}
          <div className="lg:w-6/12 relative text-[#FDFDE1] pr-0 lg:pr-10">
            <h2 className="font-syne text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.04em] mb-6">
              Let's start <span className="whitespace-nowrap">a
                <span className="inline-flex items-center justify-center ml-2 md:ml-4 align-middle translate-y-[-5px]">
                  <svg width="64" height="64" viewBox="0 0 100 100" className="text-[#E73250] w-12 h-12 md:w-[70px] md:h-[70px]">
                    <path d="M10 50h80M25 20l50 60M25 80l50-60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <br />
              project together
            </h2>
            <p className="font-arimo text-[1.1rem] leading-[1.6] mb-10 max-w-[480px]">
              We work closely with our clients to understand their objectives, target audience, and unique needs. We use our creative skills to translate these requirements and practical design solutions.
            </p>

            <div className="flex flex-col gap-6 md:gap-8 mb-16">
              <div>
                <span className="font-syne text-lg md:text-xl font-medium text-[#E73250] block mb-1">Give us a call:</span>
                <a href="tel:(508)446-2526" className="font-syne text-lg md:text-xl font-medium text-[#FDFDE1] hover:text-[#E73250] transition-colors">(508) 446-2526</a>
              </div>
              <div>
                <span className="font-syne text-lg md:text-xl font-medium text-[#E73250] block mb-1">Send us an email:</span>
                <a href="mailto:mail@brinqo.com" className="font-syne text-lg md:text-xl font-medium text-[#FDFDE1] hover:text-[#E73250] transition-colors">mail@brinqo.com</a>
              </div>
            </div>

            {/* Social Icons & Arrow */}
            <div className="relative flex gap-4 w-full md:w-[450px]">
              {/* Arrow SVG pointing to icons */}
              <div className="absolute left-[180px] md:left-[220px] bottom-[-10px] md:bottom-[0px] w-[140px] md:w-[180px] hidden sm:block pointer-events-none text-[#E73250]">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
                  <path d="M90 10 C 90 40, 70 80, 50 80 C 30 80, 20 60, 40 50 C 60 40, 80 70, 50 90 C 30 100, 10 90, 5 85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M15 75 L 5 85 L 18 95" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-transparent border border-[#FDFDE1] rounded-full text-[#FDFDE1] hover:bg-[#FDFDE1] hover:text-[#0A0A0A] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-transparent border border-[#FDFDE1] rounded-full text-[#FDFDE1] hover:bg-[#FDFDE1] hover:text-[#0A0A0A] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-transparent border border-[#FDFDE1] rounded-full text-[#FDFDE1] hover:bg-[#FDFDE1] hover:text-[#0A0A0A] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:w-6/12 flex w-full lg:justify-end">
            <div className="w-full max-w-[550px] bg-transparent pt-8 md:pt-4">
              <h4 className="font-syne text-[2rem] font-bold text-[#FDFDE1] mb-8 tracking-tight">Send us a message</h4>
              <form className="flex flex-col gap-6 w-full">
                <input type="text" placeholder="Your name" required className="w-full px-6 py-4 bg-transparent border border-[#FDFDE1]/40 rounded-full font-arimo text-base text-[#FDFDE1] placeholder-white/80 outline-none focus:border-[#FDFDE1] transition-all" />
                <input type="email" placeholder="Your email address" required className="w-full px-6 py-4 bg-transparent border border-[#FDFDE1]/40 rounded-full font-arimo text-base text-[#FDFDE1] placeholder-white/80 outline-none focus:border-[#FDFDE1] transition-all" />
                <input type="tel" placeholder="(508) 446-2526" className="w-full px-6 py-4 bg-transparent border border-[#FDFDE1]/40 rounded-full font-arimo text-base text-[#FDFDE1] placeholder-white/80 outline-none focus:border-[#FDFDE1] transition-all" />
                <textarea placeholder="Write your message here..." className="w-full px-6 py-4 bg-transparent border border-[#FDFDE1]/40 rounded-3xl font-arimo text-base text-[#FDFDE1] placeholder-white/80 outline-none focus:border-[#FDFDE1] transition-all min-h-[140px] resize-y"></textarea>
                
                {/* Fixed Red Drop Shadow Submit Pill with Circular Icon */}
                <button type="button" className="group w-full mt-4 bg-[#E73250] text-[#0A0A0A] rounded-full font-syne text-lg font-bold transition-all duration-300 flex items-center justify-between p-2 pl-8 shadow-[3px_4px_0_#FDFDE1] hover:shadow-[5px_6px_0_#FDFDE1] hover:-translate-y-1">
                  <span>Send message</span>
                  <div className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-[#FDFDE1] group-hover:scale-[1.05] transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="font-syne font-extrabold text-[#FDFDE1] tracking-[0.08em] text-xl md:text-2xl">
            BRINQO
          </a>
          <p className="font-arimo text-sm text-[#999] m-0 text-center md:text-right">
            &copy; Copyright 2025, All Rights Reserved by brinqo
          </p>
        </div>
      </div>
    </footer>
  );
};

const Header = () => (
  <header className="fixed top-0 w-full z-[99] bg-[#131313] py-4 transition-all duration-400 ease-in-out">
    <div className="w-full max-w-none md:max-w-[1296px] mx-auto px-4 md:px-6 h-full flex flex-row flex-nowrap items-center justify-between">
      
      {/* Brand Logo */}
      <div className="mr-4 md:mr-8 relative transition-all duration-400 ease-in-out shrink-0">
        <a href="/" className="font-bricolage font-extrabold text-[#FDFDE1] tracking-[0.08em] text-base md:text-lg leading-none">
          BRINQO
        </a>
      </div>

      {/* Navigation Menu (Desktop) */}
      <div className="hidden lg:flex flex-grow items-center">
        <ul className="flex items-center m-0 p-0 list-none gap-2">
          <li><a href="#brand-audit" className="block py-2 px-5 text-[#FDFDE1] hover:text-[#E73250] font-space text-[1.02rem] font-semibold tracking-tight transition-colors duration-400">Brand Audit</a></li>
        </ul>
      </div>

      {/* Header CTA Button (Desktop) */}
      <div className="hidden lg:flex items-center ml-auto">
        <a 
          href="#brand-audit" 
          className="inline-block py-3 px-8 bg-[#E73250] text-[#131313] rounded-full font-familjen text-base font-bold tracking-tight transition-all duration-300 shadow-[3px_4px_0_#FDFDE1] hover:-translate-y-1 hover:shadow-[4px_6px_0_#FDFDE1]"
        >
          Start Brand Audit
        </a>
      </div>

      {/* Mobile menu trigger */}
      <div className="flex lg:hidden flex-col cursor-pointer z-[100] gap-1.5 p-2">
        <span className="w-6 h-[3px] bg-[#FDFDE1] transition-all duration-300 block relative"></span>
        <span className="w-6 h-[3px] bg-[#FDFDE1] transition-all duration-300 block relative"></span>
        <span className="w-6 h-[3px] bg-[#FDFDE1] transition-all duration-300 block relative"></span>
      </div>

    </div>
  </header>
);

interface ServiceIconBoxProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  desc: string;
  delay: number;
  accent?: boolean;
}

const ServiceIconBox: React.FC<ServiceIconBoxProps & { id: string }> = ({ icon, title, desc, delay, accent = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative h-full"
    >
      <div className={`relative p-8 lg:p-10 rounded-[1.75rem] border-2 border-brinqo-secondary-dark transition-all duration-500 h-full min-h-[300px] flex flex-col cursor-pointer group ${accent ? 'bg-[#ece2d8]' : 'bg-[#f5f2ea]'} hover:bg-brinqo-red hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(231,50,80,0.22)]`}>
        <div className="mb-6 w-14 h-14 lg:w-16 lg:h-16 text-brinqo-secondary-dark transition-all duration-500 group-hover:scale-105 group-hover:text-brinqo-cream origin-left">
          {icon}
        </div>

        <div className="flex-grow max-w-[90%]">
          <h3 className="font-space font-bold text-3xl lg:text-[2.8rem] tracking-[-0.04em] mb-4 text-brinqo-secondary-dark leading-[1] transition-colors duration-500 group-hover:text-brinqo-cream">
            {title}
          </h3>
          <p className="font-arimo text-brinqo-secondary-dark/85 text-lg lg:text-[1.75rem] leading-[1.4] mb-8 transition-colors duration-500 group-hover:text-brinqo-cream/90">
            {desc}
          </p>
        </div>

        <div className="mt-auto text-brinqo-secondary-dark transition-all duration-500 group-hover:text-brinqo-cream group-hover:translate-x-1">
          <ArrowRight size={40} strokeWidth={2.2} />
        </div>
      </div>
    </motion.div>
  );
};

function HomePage() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const panels = document.querySelectorAll('.service-panel');
      if (!panels.length) return;

      const viewportAnchor = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Infinity;

      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const panelCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(panelCenter - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveServiceIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const services = [
    { 
      id: '01', 
      title: 'UI/UX Design', 
      desc: 'Focusing on intuitive interface systems that enhance usability, accessibility, and conversion-ready product journeys.',
      icon: <UIUXIcon />
    },
    { 
      id: '02', 
      title: 'Graphic Design', 
      icon: <GraphicDesignIcon /> ,
      desc: 'Creating visual elements such as logos, branding materials, brochures, and collateral with clear editorial impact.' 
    },
    { 
      id: '03', 
      title: 'Web Design', 
      icon: <WebDesignIcon />,
      desc: 'Designing high-performance web experiences that balance modern interaction patterns with strong brand storytelling.' 
    },
    { 
      id: '04', 
      title: 'Motion Graphics', 
      icon: <MotionGraphicsIcon />,
      desc: 'Creating animated visuals and motion systems that guide attention, explain ideas, and elevate campaign performance.' 
    },
  ];

  return (
    <div className="relative min-h-screen bg-brinqo-cream font-body selection:bg-brinqo-red selection:text-brinqo-light-text">
      <Header />
      
      <main className="relative">
        {/* Mobile Hero Section */}
        <section className="md:hidden pt-16">
          <MobileHero />
        </section>

        {/* Desktop Hero Section */}
        <DesktopHero />

        {/* Services Section */}
        <section id="brand-audit" className="pt-12 md:pt-16 pb-8 md:pb-10 px-6 md:px-10 lg:px-12 w-full max-w-none mx-auto scroll-mt-28">
          {/* Desktop Title Header (Restored) */}
          <div className="hidden md:block mb-8 md:mb-10 text-center">
            <h2 className="font-bricolage font-extrabold text-[3rem] tracking-tight text-black leading-[1.05] md:text-[5.4rem] md:leading-[1.02]">
              We provide effective <br className="hidden md:block"/>
              <span className="Brinqo-title-animation relative inline-block">
                design solutions
                <span className="Brinqo-title-icon inline-block ml-3 md:ml-4 translate-y-[-4px] md:translate-y-[-10px] transform">
                  <Star size={36} className="text-brinqo-red md:w-14 md:h-14" strokeWidth={2.6} />
                </span>
              </span>
            </h2>
          </div>

          {/* Mobile Title Header (New) */}
          <div className="block md:hidden mb-12 text-left px-0">
             <h2 className="font-syne font-bold text-[2.8rem] tracking-tight text-black leading-[1.1]">
              We provide effective <br />
              <span className="text-brinqo-red">design solutions</span>
            </h2>
          </div>

          {/* Desktop Grid */}
          <div className="relative hidden md:grid grid-cols-2 gap-5 lg:gap-6 mb-8 w-full">
            {services.map((s, idx) => (
              <ServiceIconBox 
                key={s.id} 
                id={s.id}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                delay={idx * 0.1}
                accent={idx === 1}
              />
            ))}
          </div>

          {/* Mobile Modern Scrolling Accordion (Ported from mobile-services.html) */}
          <div className="md:hidden brinqo-services-modern -mx-6">
            {services.map((s, idx) => (
              <div 
                key={s.id} 
                className={`service-panel transition-all duration-700 ${activeServiceIndex === idx ? 'is-active is-entering' : ''}`}
              >
                <div className="service-inner">
                  <div className="service-meta">
                    <span>{s.id}</span>
                    <span className="service-dot"></span>
                  </div>
                  <h2 className="service-title">{s.title}</h2>
                  <p className="service-copy">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Projects />

        <WorkingProcess />
        <Testimonials />
        <CuratedQuery />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return <HomePage />;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Menu, 
  Search, 
  Home, 
  Briefcase, 
  Zap, 
  User, 
  ArrowRight, 
  ArrowDown, 
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
  Plus
} from 'lucide-react';

import Projects from './components/Projects';

// --- Custom Icons (Replicating the hand-drawn style from the design) ---

const UIUXIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-6">
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
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const WorkingProcess = () => (
  <section className="bg-brinqo-cream font-body selection:bg-brinqo-red/20 selection:text-brinqo-red">
    {/* Process Header Section */}
    <section className="px-8 pb-12 max-w-[1440px] mx-auto pt-32">
      <div className="max-w-4xl">
        <span className="font-headline text-xs font-black uppercase tracking-[0.3em] text-brinqo-red mb-4 block">The Blueprint</span>
        <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-brinqo-secondary-dark">
          Crafting The <br/><span className="italic text-brinqo-red">Unconventional.</span>
        </h1>
        <p className="font-body text-xl md:text-2xl text-brinqo-charcoal max-w-2xl leading-relaxed">
          Our workflow is a curated journey from the spark of an idea to a fully realized digital manuscript. We don't just build; we compose.
        </p>
      </div>
    </section>

    {/* Dynamic Process Grid */}
    <section className="px-8 py-12 max-w-[1440px] mx-auto bg-brinqo-warm-cream overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Step 01: Project Idea */}
        <div className="md:col-span-5 group relative">
          <div className="absolute -top-6 left-4 z-10 bg-brinqo-secondary-dark text-brinqo-cream px-4 py-1 font-black text-xs tracking-tighter transform -rotate-2 uppercase">STEP ONE</div>
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">01/</span>
              <Lightbulb className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-headline text-3xl font-bold text-brinqo-secondary-dark mb-4">Project idea</h3>
            <p className="text-brinqo-secondary-dark text-lg leading-snug mb-6">Every great work begins with a single, disruptive thought. We help you isolate the core essence of your vision.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20 flex gap-4">
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Discovery</span>
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Vision</span>
            </div>
          </div>
        </div>

        {/* Spacer for Asymmetry */}
        <div className="hidden md:block md:col-span-1"></div>

        {/* Step 02: Brainstorming */}
        <div className="md:col-span-6 group relative md:mt-24">
          <div className="absolute -right-4 -top-4 z-10 bg-brinqo-soft-cream border-2 border-brinqo-secondary-dark px-4 py-1 font-black text-xs tracking-tighter transform rotate-3 uppercase">INNOVATION</div>
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:translate-x-2 group-hover:-rotate-1">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">02/</span>
              <Brain className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-headline text-3xl font-bold text-brinqo-secondary-dark mb-4">Brainstorming</h3>
            <p className="text-brinqo-secondary-dark text-lg leading-snug mb-6">We strip away the noise. Through rigorous collaborative sessions, we stress-test the concept against modern brutalist standards.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20 flex gap-4">
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Strategy</span>
              <span className="px-3 py-1 rounded-full bg-brinqo-soft-cream border border-brinqo-secondary-dark text-[10px] font-bold uppercase">Debate</span>
            </div>
          </div>
        </div>

        {/* Step 03: Design & Build */}
        <div className="md:col-span-7 group relative md:-mt-12">
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-10 rounded-lg editorial-shadow transition-all duration-500 group-hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-16">
              <span className="font-headline text-7xl font-black text-brinqo-secondary-dark opacity-30">03/</span>
              <PencilRuler className="text-brinqo-secondary-dark" size={48} />
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h3 className="font-headline text-4xl font-bold text-brinqo-secondary-dark mb-6 leading-none">Design & Build</h3>
                <p className="text-brinqo-secondary-dark text-xl leading-relaxed max-w-md">Our craftsmen translate the abstract into the concrete. Thick lines, bold grids, and technical precision define this stage.</p>
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
        </div>

        {/* Step 04: Launch */}
        <div className="md:col-span-5 group relative md:mt-12">
          <div className="bg-brinqo-red border-[3px] border-brinqo-secondary-dark p-8 rounded-lg editorial-shadow transition-all duration-500 group-hover:translate-y-4">
            <div className="flex justify-between items-start mb-12">
              <span className="font-headline text-5xl font-black text-brinqo-secondary-dark">04/</span>
              <Rocket className="text-brinqo-secondary-dark" size={40} />
            </div>
            <h3 className="font-headline text-3xl font-bold text-brinqo-secondary-dark mb-4">Launch</h3>
            <p className="text-brinqo-secondary-dark text-lg leading-snug mb-6">The final curation. We unveil your manuscript to the world with a presence that cannot be ignored.</p>
            <div className="pt-6 border-t border-brinqo-secondary-dark/20">
              <button className="w-full bg-brinqo-secondary-dark text-brinqo-cream py-4 font-bold uppercase tracking-widest text-xs hover:bg-brinqo-red transition-all">Publish Live</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
);




const Testimonials: React.FC = () => {
  return (
    <section className="min-h-screen relative overflow-hidden px-6 lg:px-12 py-12 lg:py-24 bg-brinqo-warm-cream border-t border-brinqo-secondary-dark/10">
      <main className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-4 relative z-50">
          <header className="max-w-md">
            <span className="font-body text-brinqo-red uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Archive_04 // Voices</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-brinqo-secondary-dark mb-8 italic">
              The Curator’s <br/> Perspective.
            </h2>
            <p className="font-body text-lg text-brinqo-secondary-dark leading-relaxed opacity-80">
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
              <p className="font-headline text-xl text-brinqo-cream leading-snug">
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
              <p className="font-headline text-2xl text-brinqo-secondary-dark leading-tight font-bold">
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
              <p className="font-body text-md text-brinqo-secondary-dark leading-relaxed">
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
              <p className="font-headline italic text-base text-brinqo-cream opacity-90 leading-snug">
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
    <section className="relative min-h-screen py-32 px-8 md:px-24 overflow-hidden bg-brinqo-cream border-t border-brinqo-secondary-dark/10">
      {/* Header */}
      <div className="mb-24 flex flex-col md:flex-row justify-between items-baseline gap-8">
        <h2 className="font-headline text-7xl md:text-[9rem] leading-none tracking-tighter uppercase font-black text-brinqo-secondary-dark">
          The<br/>Curated<br/><span className="text-[#b80e2d] italic">Query</span>
        </h2>
        
        <div className="max-w-xs group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-4">
          <p className="font-body text-xl leading-tight uppercase tracking-widest font-extrabold group-hover:text-[#b80e2d] transition-colors duration-300">
            Beyond the pixel: What drives the Brinqo design philosophy?
          </p>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-body text-sm leading-relaxed uppercase tracking-tighter opacity-70">
              We navigate the intersections of strategy and aesthetic excellence through architectural tension.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Question 1 */}
        <div className="col-span-12 md:col-span-7 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-8 mb-12">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">01 / PROCESS</span>
          <h3 className="font-headline text-4xl md:text-6xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            How does Brinqo define a "Manuscript" approach to digital brand identity?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-body text-xl leading-relaxed max-w-2xl bg-[#f6f3ec] p-8 border-l-4 border-[#b80e2d]">
              We treat pixels like ink on heavy stock. It’s about the intentionality of the stroke, the weight of the white space, and the architectural tension that guides a user through a narrative rather than just a interface.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-8 mb-12 self-start">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">02 / TIMELINE</span>
          <h3 className="font-headline text-3xl md:text-4xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            What is the duration of an editorial sprint?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-body text-lg leading-relaxed bg-brinqo-secondary-dark text-brinqo-cream p-6">
              Typically six to eight weeks of deep immersion. We don't just "design"; we curate your brand's future archive.
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden md:block col-span-3 h-64 border-4 border-brinqo-secondary-dark relative">
          <div className="absolute inset-0 bg-[#b80e2d] opacity-10"></div>
          <div className="absolute -bottom-4 -right-4 bg-brinqo-secondary-dark text-brinqo-cream px-4 py-2 font-black text-2xl">QUERY</div>
        </div>

        {/* Question 3 */}
        <div className="col-span-12 md:col-span-6 md:col-start-5 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-8 mb-12">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">03 / COLLABORATION</span>
          <h3 className="font-headline text-4xl md:text-5xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            Can we maintain our existing assets during a rebrand?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-body text-xl leading-relaxed max-w-xl">
              We believe in the power of the archive. If your legacy elements have soul, we refine and amplify them within the modernist framework. Evolution over erasure.
            </p>
          </div>
        </div>

        {/* Question 4 */}
        <div className="col-span-12 md:col-span-4 group cursor-pointer border-t-2 border-brinqo-secondary-dark pt-8">
          <span className="font-body text-sm mb-4 block font-bold text-[#b80e2d] tracking-widest">04 / OUTPUT</span>
          <h3 className="font-headline text-3xl md:text-4xl group-hover:text-[#b80e2d] transition-colors duration-300 leading-tight font-bold">
            What deliverables should we expect?
          </h3>
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-6">
            <p className="font-body text-lg leading-relaxed bg-[#e5e2db] p-6 border-2 border-brinqo-secondary-dark">
              A full design system, editorial brand guidelines, and high-fidelity prototypes that function as living documents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Components ---

const Header = () => (
  <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-brinqo-warm-cream/80 backdrop-blur-md text-brinqo-secondary-dark border-b border-brinqo-secondary-dark/5">
    <div className="flex items-center gap-6">
      <Menu className="text-brinqo-red cursor-pointer hover:scale-110 transition-transform" size={24} />
      <div className="flex flex-col">
        <h1 className="font-headline font-black text-2xl tracking-[-0.04em] uppercase leading-none">
          BRINQO
        </h1>
        <span className="font-body text-[8px] uppercase tracking-[0.4em] text-brinqo-red font-bold">Design_Manuscript_v.24</span>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="hidden md:flex items-center gap-4">
        <span className="font-body text-[10px] uppercase tracking-widest font-bold opacity-40">Status //</span>
        <span className="font-body text-[10px] uppercase tracking-widest font-bold text-brinqo-red animate-pulse">Accepting_Projects</span>
      </div>
      <Search className="text-brinqo-red cursor-pointer hover:scale-110 transition-transform" size={24} />
    </div>
  </header>
);

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-stretch h-20 bg-brinqo-dark border-t border-brinqo-light-text/5">
      <button className="flex flex-col items-center justify-center py-3 w-full text-brinqo-red">
        <Briefcase size={20} className="mb-1" />
        <span className="font-headline text-[0.65rem] font-bold uppercase tracking-[0.1em]">PROJECTS</span>
      </button>
      <button className="flex flex-col items-center justify-center text-brinqo-muted-text py-3 w-full">
        <Users size={20} className="mb-1" />
        <span className="font-headline text-[0.65rem] font-bold uppercase tracking-[0.1em]">NETWORK</span>
      </button>
      <button className="flex flex-col items-center justify-center text-brinqo-muted-text py-3 w-full">
        <Sparkles size={20} className="mb-1" />
        <span className="font-headline text-[0.65rem] font-bold uppercase tracking-[0.1em]">STUDIO</span>
      </button>
    </nav>
  );
};

interface ServiceIconBoxProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  desc: string;
  delay: number;
}

const ServiceIconBox: React.FC<ServiceIconBoxProps & { id: string }> = ({ icon, title, desc, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative h-full"
    >
      {/* Main Card */}
      <div className="relative bg-white p-12 rounded-[2.5rem] border border-black transition-all duration-500 hover:bg-[#e73250] hover:shadow-[0_20px_50px_rgba(231,50,80,0.15)] h-full flex flex-col cursor-pointer group">
        <div className="mb-12 text-black group-hover:text-white transition-all duration-500 group-hover:scale-110 origin-left">
          {icon}
        </div>

        <div className="flex-grow">
          <h3 className="font-body font-bold text-4xl md:text-5xl tracking-tight mb-8 text-black group-hover:text-white leading-none transition-colors duration-500">
            {title}
          </h3>
          <p className="font-body text-black/70 text-lg md:text-xl leading-relaxed mb-12 max-w-[90%] group-hover:text-white/90 transition-colors duration-500">
            {desc}
          </p>
        </div>

        <div className="mt-auto">
          <div className="w-16 h-16 flex items-center justify-center transition-all duration-500 group-hover:translate-x-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black group-hover:text-white transition-colors duration-500">
              <path d="M8 24H40M40 24L30 14M40 24L30 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ServiceItemProps {
  id: string;
  title: string;
  desc?: string;
  subtitle?: string;
  isActive: boolean;
  onInView: (id: string) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ id, title, desc, subtitle, isActive, onInView }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Monitor scroll to detect when this item is closest to center
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      
      // If the element's center is within a certain threshold of the viewport center
      // we consider it "active" for the sake of the parent's state
      if (Math.abs(elementCenter - viewportCenter) < rect.height / 2) {
        onInView(id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, onInView]);

  return (
    <motion.div 
      ref={ref}
      animate={{ 
        backgroundColor: isActive ? "#e73250" : "transparent",
        color: isActive ? "#fcf9f2" : "#1c1c18"
      }}
      transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      className={`px-6 py-[90px] border-b border-brinqo-secondary-dark/10 relative overflow-hidden min-h-[60vh] flex flex-col justify-center ${isActive ? 'is-active' : ''}`}
    >
      {/* Sweep Gradient Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isActive ? "200%" : "-100%" }}
        transition={{ 
          duration: 1.05, 
          ease: [0.65, 0, 0.35, 1],
          repeat: isActive ? Infinity : 0,
          repeatDelay: 2
        }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Glow Radiance Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.4 : 0 }}
        transition={{ duration: 0.9 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/20 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-headline font-bold text-lg opacity-70">{id}</span>
            <motion.div 
              animate={{ 
                boxShadow: isActive ? "0 0 20px 5px rgba(255,255,255,0.4)" : "none",
                scale: isActive ? 1.2 : 1
              }}
              className="w-2.5 h-2.5 rounded-full bg-current transition-all duration-500"
            ></motion.div>
          </div>
          
          <div className="flex flex-col">
            {subtitle && (
              <motion.span 
                animate={{ opacity: isActive ? 1 : 0.4 }}
                className="font-body text-[10px] uppercase tracking-[0.3em] mb-2 block font-bold"
              >
                {subtitle}
              </motion.span>
            )}
            <motion.h3 
              animate={{ 
                scale: isActive ? 1.05 : 1,
                x: isActive ? 10 : 0
              }}
              transition={{ duration: 0.65 }}
              className="font-headline font-black text-7xl tracking-tighter leading-none mb-8"
            >
              {title}
            </motion.h3>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isActive ? "auto" : 0,
                opacity: isActive ? 0.96 : 0,
                y: isActive ? 0 : 18,
                clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)"
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="overflow-hidden"
            >
              <p className="font-body text-brinqo-cream text-xl leading-relaxed max-w-[400px]">
                {desc}
              </p>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          animate={{ 
            rotate: isActive ? 90 : 0, 
            color: isActive ? "#1c1c18" : "#1c1c18",
            scale: isActive ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mt-2"
        >
          {isActive ? <ArrowDown size={28} /> : <ArrowRight size={28} />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeServiceId, setActiveServiceId] = useState<string>('01');

  const handleServiceInView = useCallback((id: string) => {
    setActiveServiceId(id);
  }, []);

  const services = [
    { 
      id: '01', 
      title: 'UI/UX Design', 
      icon: <UIUXIcon />,
      desc: 'Focusing on user interface (UI) and user experience (UX) design enhance the usability and accessibility of digital products & app.' 
    },
    { 
      id: '02', 
      title: 'Graphic Design', 
      icon: <GraphicDesignIcon />,
      desc: 'Creating visual elements such as logos, branding materials, page layout techniques, brochures, & other marketing collateral.' 
    },
    { 
      id: '03', 
      title: 'Web Design', 
      icon: <WebDesignIcon />,
      desc: 'Building digital artifacts optimized for speed and functional elegance. Our websites are high-performance engines designed to convert.' 
    },
    { 
      id: '04', 
      title: 'Motion Graphics', 
      icon: <MotionGraphicsIcon />,
      desc: 'Animating abstract concepts into visual sequences. We breathe life into brand narratives through kinetic storytelling that captivates.' 
    },
  ];

  return (
    <div className="min-h-screen bg-brinqo-cream font-body selection:bg-brinqo-red selection:text-brinqo-light-text">
      <Header />
      
      <main className="relative">
        {/* Services Section */}
        <section className="pt-48 pb-32 px-6 w-full mx-auto">
          <div className="mb-32 text-center">
            <h2 className="font-body font-bold text-6xl md:text-8xl tracking-tight text-black leading-tight">
              We provide effective <br /> design solutions <span className="text-brinqo-red inline-block transform translate-y-4 md:translate-y-6">
                <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-20 md:h-20">
                  <path d="M40 10V70M14 25L66 55M14 55L66 25" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-12 mb-32">
            {services.map((s, idx) => (
              <ServiceIconBox 
                key={s.id} 
                id={s.id}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                delay={idx * 0.1}
              />
            ))}
          </div>

          <div className="md:hidden flex flex-col -mx-6 mb-24">
            {services.map((s) => (
              <ServiceItem 
                key={s.id} 
                id={s.id}
                title={s.title}
                desc={s.desc}
                isActive={activeServiceId === s.id}
                onInView={handleServiceInView}
              />
            ))}
          </div>
        </section>

        <Projects />

        <WorkingProcess />
        <Testimonials />
        <CuratedQuery />
      </main>

      <BottomNav />
    </div>
  );
}

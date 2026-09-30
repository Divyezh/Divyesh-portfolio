'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Sparkles, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLinks } from '@/constants';

export default function FlowingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about-me');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['about-me', 'skills', 'radar', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Header matching the VYRO inspiration aesthetic */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-4 sm:px-8 md:px-12 flex items-center justify-between h-16 md:h-20 ${
          isScrolled
            ? 'bg-[#050508]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Logo (Left — matching the VYRO minimalist emblem + typography) */}
        <a
          href="#about-me"
          className="flex items-center gap-2.5 shrink-0 group select-none"
        >
          {/* Minimalist Geometric Monogram */}
          <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center group-hover:border-indigo-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300"
            >
              <path
                d="M4 6L11 12L4 18M20 6L13 12L20 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-[0.2em] text-white uppercase font-sans">
              DIVYESH
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation: Sleek Floating Pill Capsule */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          {NavLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-black text-white font-semibold border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Socials: Pill Button Design */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* GitHub Pill Icon - hidden on smallest mobile screens to prevent header wrapping */}
          <a
            href="https://github.com/Divyezh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>

          {/* LinkedIn Pill Icon - hidden on smallest mobile screens to prevent header wrapping */}
          <a
            href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>

          {/* Resume Download Pill Button */}
          <a
            href="/Divyesh.pdf"
            download="Divyesh_Soni_Resume.pdf"
            target="_blank"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 bg-white/[0.04] border border-white/15 hover:bg-white/[0.1] hover:text-white hover:border-white/30 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </a>

          {/* Primary Pill Action CTA Button */}
          <a
            href="#contact"
            className="hidden xs:inline-flex sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold text-white bg-black/90 hover:bg-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:text-black transition-colors" />
            <span>Connect</span>
          </a>

          {/* Mobile Hamburger Pill */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.05] text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-4 h-4 text-indigo-400" /> : <Menu className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Matching the deep velvet dark + pill aesthetics) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#050508]/98 backdrop-blur-2xl md:hidden pt-20 px-6 flex flex-col justify-between pb-10 overflow-y-auto"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('a')) setIsOpen(false);
          }}
        >
          <div className="flex flex-col gap-2.5 mt-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono px-3 mb-2">
              NAVIGATION
            </span>
            {NavLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white border border-white/20 shadow-md font-bold'
                      : 'bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-indigo-400" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10 mt-6">
            {/* Social pills row in mobile menu */}
            <div className="flex items-center gap-2 mb-1">
              <a
                href="https://github.com/Divyezh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white/[0.04] border border-white/15 text-slate-200 text-xs font-medium"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white/[0.04] border border-white/15 text-slate-200 text-xs font-medium"
              >
                <FaLinkedin className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <a
              href="/Divyesh.pdf"
              download="Divyesh_Soni_Resume.pdf"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white/[0.05] border border-white/15 text-white text-xs font-semibold hover:bg-white/[0.1] transition-all"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-black text-white border border-white/25 text-xs font-bold shadow-lg"
            >
              <Send className="w-3.5 h-3.5 text-indigo-400" />
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
}

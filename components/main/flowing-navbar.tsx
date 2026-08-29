'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLinks } from '@/constants';

export default function FlowingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about-me');

  useEffect(() => {
    const handleScroll = () => {
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0e070c]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 md:px-8 h-14 flex items-center justify-between">

        {/* Brand Logo */}
        <a
          href="#about-me"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-bold text-white tracking-wider">
            DIVYESH<span className="text-purple-400">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation Links — center */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full glass-card border border-white/10">
          {NavLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* GitHub — always visible */}
          <a
            href="https://github.com/Divyezh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-3.5 h-3.5" />
          </a>

          {/* LinkedIn — always visible */}
          <a
            href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-3.5 h-3.5" />
          </a>

          {/* Resume — hidden on mobile */}
          <a
            href="/Divyesh.pdf"
            download="Divyesh_Soni_Resume.pdf"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all"
          >
            <Download className="w-3 h-3 text-purple-400" />
            Resume
          </a>

          {/* Connect CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 shadow-[0_0_12px_rgba(230,98,119,0.35)] transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Connect</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-3.5 h-3.5 text-purple-400" /> : <Menu className="w-3.5 h-3.5 text-purple-400" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0e070c]/95 backdrop-blur-xl md:hidden pt-16 px-5 flex flex-col justify-between pb-10"
          onClick={(e) => { if ((e.target as HTMLElement).tagName === 'A') setIsOpen(false); }}
        >
          <div className="flex flex-col gap-2 mt-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono px-2 mb-2">Navigation</div>
            {NavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl glass-card text-base font-medium text-white hover:border-purple-500/40 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <a
              href="/Divyesh.pdf"
              download="Divyesh_Soni_Resume.pdf"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-medium"
            >
              <Download className="w-4 h-4 text-purple-400" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}

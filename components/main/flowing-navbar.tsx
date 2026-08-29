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
      // Check active section
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
      {/* Floating Glass Navbar Container */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a
          href="#about-me"
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm md:text-base font-bold text-white tracking-wider flex items-center">
            DIVYESH<span className="text-purple-400">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full glass-card border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {NavLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/Divyezh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full glass-card border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full glass-card border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>

          <a
            href="/Divyesh.pdf"
            download="Divyesh_Soni_Resume.pdf"
            target="_blank"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            Resume
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 shadow-[0_0_15px_rgba(230,98,119,0.35)] transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Connect</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass-card border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4 text-purple-400" /> : <Menu className="w-4 h-4 text-purple-400" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0e070c]/90 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 transition-all duration-300 animate-fadeIn"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === 'A') {
              setIsOpen(false);
            }
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-wider text-gray-500 font-mono px-3">Navigation</div>
            {NavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-4 py-3 rounded-2xl glass-card text-lg font-medium text-white hover:border-purple-500/40 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <a
              href="/Divyesh.pdf"
              download="Divyesh_Soni_Resume.pdf"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-medium"
            >
              <Download className="w-4 h-4 text-purple-400" />
              Download Resume
            </a>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href="https://github.com/Divyezh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card text-gray-300 hover:text-white"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card text-gray-300 hover:text-white"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


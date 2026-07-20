'use client'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"
import { NavLinks, Socials } from "@/constants"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-6 py-3 transition-all duration-500 rounded-full w-[95%] max-w-[1200px] ${
          isScrolled 
            ? "bg-[#060611]/70 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] shadow-purple-500/10" 
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* LEFT — LOGO */}
        <a href="#about-me" className="flex items-center gap-2 group">
          <span className="cursive text-4xl font-bold text-white transition-all duration-300 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] group-hover:scale-105">
            Divyesh
          </span>
        </a>

        {/* CENTER — NAV LINKS (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {NavLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium rounded-full hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT — SOCIALS (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {Socials.map(social => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="relative group p-2 rounded-full hover:bg-white/5 transition-all">
              <Image 
                src={social.src} 
                alt={social.name} 
                width={20} 
                height={20}
                className="opacity-70 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-opacity pointer-events-none" />
            </a>
          ))}
          <a href="https://github.com/Divyezh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            <Image src="/assets/github-icon.svg" alt="GitHub" width={16} height={16} />
            <span>GitHub</span>
          </a>
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(true)} className="text-gray-300 hover:text-white transition-colors p-2">
            <HiOutlineMenuAlt3 size={24} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[200] bg-[#060611]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <AiOutlineClose size={28} />
            </button>
            
            {NavLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-bold tracking-tight text-white hover:text-purple-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center gap-8 mt-12">
              {Socials.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                  <Image 
                    src={social.src} 
                    alt={social.name} 
                    width={28} 
                    height={28}
                    className="opacity-70 hover:opacity-100 transition-opacity" 
                  />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

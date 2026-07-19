'use client'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"
import { NavLinks, Socials } from "@/constants"
import { slideInFromTop } from "@/lib/motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        variants={slideInFromTop}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#030014]/85 backdrop-blur-md border-b border-purple-core/10 shadow-lg shadow-[#030014]/50" 
            : "bg-transparent border-transparent"
        }`}
      >
        {/* LEFT — LOGO */}
        <a href="#about-me" className="flex items-center gap-2">
          <span className="cursive text-3xl font-bold text-white hover:text-purple-light transition-colors duration-300 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
            Divyesh
          </span>
        </a>

        {/* CENTER — NAV LINKS (desktop) */}
        <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full border border-white/10 bg-[#0d0025]/50 backdrop-blur-sm">
          {NavLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-300 hover:text-purple-mid transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT — SOCIALS (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {Socials.map(social => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
              <Image 
                src={social.src} 
                alt={social.name} 
                width={24} 
                height={24}
                className="opacity-60 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-200" 
              />
            </a>
          ))}
          <a href="https://github.com/Divyezh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ml-2 text-xs font-semibold text-gray-400 hover:text-purple-mid transition-colors">
            <Image src="/assets/github-icon.svg" alt="GitHub" width={20} height={20} />
            <span>GitHub</span>
          </a>
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(true)} className="text-gray-300 hover:text-purple-mid transition-colors">
            <HiOutlineMenuAlt3 size={28} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#030014]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-purple-mid transition-colors"
            >
              <AiOutlineClose size={32} />
            </button>
            
            {NavLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="Welcome-text text-3xl font-bold tracking-wider"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center gap-6 mt-8">
              {Socials.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                  <Image 
                    src={social.src} 
                    alt={social.name} 
                    width={32} 
                    height={32}
                    className="opacity-80 hover:opacity-100 transition-opacity" 
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



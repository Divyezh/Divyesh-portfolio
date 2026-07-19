import Link from "next/link"
import Image from "next/image"
import { Socials } from "@/constants"

const FooterLinks = {
  Community: [
    { name: "GitHub",   href: "https://github.com/Divyezh" },
    { name: "LinkedIn", href: "https://linkedin.com/in/divyyesh-60a5bb2a6" },
  ],
  Social: [
    { name: "GitHub",   href: "https://github.com/Divyezh" },
    { name: "LinkedIn", href: "https://linkedin.com/in/divyyesh-60a5bb2a6" },
  ],
  About: [
    { name: "Contact Me",   href: "mailto:sonidivyesh2004@gmail.com" },
    { name: "Source Code",  href: "https://github.com/Divyezh" },
    { name: "Silver Oak University", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 pt-16 pb-8 px-6 bg-[#030014]/50 backdrop-blur-sm z-20">
      {/* AMBER TOP GLOW LINE */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
        {Object.entries(FooterLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-[0.15em]">
              {category}
            </h3>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link.name}>
                  <Link href={link.href} target="_blank"
                    className="text-gray-400 text-sm hover:text-purple-mid hover:translate-x-1 inline-block transition-all duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SOCIALS ROW */}
      <div className="flex justify-center gap-6 mb-8">
        {Socials.map(social => (
          <Link key={social.name} href={social.href} target="_blank"
            className="w-10 h-10 rounded-full border border-white/10 hover:border-purple-core/40
                       flex items-center justify-center transition-all duration-200 hover:scale-110
                       hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] bg-white/5">
            <Image src={social.src} alt={social.name} width={18} height={18}
              className="opacity-60 hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-gray-500 text-xs mt-4">
        &copy; Divyesh Soni 2026 &middot; Ahmedabad, India &middot; Built with Next.js 14 &amp; Three.js
      </p>
    </footer>
  )
}



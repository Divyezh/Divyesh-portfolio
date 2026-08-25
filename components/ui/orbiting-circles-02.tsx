"use client";

import React from "react";
import Image from "next/image";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 20,
    icons: [
      { src: "/assets/react-svgrepo-com.svg", alt: "React.js", angle: -60 },
      { src: "/assets/next-js-svgrepo-com.svg", alt: "Next.js", angle: 0 },
      { src: "/assets/typescript-svgrepo-com.svg", alt: "TypeScript", angle: 60 },
    ],
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 26,
    icons: [
      { src: "/assets/framer-black-icon.svg", alt: "Framer Motion", angle: -90 },
      { src: "/assets/node-js-icon.svg", alt: "Node.js", angle: 0 },
      { src: "/assets/tailwind-css-svgrepo-com.svg", alt: "Tailwind CSS", angle: 90 },
    ],
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 32,
    icons: [
      { src: "/assets/mongodb-icon.svg", alt: "MongoDB", angle: -60 },
      { src: "/assets/javascript-programming-language-icon.svg", alt: "JavaScript", angle: 0 },
      { src: "/assets/html-icon.svg", alt: "HTML5", angle: 60 },
      { src: "/assets/css-icon.svg", alt: "CSS3", angle: 120 },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative w-full h-110 md:h-160 overflow-hidden flex justify-center">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="p-2.5 sm:p-3 rounded-full bg-[#0c0d16]/90 border border-white/15 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.25)] -mt-8 relative z-10 flex items-center justify-center hover:border-purple-500/50 hover:scale-110 transition-transform"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={iconData.src}
                    alt={iconData.alt}
                    width={32}
                    height={32}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight text-white mb-2 font-mono">404</h1>
      <p className="text-slate-400 text-sm mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-xs font-semibold tracking-wide transition-all shadow-md"
      >
        Return Home
      </Link>
    </div>
  )
}

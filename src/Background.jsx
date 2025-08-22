// src/Background.jsx
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base tone: dark blue-green (not pitch black) */}
      <div className="absolute inset-0 bg-[#0b1d26]" />

      {/* Layered neon radial washes: emerald + cyan + blue */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_1100px_at_20%_-10%,rgba(16,185,129,0.22),transparent_65%),radial-gradient(900px_900px_at_85%_10%,rgba(34,211,238,0.20),transparent_65%),radial-gradient(900px_900px_at_50%_100%,rgba(59,130,246,0.18),transparent_65%)]" />

      {/* Subtle grid, masked to center so edges don’t look busy */}
      <div
        className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to_bottom,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Soft scanning beam for that dev/terminal feel */}
      <div className="absolute -inset-x-10 top-32 h-40 bg-[linear-gradient(90deg,transparent,rgba(20,184,166,.28),rgba(34,211,238,.28),transparent)] blur-2xl animate-scan" />

      {/* Floating blur blobs in teal/cyan */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-400/18 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-cyan-400/18 blur-3xl animate-float-slower" />
    </div>
  );
}

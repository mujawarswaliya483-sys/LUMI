function Lumi() {
  return (
    <div className="relative z-10 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">

      {/* Outer aura */}
      <div className="absolute h-64 w-64 animate-[pulseSoft_4s_ease-in-out_infinite] rounded-full bg-[#d9c5e8]/30 blur-2xl sm:h-72 sm:w-72" />

      {/* Floating halo */}
      <div className="absolute -top-5 h-14 w-24 rounded-full border border-[#bda5cb]/40 blur-[1px] animate-[halo_5s_ease-in-out_infinite]" />

      {/* Lumi body */}
      <div className="relative flex h-44 w-40 items-center justify-center rounded-[48%_52%_45%_55%] bg-gradient-to-br from-[#f9f4fc] via-[#e8d9ef] to-[#cdb4db] shadow-[0_25px_60px_rgba(92,67,110,0.18)] sm:h-48 sm:w-44">

        {/* Inner glow */}
        <div className="absolute h-28 w-28 rounded-full bg-white/60 blur-xl" />

        {/* Face */}
        <div className="relative flex items-center gap-8">

          {/* Left eye */}
          <span className="h-2.5 w-2.5 rounded-full bg-[#51485a] sm:h-3 sm:w-3" />

          {/* Right eye */}
          <span className="h-2.5 w-2.5 rounded-full bg-[#51485a] sm:h-3 sm:w-3" />

        </div>

        {/* Tiny smile */}
        <div className="absolute bottom-[48px] h-3 w-6 rounded-b-full border-b-2 border-[#716276]/70" />

        {/* Left soft arm */}
        <div className="absolute -left-5 top-24 h-9 w-6 -rotate-12 rounded-full bg-[#d6bfdF]" />

        {/* Right soft arm */}
        <div className="absolute -right-5 top-24 h-9 w-6 rotate-12 rounded-full bg-[#d6bfdF]" />

      </div>

      {/* Small floating light */}
      <div className="absolute right-8 top-10 h-3 w-3 animate-[sparkle_3s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />

      <div className="absolute bottom-12 left-7 h-2 w-2 animate-[sparkle_4s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]" />

    </div>
  )
}

export default Lumi
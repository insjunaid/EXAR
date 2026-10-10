export default function Loading() {
  return (
    <div className="min-h-dvh bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-baseline justify-center leading-none font-serif text-4xl font-bold tracking-tight">
          <span className="text-cream">E</span>
          <span className="text-copper-shimmer">XAR</span>
        </div>
        <div className="mt-5 mx-auto w-40 h-px bg-white/10 overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-copper-600 to-copper-300 animate-[loadingBar_1.2s_ease-in-out_infinite]" />
        </div>
        <p className="text-cream/40 font-mono text-[0.65rem] mt-4 tracking-[0.35em]">LOADING</p>
      </div>
    </div>
  );
}

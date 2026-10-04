export default function Loading() {
  return (
    <div className="min-h-dvh bg-navy-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-flex">
          {/* Spinner ring */}
          <div className="w-12 h-12 border-2 border-copper-500/20 rounded-full" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-copper-500 rounded-full animate-spin" />
        </div>
        <p className="text-cream/40 font-mono text-xs mt-4 tracking-widest animate-pulse">
          LOADING
        </p>
      </div>
    </div>
  );
}

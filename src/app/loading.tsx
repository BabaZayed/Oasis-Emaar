export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#0D1B2A]">
      <div className="flex flex-col items-center gap-4">
        {/* Luxury spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#C8A45C] animate-spin" />
        </div>
      </div>
    </div>
  );
}

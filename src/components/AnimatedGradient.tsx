export default function AnimatedGradient() {
  return (
    <div className="flex h-40 w-full flex-row items-center justify-center">
      <button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
        <span className="block rounded-md bg-slate-900 px-5 py-3 font-bold text-white">
          algochurn.com
        </span>
      </button>
    </div>
  );
}

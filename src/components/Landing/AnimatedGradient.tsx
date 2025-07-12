import { cn } from "@/lib/utils.ts";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text.tsx";


export function AnimatedGradient() {
    return (
        <div className="bg-zinc-100 dark:bg-zinc-950 group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
      <span
          className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#016afb]/50 via-[#5400f6]/50 to-[#016afb]/50 bg-[length:300%_100%] p-[1px]",
          )}
          style={{
              WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
          }}
      />
            ✨
            <AnimatedGradientText className="text-xs md:text-sm font-medium font-secondary">
                 EMOTIONS MADE SIMPLE
            </AnimatedGradientText>

        </div>
    );
}
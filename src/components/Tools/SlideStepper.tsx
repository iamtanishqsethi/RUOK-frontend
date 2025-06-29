import { useState } from "react";

interface Step {
  text: string;
  image?: string;
}

export function SlideStepper({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex(i => Math.min(i + 1, steps.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  return (
    <div className="w-full text-center space-y-4 px-4 pb-4">
      <h2 className="text-xl font-semibold">Step {index + 1}</h2>
      {steps[index].image && (
        <img
          src={steps[index].image}
          alt={`Step ${index + 1}`}
          className="mx-auto w-48 h-48 object-contain rounded-md"
        />
      )}
      <p className="text-zinc-700 dark:text-zinc-300">{steps[index].text}</p>

      <div className="flex justify-between items-center mt-6">
        <button onClick={prev} disabled={index === 0} className="text-blue-500 disabled:text-gray-300">
          ←
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-zinc-800 dark:bg-white" : "bg-zinc-300"}`}
            />
          ))}
        </div>
        <button onClick={next} disabled={index === steps.length - 1} className="text-blue-500 disabled:text-gray-300">
          →
        </button>
      </div>
    </div>
  );
}

export default SlideStepper;
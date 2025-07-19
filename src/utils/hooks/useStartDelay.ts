import { useState, useEffect } from "react";

export function useStartDelay(index: number, delayMs = 600) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(false);
    const t = setTimeout(() => setStarted(true), delayMs);
    return () => clearTimeout(t);
  }, [index, delayMs]);

  return started;
}

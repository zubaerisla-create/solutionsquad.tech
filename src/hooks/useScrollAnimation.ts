"use client";

import { useInView } from "react-intersection-observer";
import { useAnimation, type AnimationControls } from "framer-motion";
import { useEffect } from "react";

export function useScrollAnimation(threshold = 0.15): {
  ref: (node?: Element | null) => void;
  controls: AnimationControls;
  inView: boolean;
} {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

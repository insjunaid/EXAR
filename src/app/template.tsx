"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// Set after the first client mount so the curtain only plays on in-app
// navigations (the preloader owns the very first load).
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const playCurtain = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <>
      {playCurtain && (
        <motion.div
          aria-hidden="true"
          className="route-curtain"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}

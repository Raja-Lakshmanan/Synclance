import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import './scroll.css'

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]); // Subtle pop-up effect
  
  return (
    <span className="reveal-word">
      <span className="base-word">{children}</span>
      <motion.span 
        style={{ opacity, y }} 
        className="highlight-word"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function ScrollRevealText({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"], 
  });

  const words = typeof children === "string" ? children.split(" ") : [];

  return (
    <motion.div ref={ref} className="reveal-wrapper">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </motion.div>
  );
}

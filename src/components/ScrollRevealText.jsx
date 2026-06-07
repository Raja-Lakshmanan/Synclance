import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./ScrollRevealText.css";

const ScrollWord = ({ index, progress, total, word }) => {
  const start = Math.max(0, (index - 1.5) / total);
  const end = Math.min(1, (index + 2) / total);
  const color = useTransform(progress, [start, end], ["#4f4f4f", "#ffffff"]);
  const opacity = useTransform(progress, [start, end], [0.28, 1]);

  return (
    <motion.span style={{ color, opacity }} className="scroll-word">
      {word}
    </motion.span>
  );
};

const ScrollRevealText = ({ text }) => {
  const containerRef = useRef(null);
  const words = typeof text === "string" ? text.trim().split(/\s+/).filter(Boolean) : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  if (!words.length) return null;

  return (
    <div ref={containerRef} className="scroll-reveal-text">
      {words.map((word, index) => (
        <ScrollWord
          key={`${word}-${index}`}
          index={index}
          progress={scrollYProgress}
          total={words.length}
          word={word}
        />
      ))}
    </div>
  );
};

export default ScrollRevealText;

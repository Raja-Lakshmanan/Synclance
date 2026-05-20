import { useEffect, useRef, useState } from "react";
import "./customCursor.css";

const interactiveSelector = [
  "a",
  "button",
  "[role='button']",
  ".service-card",
  ".member-card",
  ".blog-card",
  ".premium-btn",
  ".contact-info-card",
  ".contact-submit",
  ".btn",
  ".apply-btn",
  ".category-btn",
  ".floating-contact-button",
  ".floating-contact-main",
  ".floating-contact-item",
].join(",");

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointerQuery.matches) {
      return undefined;
    }

    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (!visible) {
        ring.current.x = event.clientX;
        ring.current.y = event.clientY;
        setVisible(true);
      }
    };

    const handleMouseOver = (event) => {
      setHovering(Boolean(event.target.closest(interactiveSelector)));
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget || !event.relatedTarget.closest(interactiveSelector)) {
        setHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setHovering(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    frameRef.current = requestAnimationFrame(render);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [visible]);

  return (
    <>
      <span
        ref={ringRef}
        className={`custom-cursor-ring ${visible ? "cursor-visible" : ""} ${hovering ? "cursor-hover" : ""}`}
      />
      <span
        ref={dotRef}
        className={`custom-cursor-dot ${visible ? "cursor-visible" : ""} ${hovering ? "cursor-hover" : ""}`}
      />
    </>
  );
};

export default CustomCursor;

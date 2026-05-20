import { useEffect, useRef, useState } from "react";
import "./customCursor.css";

const interactiveSelector = [
  "a",
  "button",
  ".service-card",
  ".member-card",
  ".premium-btn",
  ".floating-contact-button",
  ".contact-info-card",
].join(",");

const opacitySteps = [1, 0.75, 0.55, 0.35, 0.2, 0.1];
const scaleSteps = [1, 0.88, 0.76, 0.64, 0.52, 0.42];

const supportsCustomCursor = () => {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(supportsCustomCursor);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [points, setPoints] = useState([]);
  const pointsRef = useRef([]);
  const frameRef = useRef(null);
  const moveTimeoutRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setEnabled(pointerQuery.matches && !reducedMotionQuery.matches);
    };

    pointerQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsMoving(false);
      setIsHovering(false);
      setPoints([]);
      pointsRef.current = [];
      return undefined;
    }

    const publishPoints = () => {
      frameRef.current = null;
      setPoints([...pointsRef.current]);
    };

    const queuePublish = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(publishPoints);
    };

    const handleMouseMove = (event) => {
      pointsRef.current = [
        { x: event.clientX, y: event.clientY },
        ...pointsRef.current,
      ].slice(0, 6);

      setIsMoving(true);
      queuePublish();

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }

      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 320);
    };

    const handleMouseOver = (event) => {
      setIsHovering(Boolean(event.target.closest(interactiveSelector)));
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget?.closest?.(interactiveSelector)) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsMoving(false);
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`custom-cursor-trail ${isMoving ? "is-moving" : ""} ${
        isHovering ? "is-hovering" : ""
      }`}
      aria-hidden="true"
    >
      {points.map((point, index) => (
        <span
          className="cursor-trail-dot"
          key={`${index}-${point.x}-${point.y}`}
          style={{
            left: point.x,
            top: point.y,
            "--dot-opacity": opacitySteps[index] ?? 0.08,
            transform: `translate(-50%, -50%) scale(${scaleSteps[index] ?? 0.4})`,
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;

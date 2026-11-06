import { useEffect, useMemo, useState } from "react";
import tanitLogo from "../../Assets/tanit-logo.png";
import "./Loading.css";

const PETALS = [
  { left: "8%", delay: "0.2s", duration: "9s", size: 14, opacity: 0.7 },
  { left: "18%", delay: "2.8s", duration: "11s", size: 10, opacity: 0.55 },
  { left: "30%", delay: "1.4s", duration: "10s", size: 12, opacity: 0.65 },
  { left: "44%", delay: "4.1s", duration: "12s", size: 9, opacity: 0.5 },
  { left: "58%", delay: "0.9s", duration: "9.5s", size: 13, opacity: 0.6 },
  { left: "70%", delay: "3.3s", duration: "11.5s", size: 10, opacity: 0.55 },
  { left: "82%", delay: "1.9s", duration: "10.5s", size: 14, opacity: 0.65 },
  { left: "92%", delay: "4.6s", duration: "12s", size: 11, opacity: 0.5 },
];

const Petal = ({ left, delay, duration, size, opacity }) => {
  return (
    <span
      className="loading-petal"
      aria-hidden="true"
      style={{
        left,
        width: `${size}px`,
        height: `${size * 1.5}px`,
        opacity,
        animationDuration: duration,
        animationDelay: delay,
      }}
    />
  );
};

const Loading = ({ show = true }) => {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const petals = useMemo(() => PETALS, []);

  useEffect(() => {
    if (show) {
      setGone(false);
      setLeaving(false);
      return;
    }

    setLeaving(true);

    const timer = window.setTimeout(() => {
      setGone(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [show]);

  if (gone) return null;

  return (
    <div
      className={`loading-screen ${leaving ? "splash-leaving" : ""}`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Background */}
      <div className="loading-background" />

      {/* Glow */}
      <div className="loading-glow" />

      {/* Falling petals */}
      <div className="loading-petals">
        {petals.map((petal, index) => (
          <Petal key={index} {...petal} />
        ))}
      </div>

      {/* Logo */}
      <div className="loading-logo-container">
        <svg viewBox="0 0 260 260" className="loading-ring" aria-hidden="true">
          <circle
            cx="130"
            cy="130"
            r="121"
            fill="none"
            stroke="var(--color-lavender-200, #e8def8)"
            strokeWidth="1.5"
          />

          <circle
            cx="130"
            cy="130"
            r="121"
            fill="none"
            stroke="var(--color-lavender-400, #a78bfa)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="760"
            className="loading-ring-progress"
          />
        </svg>

        <img
          src={tanitLogo}
          alt="Tanit — artisanat d'exception"
          className="loading-logo"
        />
      </div>

      {/* Brand name */}
      <p className="loading-title">TANIT</p>

      <p className="loading-subtitle">Artisanat &amp; savoir-faire</p>

      {/* Progress bar */}
      <div
        className="loading-progress"
        role="progressbar"
        aria-label="Chargement"
      >
        <div className="loading-progress-bar" />
      </div>

      {/* Loading dots */}
      <div className="loading-dots" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <span key={dot} />
        ))}
      </div>
    </div>
  );
};

export default Loading;

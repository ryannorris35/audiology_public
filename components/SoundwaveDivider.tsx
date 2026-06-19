interface SoundwaveDividerProps {
  className?: string;
  ariaHidden?: boolean;
}

const HEIGHTS = [6, 12, 18, 26, 14, 22, 10, 28, 16, 8, 20, 12, 24, 10, 18, 6];

/**
 * The site's recurring signature motif: a row of bars suggesting a sound
 * waveform, used as a section divider. Purely decorative, so it is hidden
 * from assistive technology by default.
 */
export default function SoundwaveDivider({ className = '', ariaHidden = true }: SoundwaveDividerProps) {
  return (
    <div className={`soundwave-divider ${className}`} aria-hidden={ariaHidden}>
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.08}s`,
          }}
          className="animate-ripple"
        />
      ))}
    </div>
  );
}

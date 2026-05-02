/*
 * Eacessory — OrnamentDivider
 * Divisor decorativo com diamante e linhas finas em rosé gold
 */
interface OrnamentDividerProps {
  className?: string;
  light?: boolean;
}

export default function OrnamentDivider({ className = '', light = false }: OrnamentDividerProps) {
  const starFill = light ? '#E6C7B2' : '#CFA5A0';
  const dotFill = light ? 'rgba(230, 199, 178, 0.8)' : '#E6C7B2';
  const lineLeft = light
    ? 'linear-gradient(to right, transparent, rgba(230, 199, 178, 0.4))'
    : 'linear-gradient(to right, transparent, rgba(207, 165, 160, 0.5))';
  const lineRight = light
    ? 'linear-gradient(to left, transparent, rgba(230, 199, 178, 0.4))'
    : 'linear-gradient(to left, transparent, rgba(207, 165, 160, 0.5))';

  return (
    <div className={`flex items-center justify-center gap-3 my-2 ${className}`}>
      <div
        className="flex-1 h-px"
        style={{ background: lineLeft, maxWidth: '120px' }}
      />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"
          fill={starFill}
          opacity="0.7"
        />
      </svg>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="3" fill={dotFill} />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"
          fill={starFill}
          opacity="0.7"
        />
      </svg>
      <div
        className="flex-1 h-px"
        style={{ background: lineRight, maxWidth: '120px' }}
      />
    </div>
  );
}

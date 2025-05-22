export const SemiPie = ({ percentage }) => {
  const r = 80;
  const cx = 128;
  const cy = 128;
  const circ = Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100;

  return (
    <svg width="100" height="100" viewBox="-20 30 255 110" className='w-[130px] h-[60px] border-gray-700'>
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f" />
          <stop offset="50%" stopColor="#8000ff" />
          <stop offset="100%" stopColor="#f00" />
        </linearGradient>
      </defs>

      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke="#1e1e2f"
        strokeWidth="26"
      />

      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth="26"
        strokeDasharray={circ}
        strokeDashoffset={strokePct}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />

      <g transform="translate(128,110)" textAnchor="middle">
        <text fontSize="20" fill="#fff" y="12" fontWeight="bold">
          🔨
          {Math.round(percentage)}%
        </text>
      </g>
    </svg>
  );
};

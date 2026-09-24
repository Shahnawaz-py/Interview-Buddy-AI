import React from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  color?: 'blue' | 'emerald' | 'amber';
  label?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  color = 'blue',
  label = 'Voice Activity'
}) => {
  const getBarColor = () => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500';
      case 'amber': return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
      <div className="flex items-end gap-1 h-4">
        {[0.6, 1.2, 0.8, 1.5, 0.9, 1.1, 0.5].map((scale, i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${getBarColor()} ${
              isActive ? 'animate-pulse' : 'h-1 opacity-30'
            }`}
            style={{
              height: isActive ? `${Math.min(16, scale * 10)}px` : '4px',
              animationDelay: `${i * 120}ms`
            }}
          />
        ))}
      </div>
      {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
    </div>
  );
};

interface DataPoint {
  label: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  type: 'line' | 'bar';
}

export default function ResponsiveCharts({ data, type }: Props) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const chartHeight = 200;

  if (type === 'bar') {
    return (
      <div className="w-full">
        <div className="flex items-end justify-between space-x-2 h-[200px]">
          {data.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full flex items-end justify-center h-full">
                <div
                  className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                  style={{ height: `${(point.value / maxValue) * 100}%` }}
                  title={`${point.label}: ${point.value}`}
                />
              </div>
              <span className="text-xs text-muted-foreground text-center">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Line chart
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (point.value / maxValue) * 100;
    return `${x},${y}`;
  });

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 100" className="w-full h-[200px]">
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="2"
          className="transition-all"
        />
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (point.value / maxValue) * 100;
          return (
            <circle key={index} cx={x} cy={y} r="2" fill="oklch(var(--primary))" className="hover:r-3 transition-all">
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((point, index) => (
          <span key={index} className="text-xs text-muted-foreground">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ImpactSummaryProps {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
}

export default function ImpactSummary({ critical, serious, moderate, minor }: ImpactSummaryProps) {
  const items = [
    {
      count: critical,
      label: 'Critical',
      sublabel: '심각',
      emoji: '🔴',
      gradient: 'from-red-500 to-rose-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      count: serious,
      label: 'Serious',
      sublabel: '중요',
      emoji: '🟠',
      gradient: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      count: moderate,
      label: 'Moderate',
      sublabel: '보통',
      emoji: '🟡',
      gradient: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      count: minor,
      label: 'Minor',
      sublabel: '경미',
      emoji: '🔵',
      gradient: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${item.borderColor} overflow-hidden animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* 배경 그라데이션 효과 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

          <div className="relative text-center">
            <div className="text-2xl mb-3">{item.emoji}</div>
            <div className={`text-5xl font-extrabold ${item.textColor} mb-2 group-hover:scale-110 transition-transform`}>
              {item.count}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{item.label}</div>
            <div className={`inline-block px-3 py-1 ${item.bgColor} rounded-full text-xs font-medium ${item.textColor}`}>
              {item.sublabel}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

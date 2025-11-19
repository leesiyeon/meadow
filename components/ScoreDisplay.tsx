interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return {
      text: 'text-emerald-600',
      bg: 'from-emerald-500 to-green-600',
      ring: 'ring-emerald-500/20'
    };
    if (score >= 70) return {
      text: 'text-yellow-600',
      bg: 'from-yellow-500 to-orange-500',
      ring: 'ring-yellow-500/20'
    };
    if (score >= 50) return {
      text: 'text-orange-600',
      bg: 'from-orange-500 to-red-500',
      ring: 'ring-orange-500/20'
    };
    return {
      text: 'text-red-600',
      bg: 'from-red-500 to-rose-600',
      ring: 'ring-red-500/20'
    };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { emoji: '🎉', label: '우수' };
    if (score >= 70) return { emoji: '👍', label: '양호' };
    if (score >= 50) return { emoji: '⚠️', label: '보통' };
    return { emoji: '🔴', label: '개선 필요' };
  };

  const colors = getScoreColor(score);
  const label = getScoreLabel(score);

  // 원형 진행 바를 위한 계산
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 animate-scale-in">
      <div className="flex items-center gap-6">
        {/* 원형 프로그레스 바 */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="transform -rotate-90 w-full h-full">
            {/* 배경 원 */}
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-gray-200"
            />
            {/* 진행 원 */}
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`${colors.bg.split(' ')[0].replace('from-', '')}`} stopColor="currentColor" />
                <stop offset="100%" className={`${colors.bg.split(' ')[2]}`} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          {/* 중앙 점수 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-extrabold ${colors.text}`}>
              {score}
            </div>
            <div className="text-gray-500 text-xs font-medium">/ 100</div>
          </div>
        </div>

        {/* 라벨 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{label.emoji}</span>
            <h3 className="text-lg font-bold text-gray-900">접근성 점수</h3>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.text} bg-gradient-to-r ${colors.bg} bg-opacity-10 ring-2 ${colors.ring}`}>
            <span className="text-sm font-bold">{label.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

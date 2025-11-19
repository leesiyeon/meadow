import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Meadow - 웹 접근성 자동 진단';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(to bottom right, #ecfdf5, #d1fae5, #a7f3d0)',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 120,
              background: 'linear-gradient(to right, #10b981, #14b8a6)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}
          >
            Meadow
          </div>
        </div>

        {/* Main Text */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 20,
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          웹 접근성 자동 진단 서비스
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          WCAG 2.1 Level A, AA 기준 무료 검사
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '12px 24px',
              borderRadius: 12,
              border: '2px solid #d1fae5',
            }}
          >
            <span style={{ fontSize: 24, color: '#059669', fontWeight: 600 }}>
              ✓ 즉시 진단
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '12px 24px',
              borderRadius: 12,
              border: '2px solid #d1fae5',
            }}
          >
            <span style={{ fontSize: 24, color: '#059669', fontWeight: 600 }}>
              ✓ axe-core 기반
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '12px 24px',
              borderRadius: 12,
              border: '2px solid #d1fae5',
            }}
          >
            <span style={{ fontSize: 24, color: '#059669', fontWeight: 600 }}>
              ✓ 한국어 가이드
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

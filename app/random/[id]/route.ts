import { NextRequest } from "next/server";

function hashToHue(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 360;
  }
  return hash;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const hue = hashToHue(id);
  const hue2 = (hue + 40) % 360;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue}, 80%, 55%)" />
      <stop offset="1" stop-color="hsl(${hue2}, 80%, 45%)" />
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#g)" />
  <rect width="1600" height="900" filter="url(#noise)" opacity="0.35" />

  <g fill="rgba(255,255,255,0.92)">
    <circle cx="220" cy="240" r="140" opacity="0.12" />
    <circle cx="1320" cy="700" r="220" opacity="0.10" />
    <circle cx="980" cy="260" r="120" opacity="0.08" />
  </g>

  <text x="80" y="820" font-family="ui-sans-serif, system-ui" font-size="60" font-weight="700" fill="rgba(255,255,255,0.92)">
    ${id}
  </text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

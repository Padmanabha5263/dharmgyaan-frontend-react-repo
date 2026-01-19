export const getBackgroundSvg = (fill: string, stroke: string) => {
  const svg = `
  <svg
    viewBox="0 0 461 368"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="elevation2" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="3"
          stdDeviation="0.5"
          flood-color="rgba(0,0,0,0.2)"
        />
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="1"
          flood-color="rgba(0,0,0,0.14)"
        />
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="2.5"
          flood-color="rgba(0,0,0,0.12)"
        />
      </filter>
    </defs>

    <path
      filter="url(#elevation2)"
      d="M16.7653 25.824C40.7653 -11.176 343.042 -1.039 368.042 18.961C388.042 34.961 386.008 217.661 390.804 244.824C395.6 271.987 430.765 271.824 454.765 278.824C435.765 297.824 390.286 302.2 390.804 297.824C390.804 297.824 396.765 326.824 382.042 338.961C361.765 347.824 48.0414 378.961 27.0414 338.961C10.2414 306.961 -7.23473 62.824 16.7653 25.824Z"
      fill="${fill}"
      stroke="${stroke}"
      stroke-width="2"
    />
  </svg>`;

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

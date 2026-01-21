import React from "react";

type BubbleProps = {
  text: string;
  bubble?: 1 | 2;
  stroke?: boolean;
  hover?: boolean;
  shadow?: boolean;
  isDarkMode?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  fontSize?: number | string;

  /* NEW */
  maxCharsPerLine?: number;
  radio?: boolean;
  selected?: boolean;
  px?: number; // 👈 horizontal padding (rem)
  py?: number; // 👈 vertical padding (rem)
};

const BUBBLE_PATHS = {
  1: {
    viewBox: "0 0 296 92",
    path: `M20.3246 14.1913C49.3246 -0.808703 262.325 -5.8087 278.325 14.1913C294.325 34.1913 307.325 72.1913 270.325 76.1913C233.325 80.1913 36.3246 98.1913 10.3246 87.1913C-10.4754 78.3913 8.32456 34.858 20.3246 14.1913Z`,
  },
  2: {
    viewBox: "0 0 291 90",
    path: `M8.95079 16.7589C46.9508 -3.24108 258.951 -5.24108 276.951 16.7589C294.951 38.7589 295.951 79.7589 268.951 83.7589C241.951 87.7589 26.9508 95.7589 8.95079 73.7589C-5.44922 56.1589 2.95079 28.4256 8.95079 16.7589Z`,
  },
};

/* -------- text wrap helper -------- */
const splitText = (text?: string, limit?: number) => {
  if (!text) return [""];
  if (!limit) return [text];

  const regex = new RegExp(`(.{1,${limit}})(\\s|$)`, "g");
  return text.match(regex) || [text];
};

export default function Bubble({
  text,
  bubble = 1,
  stroke = true,
  hover = true,
  shadow = true,
  isDarkMode = false,
  onClick,
  fullWidth = false,
  fontSize = 20,
  maxCharsPerLine,
  radio = false,
  selected = false,
  px = 1.5, 
  py = 0.75, 
}: BubbleProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { viewBox, path } = BUBBLE_PATHS[bubble];
  const lines = splitText(text, maxCharsPerLine);

  /* THEME COLORS */
  const normalFill = isDarkMode ? "#435663" : "#FFFFFF";
  const selectedFill = isDarkMode ? "#313647" : "#F0E491";

  const normalStroke = isDarkMode ? "#435663" : "#BBC863";
  const selectedStroke = "#658C58";

  const textColor = isDarkMode ? "#FFF8D4" : "#31694E";

  return (
    <div
      onClick={onClick}
      role={radio ? "radio" : onClick ? "button" : undefined}
      aria-checked={radio ? selected : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        width: fullWidth ? "100%" : "fit-content",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease, filter 0.2s ease",
        transform: hover && isHovered ? "scale(1.02)" : "scale(1)",
        filter:
          shadow || selected
            ? hover && isHovered
              ? "drop-shadow(0px 3px 8px rgba(0,0,0,0.2))"
              : "drop-shadow(0px 2px 5px rgba(0,0,0,0.12))"
            : "none",
        outline: "none",
      }}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        style={{
          width: "100%",
          minHeight: "3.5rem",
          padding: `${py}rem ${px}rem`, // 👈 px / py applied here
        }}
      >
        <path
          d={path}
          fill={radio && selected ? selectedFill : normalFill}
          stroke={
            stroke
              ? radio && selected
                ? selectedStroke
                : normalStroke
              : "none"
          }
          strokeWidth={2}
        />

        <foreignObject x="0" y="0" width="100%" height="100%">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: textColor,
              fontSize:
                typeof fontSize === "number" ? `${fontSize}px` : fontSize,
              fontWeight: 600,
              lineHeight: 1.2,
              padding: "0.25rem",
              boxSizing: "border-box",
              pointerEvents: "none",
              wordBreak: "break-word",
            }}
          >
            {lines.join(" ")}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

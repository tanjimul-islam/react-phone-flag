import React from "react";
import { getFlagImageUrl } from "../utils/flagImages";

interface FlagProps {
  countryCode: string;
  emoji?: string;
  useImages?: boolean;
  size?: number;
  className?: string;
}

const Flag: React.FC<FlagProps> = ({
  countryCode,
  emoji,
  useImages = false,
  size = 16,
  className = "",
}) => {
  if (useImages) {
    return (
      <img
        src={getFlagImageUrl(countryCode)}
        alt={`Flag of ${countryCode}`}
        style={{
          width: size,
          height: size * 0.75, // Flag aspect ratio
          objectFit: "cover",
          borderRadius: "2px",
        }}
        className={className}
        onError={(e) => {
          // Fallback to emoji if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const emojiSpan = document.createElement("span");
          emojiSpan.textContent = emoji || "🏳️";
          emojiSpan.style.fontSize = `${size}px`;
          emojiSpan.className = className;
          target.parentNode?.insertBefore(emojiSpan, target);
        }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      {emoji || "🏳️"}
    </span>
  );
};

export default Flag;

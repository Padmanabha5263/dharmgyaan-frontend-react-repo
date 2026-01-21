import React from "react";
import l_ganesh from "../assets/videos/l_ganesh.mp4";
import d_ganesh from "../assets/videos/d_ganesh.mp4";
import { useThemeContext } from "../ThemeContext";

type BackgroundVideoProps = {
  poster?: string;
  children?: React.ReactNode;
};

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ children }) => {

  const { isDarkMode } = useThemeContext();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: -10,
      }}
    >
      <video
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'right bottom',
        }}
        src={isDarkMode ? d_ganesh : l_ganesh}
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;

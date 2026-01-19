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
    <div className="fixed inset-0 overflow-hidden -z-10">
  <video
  className="
    fixed
    inset-0
    w-screen
    h-screen
    object-cover
    object-right-bottom
  "
  src={isDarkMode ? d_ganesh : l_ganesh}
  autoPlay
  loop
  muted
  playsInline
/>



      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundVideo;

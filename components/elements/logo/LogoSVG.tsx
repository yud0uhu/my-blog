import React, { useEffect, useState } from "react";

interface LogoSvgType {
  color: string;
}
const LogoSVG: React.FC<LogoSvgType> = ({ color }) => {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationDone(true);
    }, 4000);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb&display=swap');

          @keyframes fall {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
      <text
        x="10"
        y="60"
        fontFamily="Cherry Bomb, cursive"
        fontSize="30"
        fill={color}
        style={{
          animation: animationDone
            ? "none"
            : "fall 2s ease infinite, bounce 2s ease-in-out infinite",
        }}
      >
        yud0uhu.work
      </text>
    </svg>
  );
};

export default LogoSVG;

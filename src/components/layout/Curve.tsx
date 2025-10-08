import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import React, { useEffect, useState } from "react";

type CurveProps = {
  children: React.ReactNode;
};

type Dimensions = {
  height: number;
  width: number;
};

const anim = (variants:Variants) => {

  return {

      variants,

      initial: "initial",

      animate: "enter",

      exit: "exit"

  }

}

export const Curve: React.FC<CurveProps> = ({ children }) => {

  const [dimension, setDimension] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);



  return (
    <div>
      <div
        style={{ opacity: dimension.width !== null ? 0 : 1 }}
        className="bg-[#292626cb] fixed h-[calc(100vh+600px)] min-h-[100%] w-[100vw] top-[-300px] left-0  pointer-events-none z-[999] transition-opacity duration-100"
      >
        <div className="w-[100vw] h-[100vh] min-h-full ">
          <Image width={1000} height={1000} className="w-full h-full" src={'/textures/bedge-grunge.png'} alt="" />
        </div>
      </div>
      {dimension.width > 0 && <SVG width={dimension.width} height={dimension.height} />}
      {children}
    </div>
  );
};


type SVGProps = {
  width: number;
  height: number;
};

const SVG: React.FC<SVGProps> = ({ width, height }) => {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
  M0 300
  Q${width / 2} 0 ${width} 300
  L${width} ${height}
  Q${width / 2} ${height} 0 ${height}
  L0 0
`;


  const curve: Variants = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: initialPath,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }


  const slide: Variants = {
    initial: {
      top: "-300px"
    },
    enter: {
      top: '-100vh',
      transition: {
        duration: .75,
        delay: 0.35,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: '100vh'
      }
    },
    exit: {
      top: '-300px',
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }

  return (
    <motion.svg
      {...anim(slide)}
      className="h-[calc(100vh+600px)] w-[100vw] left-0 fixed pointer-events-none z-[999]"
    >
      <defs>
        <pattern
          id="texturePattern"
          patternUnits="userSpaceOnUse"
          width={1000}
          height={1000}
        >
          <rect width="100%" height="100%" fill="#292626cb" />
          <image
            href="/textures/bedge-grunge.png"
            x="0"
            y="0"
            width="1000"
            height="1000"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      <motion.path {...anim(curve)} strokeWidth={0} fill="url(#texturePattern)" />
    </motion.svg>
  );
};

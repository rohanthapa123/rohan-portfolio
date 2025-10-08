"use client";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Curve } from "../layout/Curve";

export const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip loader if first load already done
    const firstLoadDone = sessionStorage.getItem("firstLoadDone");
    if (firstLoadDone) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          setIsLoading(false);
          sessionStorage.setItem("firstLoadDone", "true");
          return 99;
        }
        const jump = Math.floor(Math.random() * 10) + 10;
        return Math.min(prev + jump, 99);
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Loader progress={String(progress).padStart(2, "0")} />;
  }

  return <Curve >{children}</Curve>;
};

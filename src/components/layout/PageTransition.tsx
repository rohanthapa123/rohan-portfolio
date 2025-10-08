"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { LoaderWrapper } from "../loader/LoaderWrapper";
import { Curve } from "./Curve";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <LoaderWrapper key={pathname}>
        <div key={pathname}>{children}</div>
      </LoaderWrapper>
    </AnimatePresence>
  );
};

import React from "react";

export const MaxWidthWrapper = ({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`w-full ${!disabled && "max-w-[85.5rem] mx-auto px-5 md:px-8 xl:px-0"} `}
    >
      {children}
    </div>
  );
};

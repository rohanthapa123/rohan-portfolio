import React from "react";
import clsx from "clsx";

type StyleType = {
    size: string;
    leading: string;
};

type StyleNameType =
    | "hero-large"
    | "h1-large"
    | "b1-large"
    | "b2-large"
    | "b3-large"
    | "b3-large-semibold"
    | "label-large";

type VariantType =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "address";

const styles: Record<StyleNameType, StyleType> = {
    "hero-large": {
        size: "text-[3.5rem] md:text-[7rem] tracking-[-0.05em]", // 66
        leading: "leading-[4rem] md:leading-[7rem]",
    },
    "h1-large": {
        size: "text-[2.5rem] md:text-[5rem] tracking-[-0.05em]",
        leading: "leading-[3rem] md:leading-[5.5rem]",
    },
    "b1-large": {
        size: "text-[32px] md:text-[3rem] tracking-[-0.04em]",
        leading: "leading-[2.75rem] md:leading-[3.5rem]",
    },
    "b2-large": {
        size: "text-[1.5rem] md:text-[1.5rem]",
        leading: "leading-[1.75rem] md:leading-[1.75rem]",
    },
    "b3-large": {
        size: "text-[1rem] md:text-[1.125rem] tracking-[-0.04em]",
        leading: "leading-[1.75rem] md:leading-[1.75rem]",
    },
    "b3-large-semibold": {
        size: "text-[1.125rem] md:text-[1.125rem]",
        leading: "leading-[1.75rem] md:leading-[1.75rem]",
    },
    "label-large": {
        size: " md:text-[.875rem] tracking-[-0.04em]",
        leading: " md:leading-[1.25rem]",
    },
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    variant: VariantType;
    styleName?: StyleNameType;

}

export const Typography = ({
    children,
    className = "",
    variant,
    styleName = "b3-large",
    ...props
}: TypographyProps) => {
    const Element = variant;
    const { size, leading } = styles[styleName];

    return (
        <Element className={clsx(size, leading, className)} {...props}>{children}</Element>
    );
};

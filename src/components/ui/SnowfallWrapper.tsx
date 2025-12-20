"use client";

import React, { useEffect, useState } from "react";
import Snowfall from "react-snowfall";

interface SnowfallWrapperProps {
    color?: string;
    snowflakeCount?: number;
    style?: React.CSSProperties;
}

const SnowfallWrapper: React.FC<SnowfallWrapperProps> = ({
    color = "#ffffff",
    snowflakeCount = 400,
    style,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    const today = new Date();
    const isWinter = today.getMonth() >= 11 || today.getMonth() <= 2;

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    if (!isWinter) {
        return null;
    }

    return (
        <Snowfall
            color={color}
            snowflakeCount={snowflakeCount}
            style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: 999, // Ensure it's behind content if needed, or adjust based on requirement
                pointerEvents: "none", // Allow clicking through the snow
                ...style,
            }}
        />
    );
};

export default SnowfallWrapper;

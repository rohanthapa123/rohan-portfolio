"use client";
import { MaxWidthWrapper } from "../common/MaxWidthWrapper";
import Image from "next/image";
import { SpotlightGrid } from "../common/SpotlightGrid";
import { AboutData } from "@/types/api";

interface AboutProps {
    pt: string;
    data?: AboutData;
}

export const About = ({ pt, data }: AboutProps) => {
    // Fallback data
    const defaultData = {
        title: "ABOUT ME",
        description: "Hi!, I am Rohan Thapa. A curious developer who loves building creative web solutions. I enjoy experimenting with new tools, writing clean code, and turning ideas into interactive experiences that users enjoy.",
        image1: "/works/edtraa.png",
        image2: "/works/quasar.png",
        image3: "/works/klixsoft.png",
        image4: "/works/altripmart.png",
    };

    const displayData = data || defaultData;

    return (
        <section id="about-section" className={`pb-24 bg-black text-white relative group`} style={{
            paddingTop: pt
        }} data-scroll-section>
            <div className="hidden md:block"> <SpotlightGrid /></div>
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div
                        data-scroll
                        data-scroll-sticky
                        data-scroll-target="#about-section"
                        className="space-y-8 pointer-events-none"
                        style={{ top: "160px" }}

                    >
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-7xl md:text-[8rem] leading-[0.8] uppercase font-semibold tracking-tighter pointer-event-none">
                                {displayData.title}
                            </h2>
                        </div>
                        <p className="text-xl text-white/60 leading-relaxed max-w-md font-sans pl-6 pointer-event-none">
                            {displayData.description}
                        </p>
                    </div>

                    {/* Right Column - Single Image Masked Grid */}
                    <div className="relative h-[590px] lg:h-[700px] w-full group/main">
                        {/* The Single Image (Color by default, visible through mask) */}
                        <div 
                            className="absolute inset-0 z-0"
                            style={{
                                maskImage: `
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black)
                                `,
                                maskSize: 'calc(50% - 0.5rem) calc(50% - 2rem)',
                                maskPosition: '0% 0%, 0% 100%, 100% 13%, 100% 100%',
                                maskRepeat: 'no-repeat',
                                WebkitMaskImage: `
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black), 
                                    linear-gradient(black, black)
                                `,
                                WebkitMaskSize: 'calc(50% - 0.5rem) calc(50% - 2rem)',
                                WebkitMaskPosition: '0% 1%, 0% 86%, 100% 15%, 100% 100%',
                                WebkitMaskRepeat: 'no-repeat',
                            }}
                        >
                            <Image
                                src={displayData.image4}
                                alt="About Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Interactive Grid Overlay */}
                        <div className="absolute inset-0 z-10 grid grid-cols-2 gap-4">
                            <div className="space-y-4 h-full">
                                <div className=" bg-red-500 w-full backdrop-grayscale hover:backdrop-grayscale-0 transition-all duration-500 cursor-crosshair"></div>
                                <div className=" bg-red-500 w-full backdrop-grayscale hover:backdrop-grayscale-0 transition-all duration-500 cursor-crosshair"></div>
                            </div>
                            <div className="space-y-4 pt-12 h-full">
                                <div className=" bg-red-500 w-full backdrop-grayscale hover:backdrop-grayscale-0 transition-all duration-500 cursor-crosshair"></div>
                                <div className=" bg-red-500 w-full backdrop-grayscale hover:backdrop-grayscale-0 transition-all duration-500 cursor-crosshair"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
};
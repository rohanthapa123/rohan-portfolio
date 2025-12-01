

"use client";
import { MaxWidthWrapper } from "../common/MaxWidthWrapper";
import Image from "next/image";
import { SpotlightGrid } from "../common/SpotlightGrid";

export const About = ({ pt }: { pt: string }) => {
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

                            <h2 className="text-7xl md:text-[8rem] leading-[0.8]  uppercase font-semibold tracking-tighter pointer-event-none">
                                About Me
                            </h2>
                        </div>
                        <p className="text-xl text-white/60 leading-relaxed max-w-md font-sans pl-6 pointer-event-none">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam.
                        </p>
                    </div>

                    {/* Right Column - Masonry Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="relative h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src="/works/edtraa.png"
                                    alt="About 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src="/works/quasar.png"
                                    alt="About 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="relative h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src="/works/klixsoft.png"
                                    alt="About 3"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src="/works/altripmart.png"
                                    alt="About 4"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
};
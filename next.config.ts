import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rohanthapa.com.np",
      },
    ],
    unoptimized: true,
  },
  // async rewrites(){
  //   return [
  //     {
  //       source: '/blogs',
  //       destination: 'https://blog-website-mocha-pi.vercel.app/blogs'
  //     },
  //     {
  //       source: '/blog/:path*',
  //       destination: 'https://blog-website-mocha-pi.vercel.app/blog/:path*'
  //     },
  //   ]
  // }
};

export default nextConfig;

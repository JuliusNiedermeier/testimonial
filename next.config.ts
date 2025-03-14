import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/dashboard",
      destination: "/dashboard/team",
      permanent: true,
    },
    {
      source: "/dashboard/team/:team",
      destination: "/dashboard/team/:team/testimonials",
      permanent: true,
    },
  ],
};

export default nextConfig;

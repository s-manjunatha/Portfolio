import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/certificates",
        destination: "/#certificates",
        permanent: true,
      },
      {
        source: "/certificate",
        destination: "/#certificates",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/#certificates",
        permanent: true,
      },
      {
        source: "/achievement",
        destination: "/#certificates",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

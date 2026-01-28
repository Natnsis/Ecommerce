import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vsbsdixzrqevypnfonww.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "via.nplaceholder.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'vsbsdixzrqevypnfonww.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

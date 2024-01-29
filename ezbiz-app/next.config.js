/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "swiperjs.com",
      },
      {
        protocol: "http",
        hostname: "159.223.51.20",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;

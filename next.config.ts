import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      new URL('https://ecommerce.routemisr.com/**/**'),
      new URL('https://ecommerce.routemisr.com/**'),
      new URL('https://www.launchuicomponents.com/**'),
      new URL('https://randomuser.me/**'),
    ],
  },
}
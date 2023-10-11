/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "upload.wikimedia.org",
      "www.animals.or.kr",
      "www.chemicalnews.co.kr",
    ],
  },
  env: {
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
  },
};

module.exports = nextConfig;

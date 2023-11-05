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
      "search.pstatic.net",
      "images.khan.co.kr",
      "images.vivino.com",
    ],
  },
  env: {
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;

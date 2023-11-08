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
      "avatars.githubusercontent.com",
      "mblogthumb-phinf.pstatic.net",
      "images.khan.co.kr",
      "images.vivino.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    WebSocket_URL: process.env.WebSocket_URL,
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
  },
};

module.exports = nextConfig;

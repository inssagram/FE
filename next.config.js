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
      "firebasestorage.googleapis.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
    FB_APIKEY: process.env.FB_APIKEY,
    FB_AUTHDOMAIN: process.env.FB_AUTHDOMAIN,
    FB_PROJECTID: process.env.FB_PROJECTID,
    FB_STORAGEBUCKET: process.env.FB_STORAGEBUCKET,
    FB_MESSAGINGSENDERID: process.env.FB_MESSAGINGSENDERID,
    FB_APPID: process.env.FB_APPID,
    FB_MEASUREMENTID: process.env.FB_MEASUREMENTID,
    WebSocket_URL: process.env.WebSocket_URL,
  },
};

module.exports = nextConfig;

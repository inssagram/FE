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
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
    WebSocket_URL: process.env.WebSocket_URL,
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
  },
};

module.exports = nextConfig;

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
    ],
  },
  env: {
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
    BASE_URL: process.env.BASE_URL,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
  },
};

module.exports = nextConfig;

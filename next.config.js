/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["upload.wikimedia.org"],
  },
  env: {
    JOBLIST_API_KEY: process.env.JOBLIST_API_KEY,
  },
};

/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["upload.wikimedia.org"],
  },
  env: {
    COMPANY_LIST_API_KEY: process.env.COMPANY_LIST_API_KEY,
  },
};

/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["upload.wikimedia.org", "www.animals.or.kr"],
  },
  env: {
    COMPANY_LIST_API_KEY: process.env.COMPANY_LIST_API_KEY,
  },
};

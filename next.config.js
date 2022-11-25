/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    exportPathMap: async () => {
        return {
            '/': {page: '/daily'}
        }
    }
};

module.exports = nextConfig;

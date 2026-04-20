/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        domains:['cdn-icons-png.flaticon.com']
    }
};

export default nextConfig;

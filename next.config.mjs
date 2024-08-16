/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        API_URL: 'https://kstech-backend.onrender.com',
        // API_URL: 'http://localhost:7000',
        // API_URL: 'http://localhost/api',
        NGINX_API_URL: 'http://nginx/api'
    },
    httpAgentOptions: {
        keepAlive: true,
        maxSockets: 50,
        timeout: 600000,
    },
    reactStrictMode: false,
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;

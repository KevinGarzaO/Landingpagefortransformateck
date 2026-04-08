/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly',
            options: {
                cacheName: 'firebase-images',
            },
        },
    ],
});

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Basic optimizations
        optimizePackageImports: ['lucide-react', '@mui/icons-material', '@mui/material'],
    },
    async redirects() {
        return [
            // Categorías antiguas
            { source: '/category/:slug*', destination: '/', permanent: true },
            // Paginación antigua de blog (WordPress: /blog/2/, /blog/3/, etc.)
            { source: '/blog/:page(\\d+)', destination: '/blog', permanent: true },
            { source: '/blog/:page(\\d+)/', destination: '/blog', permanent: true },
            // Posts de emprendimiento
            { source: '/emprendimiento/:slug*', destination: '/', permanent: true },
            // Posts de marketing
            { source: '/marketing/:slug*', destination: '/', permanent: true },
            // Posts de tecnología
            { source: '/tecnologia/:slug*', destination: '/', permanent: true },
            // Feed RSS (con y sin trailing slash)
            { source: '/feed', destination: '/', permanent: true },
            { source: '/feed/', destination: '/', permanent: true },
            // Apple app site association
            { source: '/apple-app-site-association', destination: '/', permanent: true },
            { source: '/.well-known/apple-app-site-association', destination: '/', permanent: true },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            }
        ],
    },
};

export default withPWA(nextConfig);

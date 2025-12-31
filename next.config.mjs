/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Basic optimizations
        optimizePackageImports: ['lucide-react', '@mui/icons-material', '@mui/material'],
    }
};

export default nextConfig;

import nextPWA from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
            pathname: '/**',
        },],
    },
    reactStrictMode: true, // Enable React strict mode for improved error handling
    swcMinify: true,      // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    },
};


// Configuration object tells the next-pwa plugin
const withPWA = nextPWA({
    dest: "public", // Destination directory for the PWA files
    disable: true, // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
});


export default withPWA(nextConfig);

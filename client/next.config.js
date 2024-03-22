/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com"], // Add this line
    },
};

module.exports = nextConfig;

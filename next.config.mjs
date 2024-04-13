/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    images: {
        remotePatterns: [{
            hostname: 'img.freepik.com'
        }, {
            hostname: 'files.edgestore.dev'
        }, {
            hostname: 'w7.pngwing.com'
        }]
    },
};

export default nextConfig;
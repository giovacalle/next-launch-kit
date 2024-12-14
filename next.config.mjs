/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: ''
      }
    ]
  },
  serverExternalPackages: ['arctic'] // since arctic use oslo under the hood
};

export default nextConfig;

const nextConfig = {
  env: {
    NEXT_PUBLIC_EXCHANGERATE_API_KEY: process.env.EXCHANGERATE_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

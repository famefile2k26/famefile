import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A checagem de tipos roda à parte (npm run typecheck); não bloqueia o deploy do conteúdo.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

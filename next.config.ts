import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A checagem de tipos roda à parte (npm run typecheck); não bloqueia o deploy do conteúdo.
  typescript: { ignoreBuildErrors: true },
  // Upload de fotos pelo admin (limite da Vercel por requisição é 4,5 MB).
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
};

export default nextConfig;

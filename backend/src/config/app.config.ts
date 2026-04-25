import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',

    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
    portalBaseUrl:
        process.env.PORTAL_BASE_URL ??
        'https://www.transparencia.ma.gov.br/api',
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '20', 10),
    },
    cors: {
        origin: process.env.CORS_ORIGIN ?? '*',
    },
}));
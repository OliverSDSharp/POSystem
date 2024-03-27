import { Redis } from '@upstash/redis'

const url = process.env.REDIS_URL || 'redis://localhost:6379';
const token = process.env.TOKEN || '';

export function Init(): Redis {
    return new Redis({
        url: url,
        token: token,
    })
}
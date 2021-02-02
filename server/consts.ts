import dotenv from 'dotenv'
import yn from 'yn'

dotenv.config()

export interface IExternalServiceConnectionData {
  HOST: string
  PORT: number
}

export interface IPostgresData {
  USERNAME: string,
  PASSWORD: string,
  DATABASE: string,
}

export const POSTGRES: IExternalServiceConnectionData & IPostgresData = {
  HOST: process.env.POSTGRES_HOST || 'localhost',
  PORT: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  USERNAME: process.env.POSTGRES_USER || 'postgres',
  PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  DATABASE: process.env.POSTGRES_DATABASE || 'plainjane',
}

export const REDIS: IExternalServiceConnectionData = {
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: parseInt(process.env.REDIS_PORT ?? '6379')
}

type MinioBuckets = 'avatars'

export interface IMinioData {
  ACCESS_KEY: string
  SECRET_KEY: string
  REGION: string
  BUCKETS: Record<MinioBuckets, string>
  USE_SSL: boolean
}

export const MINIO: IExternalServiceConnectionData & IMinioData = {
  HOST: process.env.MINIO_HOST || 'localhost',
  PORT: parseInt(process.env.MINIO_POST || '9000'),
  ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minio',
  SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minio123',
  REGION: process.env.MINIO_REGION || 'eu-east-1',
  BUCKETS: {
    avatars: 'avatars'
  },
  USE_SSL: yn(process.env.MINIO_USE_SSL || true, { default: false, lenient: true })
}

export const MISC = {
  SESSION_SECRET: process.env.SESSION_SECRET || 'hocus pocus'
}

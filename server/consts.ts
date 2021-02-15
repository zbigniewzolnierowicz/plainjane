import dotenv from 'dotenv'
import yn from 'yn'

dotenv.config()

export interface IExternalServiceConnectionData {
  HOST: string
  PORT: string
}

export interface IPostgresData {
  USERNAME: string,
  PASSWORD: string,
  DATABASE: string,
}

export const POSTGRES: IExternalServiceConnectionData & IPostgresData = {
  HOST: process.env.POSTGRES_HOST || 'localhost',
  PORT: process.env.POSTGRES_PORT || '5432',
  USERNAME: process.env.POSTGRES_USER || 'postgres',
  PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  DATABASE: process.env.POSTGRES_DATABASE || 'plainjane',
}

export const REDIS: IExternalServiceConnectionData = {
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: process.env.REDIS_PORT || '6379',
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
  PORT: process.env.MINIO_PORT || '9000',
  ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minio',
  SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minio123',
  REGION: process.env.MINIO_REGION || 'eu-east-1',
  BUCKETS: {
    avatars: 'avatars',
  },
  USE_SSL: yn(process.env.MINIO_USE_SSL || true, { default: false, lenient: true }),
}

export interface IGoogleData {
  CLIENT_ID: string,
  CLIENT_SECRET: string,
}

export const GOOGLE: IGoogleData = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
}

export const MISC = {
  SESSION_SECRET: process.env.SESSION_SECRET || 'hocus pocus',
  TYPEORM: {
    BASE_DIRECTORY: process.env.NODE_ENV === 'production' ? 'dist/server/services/db' : 'server/services/db',
    FILE_EXTENSION: process.env.NODE_ENV === 'production' ? 'js' : 'ts',
  },
}

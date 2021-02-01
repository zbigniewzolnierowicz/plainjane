import dotenv from 'dotenv'

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

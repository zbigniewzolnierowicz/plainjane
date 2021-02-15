import { ConnectionOptions } from 'typeorm'
import { MISC, POSTGRES } from '../../consts'

const entitiesDir = `${MISC.TYPEORM.BASE_DIRECTORY}/entity`
const migrationsDir = `${MISC.TYPEORM.BASE_DIRECTORY}/migration`
const subscribersDir = `${MISC.TYPEORM.BASE_DIRECTORY}/subscriber`

const TypeORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: Number(POSTGRES.PORT),
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: [
    `${entitiesDir}/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  migrations: [
    `${migrationsDir}/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  subscribers: [
    `${subscribersDir}/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  cli: {
    entitiesDir,
    migrationsDir,
    subscribersDir,
  },
}

export = TypeORMConfig

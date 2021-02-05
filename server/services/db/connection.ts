import { createConnection } from 'typeorm'
import { MISC, POSTGRES } from '../../consts'

const Connection = createConnection({
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: [
    `${MISC.TYPEORM.BASE_DIRECTORY}/entity/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  migrations: [
    `${MISC.TYPEORM.BASE_DIRECTORY}/migration/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  subscribers: [
    `${MISC.TYPEORM.BASE_DIRECTORY}/subscriber/**/*.${MISC.TYPEORM.FILE_EXTENSION}`,
  ],
  cli: {
    entitiesDir: `${MISC.TYPEORM.BASE_DIRECTORY}/entity`,
    migrationsDir: `${MISC.TYPEORM.BASE_DIRECTORY}/migration`,
    subscribersDir: `${MISC.TYPEORM.BASE_DIRECTORY}/subscriber`,
  },
},
)

export default Connection

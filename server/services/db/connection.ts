import { createConnection } from 'typeorm'
import { POSTGRES } from '../../consts'

const typeOrmDir = process.env.NODE_ENV === 'production' ? 'dist/server/services/db' : 'server/services/db'
const typeOrmFileExtension = process.env.NODE_ENV === 'production' ? 'js' : 'ts'

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
    `${typeOrmDir}/entity/**/*.${typeOrmFileExtension}`
  ],
  migrations: [
    `${typeOrmDir}/migration/**/*.${typeOrmFileExtension}`
  ],
  subscribers: [
    `${typeOrmDir}/subscriber/**/*.${typeOrmFileExtension}`
  ],
  cli: {
    entitiesDir: `${typeOrmDir}/entity`,
    migrationsDir: `${typeOrmDir}/migration`,
    subscribersDir: `${typeOrmDir}/subscriber`
  }
}
)

export default Connection

import { createConnection } from 'typeorm'
import { POSTGRES } from '../../consts'

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
    'server/services/db/entity/**/*.ts'
  ],
  migrations: [
    'server/services/db/migration/**/*.ts'
  ],
  subscribers: [
    'server/services/db/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'server/services/db/entity',
    migrationsDir: 'server/services/db/migration',
    subscribersDir: 'server/services/db/subscriber'
  }
}
)

export default Connection

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
    'src/services/db/entity/**/*.ts'
  ],
  migrations: [
    'src/services/db/migration/**/*.ts'
  ],
  subscribers: [
    'src/services/db/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/services/db/entity',
    migrationsDir: 'src/services/db/migration',
    subscribersDir: 'src/services/db/subscriber'
  }
}
)

export default Connection

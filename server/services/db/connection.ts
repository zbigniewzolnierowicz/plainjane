import { createConnection } from 'typeorm'
import TypeORMConfig from './config'

const Connection = createConnection(TypeORMConfig)

export default Connection

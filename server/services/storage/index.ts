import { Client } from 'minio'
import { MINIO } from '../../consts'

const S3 = new Client({
  endPoint: MINIO.HOST,
  port: MINIO.PORT,
  accessKey: MINIO.ACCESS_KEY,
  secretKey: MINIO.SECRET_KEY,
  region: MINIO.REGION,
  useSSL: false,
})

export {
  S3,
}

import { Client } from 'minio'

const S3 = new Client({
  endPoint: 'localhost',
  port: 9000,
  accessKey: 'minio',
  secretKey: 'minio123',
  useSSL: false
})

export {
  S3
}

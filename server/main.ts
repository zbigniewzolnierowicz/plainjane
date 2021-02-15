import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { createClient } from 'redis'
import connectRedis from 'connect-redis'
import bodyParser from 'body-parser'

import GooglePassportStrategy from './services/auth/google'
import Routes from './routes'
import { deserialize, serialize } from './services/auth/serialize'
import { S3 } from './services/storage'
import { MINIO, MISC, REDIS } from './consts'
import LocalPassportStrategy from './services/auth/local'

const app = express()
const PORT = 8000

async function main() {
  try {
    const redisClient = createClient({
      host: REDIS.HOST,
      port: Number(REDIS.PORT),
    })
    const RedisStore = connectRedis(session)

    app.use(session({
      secret: MISC.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
    }))
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(bodyParser.json())

    passport.use(GooglePassportStrategy)
    passport.use(LocalPassportStrategy)
    passport.serializeUser(serialize)
    passport.deserializeUser(deserialize)

    app.use(Routes)

    Object.entries(MINIO.BUCKETS).forEach(([_bucketKey, bucketName]) => {
      S3.bucketExists(bucketName).then(bucketExists => {
        if (!bucketExists) {
          S3.makeBucket(bucketName, MINIO.REGION)
        }
      })
    })

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
  } catch(err) {
    console.error(err)
  }
}

main()

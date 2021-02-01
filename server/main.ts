import express, { Request } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { createClient } from 'redis'
import connectRedis from 'connect-redis'

import GooglePassportStrategy from './auth/google'
import Routes from './routes'
import { deserialize, serialize } from './auth/serialize'
import { onlyAuthed } from './auth/guard'
import { S3 } from './services/storage'
import { REDIS } from './consts'
import { User } from './services/db/entity/User'

const app = express()
const PORT = 8000

async function main() {
  try {
    const redisClient = createClient({
      host: REDIS.HOST,
      port: REDIS.PORT
    })
    const RedisStore = connectRedis(session)

    app.use(session({
      secret: 'hocus pocus',
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
    }))
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(GooglePassportStrategy)
    passport.serializeUser(serialize)
    passport.deserializeUser(deserialize)

    app.use(Routes)

    if (!S3.bucketExists('avatars')) {
      S3.makeBucket('avatars', 'eu-east-1')
    }

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
  } catch(err) {
    console.error(err)
  }
}

main()

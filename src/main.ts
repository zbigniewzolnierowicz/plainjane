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

    app.get(
      '/user',
      onlyAuthed,
      (req: Request, res) => {
        const user = req.user as unknown as User
        res.send(`
          <html>
            <body>
              <pre>${JSON.stringify(user, null, 2)}</pre>
              <img src="/avatars/${user.profile}" alt="${user.name}" />
            </body>
          </html>
        `)
      }
    )

    app.get('/', (_req, res) => {
      res.send('yo')
    })

    app.get('/avatars/:path', async (req: Request<{ path: string }>, res) => {
      const avatar = await S3.getObject('avatars', req.params.path)
      avatar.pipe(res)
    })

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

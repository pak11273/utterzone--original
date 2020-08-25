import { COOKIE_NAME, __prod__ } from "./constants"

import Redis from "ioredis"
import connectRedis from "connect-redis"
import session from "express-session"

export const redis = new Redis(process.env.REDIS_URL)
export const RedisStore = connectRedis(session)

export const redisSession = session({
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redis,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax", // csrf
    secure: __prod__, // cookie only works in https
    domain: __prod__ ? ".utterzone.com" : undefined,
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
})
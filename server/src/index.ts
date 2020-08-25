import "reflect-metadata"
import "dotenv-safe/config"

import { COOKIE_NAME, __prod__ } from "./constants"

import { ApolloServer } from "apollo-server-express"
import { HelloResolver } from "./resolvers/hello"
import { Post } from "./entities/Post"
import { PostResolver } from "./resolvers/post"
import Redis from "ioredis"
import { Updoot } from "./entities/Updoot"
import { User } from "./entities/User"
import { UserResolver } from "./resolvers/user"
import { buildSchema } from "type-graphql"
import connectRedis from "connect-redis"
import cors from "cors"
import { createConnection } from "typeorm"
import { createUpdootLoader } from "./utils/createUpdootLoader"
import { createUserLoader } from "./utils/createUserLoader"
import express from "express"
import path from "path"
import session from "express-session"

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot],
  })
  await conn.runMigrations()

  // await Post.delete({});

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)
  app.set("trust proxy", 1)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )
  app.use(
    session({
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
        domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:5000")
  })
}

main().catch(err => {
  console.error(err)
})

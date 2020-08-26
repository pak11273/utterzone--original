import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../types"
import { redis } from "../redis"

const tframe: any = {
  min: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24,
  week: 60 * 60 * 24 * 7,
  month: 60 * 60 * 24 * 7 * 4,
  year: 60 * 60 * 24 * 7 * 4 * 12,
}

export const rateLimit: ({
  limitAnon,
  limitUser,
  msgAnon,
  msgUser,
  time,
  multiplier,
}: {
  limitAnon: number
  limitUser: number
  msgAnon: string
  msgUser: string
  time: string
  multiplier?: number
}) => MiddlewareFn<MyContext> = ({
  limitAnon,
  limitUser,
  msgAnon,
  msgUser,
  time,
  multiplier = 1,
}) => async ({ context: { req }, info }, next) => {
  try {
    const isAnon = !req.session!.userId
    const key = `rate-limit:${info.fieldName}:${
      isAnon
        ? req.headers.origin
        : req.headers.origin + ":" + req.session!.userId
    }`

    const current = await redis.llen(key)
    if (isAnon && current >= limitAnon) {
      return {
        data: {
          [info.fieldName]: {
            errors: msgAnon,
          },
        },
      }
    }

    if (!isAnon && current >= limitUser) {
      return {
        data: {
          [info.fieldName]: {
            errors: msgUser,
          },
        },
      }
    }
    const exists = await redis.exists(key)
    if (!exists) {
      await redis
        .multi()
        .rpush(key, key)
        .expire(key, tframe[time] * multiplier)
        .exec()
      // await redis.expire(key, tframe[time] * multiplier)
    } else {
      await redis.rpushx(key, key)
    }
    const result = await next()
    return result
  } catch (err) {
    return err
  }
}

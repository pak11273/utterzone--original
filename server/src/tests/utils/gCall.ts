import { GraphQLSchema, graphql } from "graphql"

import { Maybe } from "graphql/jsutils/Maybe"
import { createSchema } from "../../utils/createSchema"

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any
  }>
  userId?: string
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema()
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  })
}

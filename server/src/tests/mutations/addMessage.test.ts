// import { ApolloServer, gql } from "apollo-server-express"

// import { createTestClient } from "apollo-server-testing"
// import { resetDb } from "../../db"
// import schema from "../../schema"

// describe("Mutation.addMessage", () => {
//   beforeEach(resetDb)

//   it("should add message to specified chat", async () => {
// const server = new ApolloServer({ schema })

//     const { query, mutate } = createTestClient(server)

//     const addMessageRes = await mutate({
//       variables: { chatId: "1", content: "Hello World" },
//       mutation: gql`
//         mutation AddMessage($chatId: ID!, $content: String!) {
//           addMessage(chatId: $chatId, content: $content) {
//             id
//             content
//           }
//         }
//       `,
//     })

//     expect(addMessageRes.data).toBeDefined()
//     expect(addMessageRes.errors).toBeUndefined()
//     expect(addMessageRes.data).toMatchSnapshot()

//     const getChatRes = await query({
//       variables: { chatId: "1" },
//       query: gql`
//         query GetChat($chatId: ID!) {
//           chat(chatId: $chatId) {
//             id
//             lastMessage {
//               id
//               content
//             }
//           }
//         }
//       `,
//     })

//     expect(getChatRes.data).toBeDefined()
//     expect(getChatRes.errors).toBeUndefined()
//     expect(getChatRes.data).toMatchSnapshot()
//   })
// })

import { Connection } from "typeorm"
import { testConn } from "../utils/testConn"

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

describe("createUse", () => {
  it("create user", () => {
    // do something here
  })
})

import { ApolloClient, InMemoryCache } from "@apollo/client"

import { PaginatedPosts } from "../generated/graphql"
import { createWithApollo } from "./createWithApollo"

// import { NextPageContext } from "next";

const createClient = (ctx: any) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) ||
        "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                }
              },
            },
          },
        },
      },
    }),
  })

export const withApollo = createWithApollo(createClient)

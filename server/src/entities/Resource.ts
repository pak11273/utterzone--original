import { Field, ID, ObjectType } from "type-graphql"

import { Comment } from "./Comment"

@ObjectType()
export class Resource {
  @Field(_type => ID)
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  votes: number

  @Field(_type => [Comment])
  comments: Comment[]
}

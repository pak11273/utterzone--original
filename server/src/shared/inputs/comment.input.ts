import { Authorized, Field, ID, InputType } from "type-graphql"

import { Comment } from "../../entities/Comment"

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(_type => ID)
  name: string

  @Authorized()
  @Field()
  username?: string

  @Field()
  content: string
}

import { TRPCError } from '@trpc/server';
import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const postTitles = ['title1', 'title2', 'title3']
const t = createTRPCRouter
const p = publicProcedure

export const helperRouter = t({
  post: t({
    getByTitle: p
      .input(z.object({
        title: z.string({
          required_error: 'postTitle is required',
          invalid_type_error: 'postTitle type is invalidate'
        })
      })
      )
      .query(({ input, ctx }) => {
        const { title } = input
        const post = postTitles.find(postTitle => postTitle === title)
        if (!post?.length) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'post not found'
          })
        }
        return { post, createAt: new Date() }
      })
  })
})

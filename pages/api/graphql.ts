import { createYoga } from "graphql-yoga";
import SchemaBuilder from "@pothos/core";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

import PrismaPlugin from "@pothos/plugin-prisma";

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.queryType({});

builder.mutationType({});

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    posts: t.relation("posts"),
  }),
});

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
    published: t.exposeBoolean("published"),
    author: t.relation("author"),
    tags: t.relation("tags"),
    createdAt: t.string({
      resolve: (parent) => {
        const createdAtDate = new Date(parent.createdAt).toLocaleString();
        // const createdAt =
        //   Math.abs(createdAtDate.getUTCFullYear()).toString() +
        //   "-" +
        //   Math.abs(createdAtDate.getUTCMonth()).toString() +
        //   "-" +
        //   Math.abs(createdAtDate.getUTCDay()).toString();
        return createdAtDate.toString();
      },
    }),
  }),
});

builder.prismaObject("Tag", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    label: t.exposeString("label"),
    posts: t.relation("posts"),
  }),
});

builder.queryField("feed", (t) =>
  t.prismaField({
    type: ["Post"],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: true },
      }),
  })
);

builder.queryField("post", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.post.findUnique({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);

builder.queryField("drafts", (t) =>
  t.prismaField({
    type: ["Post"],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: false },
      }),
  })
);

// キーワード検索用
builder.queryField("filterPosts", (t) =>
  t.prismaField({
    type: ["Post"],
    args: {
      searchString: t.arg.string({ required: false }),
      // 公開状態or非公開状態をパラメータの引数に渡して絞り込み
      published: t.arg.boolean({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
              { label: { contains: args.searchString } },
            ],
          }
        : {};
      const published = args.published;
      return prisma.post.findMany({
        ...query,

        where: { ...or, published },
      });
    },
  })
);

builder.mutationField("signupUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.user.create({
        ...query,
        data: {
          name: args.name,
        },
      }),
  })
);

builder.mutationField("deletePost", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);

builder.mutationField("publish", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          published: true,
        },
      }),
  })
);

builder.queryField("tags", (t) =>
  t.prismaField({
    type: ["Tag"],
    resolve: async (query, _parent, _args, _info) =>
      prisma.tag.findMany({
        ...query,
      }),
  })
);

builder.mutationField("createDraft", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string(),
      label: t.arg.string(),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.create({
        ...query,
        data: {
          title: args.title,
          content: args.content,
        },
      }),
  })
);
const schema = builder.toSchema();

export default createYoga<{
  request: NextApiRequest;
  response: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

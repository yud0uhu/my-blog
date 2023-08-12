import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'ありす',
    // email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: '美味しいご飯を食べるために知っておくべきこと',
          content: 'https://example.com/blog/umami-rice',
          published: true,
          tags: {
            create: [
              {
                label: '美味しい',
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'にーる',
    // email: "nilu@prisma.io",
    posts: {
      create: [
        {
          title: 'ご飯がおいしい季節になりました',
          content: 'https://example.com/blog/delicious-rice-season',
          published: true,
          viewCount: 42,
          tags: {
            create: [
              {
                label: '季節',
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'まーむーど',
    // email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          title: '最高のご飯屋さんを探しています',
          content: 'https://example.com/blog/best-rice-restaurant',
          published: true,
          viewCount: 128,
          tags: {
            create: [
              {
                label: 'ご飯屋さん',
              },
            ],
          },
        },
        {
          title: 'ご飯とお茶のペアリングについて',
          content: 'https://example.com/blog/rice-tea-pairing',
        },
      ],
    },
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

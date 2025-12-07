const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = []
  for (let i=1;i<=5;i++) {
    users.push(await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`
      }
    }))
  }

  for (let i=1;i<=20;i++) {
    await prisma.post.create({
      data: {
        title: `Sample Post ${i}`,
        content: `This is the content for post number ${i}.`,
        userId: users[(i-1) % users.length].id,
        image: null
      }
    })
  }

  console.log('Seed finished.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from "@prisma/client"
import { products } from "../utils/data"

const prisma = new PrismaClient()

async function seed() {
  products.forEach(async (item) => {
    const product = await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        picture: item.picture,
      },
    })
    console.log(`${item.id}: ${product}`)
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

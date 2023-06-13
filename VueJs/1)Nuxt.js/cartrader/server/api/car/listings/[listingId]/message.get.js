import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


export default defineEventHandler(async (evt) => {
  const { listingId } = evt.context.params;

  return prisma.messages.findMany({
    where: {
      listingId: parseInt(listingId)
    }
  })
})
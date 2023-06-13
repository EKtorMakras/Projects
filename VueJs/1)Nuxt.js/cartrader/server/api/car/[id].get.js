import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


export default defineEventHandler(async (evt) => {
  
  const { id } = evt.context.params

  const selectedCar = await prisma.car.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!selectedCar) {
    throw createError({
      statusCode: 404,
      statusMessage: `Car with id:${id} does not exist`
    })
  }

  return selectedCar
})
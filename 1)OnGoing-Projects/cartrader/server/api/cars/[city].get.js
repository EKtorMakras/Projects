import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler((evt) => {
  
  const { city } = evt.context.params

  const { make, minPrice, maxPrice } =  getQuery(evt)

  const filters = {
    city: city.toLowerCase(),
  }

  if (make) {
    filters.make = make
  }

  if (minPrice || maxPrice) {
    filters.price = {}
  }

  if (minPrice) {
    filters.price.gte = parseInst(minPrice)
  }

  if (maxPrice) {
    filters.price.lte = parseInst(maxPrice)
  }

  return filters

  return prisma.car.findMany({
    where: filters,
  })
})
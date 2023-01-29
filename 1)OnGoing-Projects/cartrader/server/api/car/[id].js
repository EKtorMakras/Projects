import cars from '@/data/cars.json'


export default defineEventHandler(evt => {
  
  const { id } = evt.context.params

  const selectedCar = cars.find(car => {
    return car.id === parseInt(id)
  })

  if (!selectedCar) {
    throw createError({
      statusCode: 404,
      statusMessage: `Car with id:${id} does not exist`
    })
  }

  return selectedCar
})
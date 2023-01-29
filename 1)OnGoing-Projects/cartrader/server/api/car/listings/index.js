import Joi from 'joi'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().min(1886).max(new Date().getFullYear() + 1).required(),
  miles: Joi.number().min(0).required(),
  city: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  numberOfSeats: Joi.number().min(1).max(150).required(),
  features: Joi.array().items(Joi.string).required(),
  image: Joi.string().required(),
  listerId: Joi.string().required(),
  listerId: Joi.number().min(0).required(),
  name: Joi.string().required(),
})


export default defineEventHandler(async (evt) => { 
 
  const body = await readBody(evt)
  
  const { error, value } = await schema.validate(body)

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message
    })
  }


  const {
    name,
    make,
    model,
    miles,
    price,
    numberOfSeats,
    city,
    features,
    description,
    image
  }
    = body


  const car = await prisma.car.create({
    data: {
      name,
      make,
      model,
      miles,
      price,
      numberOfSeats,
      city: city.toLowerCase(),
      features,
      description,
      image
    }
  })

  return {
    error,
    value
  }
})
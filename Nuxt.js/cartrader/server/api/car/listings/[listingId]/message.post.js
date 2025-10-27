import Joi from 'joi'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  name: Joi.string().required(),
  message: Joi.string().min(20).required()
});


export default defineEventHandler(async (evt) => {
  const body = await readBody(evt)
  const { listingId } = evt.context.params;

  const { error,value } = await schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    })
  }

  const { message, email, phone, name } = body

  return prisma.message.create({
    data: {
      message,
      email,
      name,
      phone,
      listingId: parseInt(listingId)
    }
  })
})
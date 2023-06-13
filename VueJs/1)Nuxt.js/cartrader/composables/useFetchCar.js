export default async (id) => {

  const url = `/api/car/${id}`
  
  const { data, error } = await useFetch(url)

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage
    })
  }

  return { data }
}
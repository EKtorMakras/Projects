export default async (city, filters) => {

  const url = `/api/cars/${city}`
  const options = {
    params: {
      ...filters
    }
  }
  
  const { data, error ,refresh } = await useFetch(url,options)

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Unable to fetch data'
    })
  }

  return {data,refresh}
}
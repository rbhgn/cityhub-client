export const GetFormattedDate = (date) => {
  const parts = date.split('-');
  const result = `${Number(parts[2])}/${Number(parts[1])}/${Number(parts[0])}`
  return result
}

export const getRandomImage = (img) => {
  const rnd = Math.floor(Math.random() * img.length)
  return img[rnd]
}
export const capitalise = (str) => {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } catch (err) {
    return str
  }
}

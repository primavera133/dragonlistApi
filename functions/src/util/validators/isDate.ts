export const isDate = async (timestamp: number): Promise<boolean> => {
  try {
    const _date = new Date(timestamp)
    return _date instanceof Date && !isNaN(_date.valueOf())
  } catch (error) {
    console.error(error)
    return false
  }
}

export const isEmpty = (str: string): boolean => {
  if (!str) return true
  if (str.trim() === '') return true
  else return false
}

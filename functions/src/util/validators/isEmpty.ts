export const isEmpty = (value: string | number): boolean => {
  if (!value) return true
  if (typeof value === 'string' && value.trim() === '') return true
  else return false
}

export const clone = val => {
  if (typeof val === 'object') {
    return Object.assign({}, val)
  }
  return val
}

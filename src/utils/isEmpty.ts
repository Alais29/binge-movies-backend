export const isEmpty = (value: unknown) => {
  if (value) {
    switch (typeof value) {
      case 'string':
        if (value !== '' && value !== 'null' && value !== 'undefined') {
          return false
        }
        return true
      case 'number':
        return false
      case 'object':
        if (JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
          return true
        }
        return false
      default:
        return true
    }
  }
  return true
}

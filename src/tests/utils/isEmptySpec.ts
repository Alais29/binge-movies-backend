import { isEmpty } from '@/utils/isEmpty'

describe('isEmpty:', () => {
  it('should return true for null or undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })
  it('should return true for an empty string, array or object', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })
  it('should return false for a non empty string, array or object', () => {
    expect(isEmpty('test')).toBe(false)
    expect(isEmpty('   test')).toBe(false)
    expect(isEmpty('    ')).toBe(false)
    expect(isEmpty(['test', 'test1', 'test2', 'test4'])).toBe(false)
    expect(isEmpty(['test', 231, true, { name: 'John' }])).toBe(false)
    expect(isEmpty({ name: 'John' })).toBe(false)
  })
})

import { debounce } from './debounce'

describe('debounce', () => {
  test('back must be function', () => {
    const addCount = () => {
      count += 1
    }
    const timer = debounce(addCount, 500)
    expect(typeof timer).toBe('function')
  })
})
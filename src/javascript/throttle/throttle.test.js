import { throttle } from './throttle'
import { sleep } from '../utils/index'

describe('throttle', () => {
  test('when less than interval, will throttle', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }
    
    const timer = setInterval(throttle(addCount, 400), 200)

    /**
     * 400 -> 1
     * 800 -> 2
     */

    setTimeout(() => {
      clearInterval(timer)
    }, 1000)

    await sleep(1500)

    expect(count).toBe(2)
  })

  test('when greater than interval, normally call', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }
    
    const timer = setInterval(throttle(addCount, 200), 300)

    /**
     * 300 -> 1
     * 600 -> 2
     * 900 -> 3
     */
    setTimeout(() => {
      clearInterval(timer)
    }, 1000)

    await sleep(1500)

    expect(count).toBe(3)
  })

  
})
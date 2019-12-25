import { debounce } from './debounce'
import { sleep } from '../utils/index'

describe('debounce', () => {
  test('when front debounce, call debounce immediately', async () => {
    // 全局变量，addCount执行会改变count的值
    let count = 0
    const addCount = () => {
      count += 1
    }

    // set immediate true
    const timer = setInterval(debounce(addCount, 500, true), 200)

    setTimeout(() => {
      clearInterval(timer)
    }, 1000)

    // 等待timer执行
    await sleep(200)

    expect(count).toBe(1)
  })

  test('when back debounce, not call debounce immediately', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }

    const timer = setInterval(debounce(addCount, 500), 200)

    setTimeout(() => {
      clearInterval(timer)
    }, 1000);

    await sleep(300)

    expect(count).toBe(0)
  })

  test('front debounce: when less than interval, could just call only once', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }

    const timer = setInterval(debounce(addCount, 500, true), 200)
    setTimeout(() => {
      clearInterval(timer)
    }, 1000)
    await sleep(1500)
    expect(count).toBe(1)
  })

  test('front debounce: when genter than interval, could more than once', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }

    // 200: interval time
    const timer = setInterval(debounce(addCount, 200, true), 400)
    // clear interval, avoid call endlessly
    setTimeout(() => {
      clearInterval(timer)
    }, 1000)
    await sleep(1500)
    /**
     * 400 -> 1
     * 800 -> 2
     */
    expect(count).toBe(2)
  })

  test('back debounce: when less than interval, could just call once', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }

    // 200: interval time
    const timer = setInterval(debounce(addCount, 500), 200)
    // clear interval, avoid call endlessly
    setTimeout(() => {
      clearInterval(timer)
    }, 1000)
    await sleep(1500)
    /**
     * 400 -> 1
     * 800 -> 2
     */
    expect(count).toBe(1)
  })

  test('back debounce: when greater than interval, could call more than once', async () => {
    let count = 0
    const addCount = () => {
      count += 1
    }

    // 200: interval time
    const timer = setInterval(debounce(addCount, 200), 400)
    // clear interval, avoid call endlessly
    setTimeout(() => {
      clearInterval(timer)
    }, 1000)
    await sleep(1500)
    /**
     * 400 -> 1
     * 800 -> 2
     */
    expect(count).toBe(2)
  })
})
import Promise from './promise'
import { sleep } from '../utils/index'

// ref: https://github.com/promises-aplus/promises-tests
describe('Promise', () => {
  // global time
  // const time = 500

  // test('take a function as an argument', () => {
  //   expect(() => {
  //     new Promise(1)
  //   }).toThrowError('is not a function')
  // })

  test('return a promise instance, exposed the public API', () => {
    const promise = new Promise(function (resolve, reject) {
      // random return resolve or reject
      +new Date() % 2 === 0 ? resolve() : reject()
    })

    expect(promise).toHaveProperty('then')
    // expect(promise).toHaveProperty('catch')
    // expect(promise).toHaveProperty('finally')
  })

  // // done 回调测试异步代码
  // test('promise then, onFullfilled', done => {
  //   const promise = new Promise(function(resolve) {
  //     setTimeout(() => {
  //       resolve(time)
  //     }, time)
  //   })
  //   promise.then(ms => {
  //     expect(ms).toBe(time)
  //     done()
  //   })
  // })

  // // done 回调测试异步代码
  // test('promise then, onRejected', done => {
  //   const promise = new Promise(function(resolve, reject) {
  //     setTimeout(() => {
  //       reject(time)
  //     }, time)
  //   })
  //   promise.then(ms => {
      
  //   }, reason => {
  //     // onRejected
  //     expect(reason).toBe(time)
  //     done()
  //   })
  // })

  // // test('promise.catch', done => {
  // //   const promise = new Promise(function(resolve, reject) {
  // //     setTimeout(() => {
  // //       reject(time)
  // //     }, time)
  // //   })
  // //   promise.then(ms => {
  // //     // onFullfilled
  // //   }).catch(reason => {
  // //     expect(reason).toBe(time)
  // //     done()
  // //   })
  // // })

  // // test('promise.finally', done => {

  // // })
  // test('chain call, onFullfilled', done => {
  //   new Promise(function(resolve) {
  //     setTimeout(() => {
  //       resolve(time)
  //     }, time)
  //   }).then(ms => {
  //     return new Promise(function (resolve) {
  //       setTimeout(() => {
  //         resolve(ms + time)
  //       }, time)
  //     })
  //   }).then(total => {
  //     expect(total).toBe(time * 2)
  //     done()
  //   })
  // })

  // test('chain call, onRejected', done => {
  //   new Promise(function(resolve, reject) {
  //     setTimeout(() => {
  //       reject(time)
  //     }, time)
  //   }).then(ms => {
  //     return new Promise(function(resolve) {
  //       setTimeout(() => {
  //         resolve(ms + time)
  //       }, time)
  //     })
  //   }).then(total => {
  //     return new Promise(function(resolve) {
  //       setTimeout(() => {
  //         resolve(total + time)
  //       }, time)
  //     })
  //   }).catch(reason => {
  //     expect(reason).toBe(time)
  //   })
  // })

  // test('can only change status once, can not from fulfilled to rejected', async () => {
  //   let result = ''
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(time)
  //       // 再改变一次状态
  //       setTimeout(() => {
  //         reject(time)
  //       }, 0)
  //     }, time)
  //   })
    
  //   promise.then(() => {
  //     result += '_fulfilled_'
  //   }).catch(() => {
  //     result += '_rejected_'
  //   })

  //   await sleep(2000)
  //   // 不是同时执行then和catch, 也就是说不能同时把状态变为fulfilled再变为rejected
  //   expect(result).not.toBe('_fulfilled__rejected_')
  //   expect(result).toBe('_fulfilled_')
  // })

  // test('can only change status once, can not from rejected to fulfilled', async () => {
  //   let result = ''
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject(time)
  //       // 再改变一次状态
  //       setTimeout(() => {
  //         resolve(time)
  //       }, 0)
  //     }, time)
  //   })
    
  //   promise.then(() => {
  //     result += '_fulfilled_'
  //   }).catch(() => {
  //     result += '_rejected_'
  //   })

  //   await sleep(2000)
  //   // 不是同时执行then和catch, 也就是说不能同时把状态变为fulfilled再变为rejected
  //   expect(result).not.toBe('_rejected__fulfilled_')
  //   expect(result).toBe('_rejected_')
  // })

  // test('Promise.resolve', done => {
  //   Promise.resolve(1).then(num => {
  //     expect(num).toBe(1)
  //     done()
  //   })
  // })

  // test('Promise.reject', done => {
  //   Promise.reject(1).catch(num => {
  //     expect(num).toBe(1)
  //     done()
  //   })
  // })
  
})
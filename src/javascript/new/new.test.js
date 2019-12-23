import { objectFactory } from './new'

describe('new', () => {
  test('take a function as an argument', () => {
    const constructor = 123
    function excute() {
      objectFactory(constructor)
    }

    expect(excute).toThrowError('constructor needed to be argument')
  })

  test('create a instance', () => {
    function Constructor(name, age) {
      this.name = name
      this.age = age
    }
    Constructor.prototype.getName = function() {
      return this.name
    }

    const ins = objectFactory(Constructor, 'revan', 18)
    // 原生
    const _ins = new Constructor('revan', 18)

    expect(ins.name).toBe(_ins.name)
    expect(ins.age).toBe(_ins.age)
    expect(ins.getName()).toBe(_ins.getName())
  })

  test('if return primitive value, return the newly instance', () => {
    function Constructor(name, age) {
      this.name = name
      this.age = age

      return 123
    }
    Constructor.prototype.getName = function() {
      return this.name
    }

    const ins = objectFactory(Constructor, 'revan', 18)
    // 原生
    const _ins = new Constructor('revan', 18)

    expect(ins.name).toBe(_ins.name)
    expect(ins.age).toBe(_ins.age)
    expect(ins.getName()).toBe(_ins.getName())
  })

  test('if return object, return the object', () => {
    function Constructor(name, age) {
      this.name = name
      this.age = age

      return 123
    }
    Constructor.prototype.getName = function() {
      return this.name
    }

    const ins = objectFactory(Constructor, 'revan', 18)
    // 原生
    const _ins = new Constructor('revan', 18)

    expect(ins.name).toBe(_ins.name)
    expect(ins.age).toBe(_ins.age)
    // return the object
    expect(ins.getName).toBe(_ins.getName)
  })
})

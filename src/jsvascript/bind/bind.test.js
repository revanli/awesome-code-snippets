import bind from './bind'

describe('Function.prototype.bind', () => {
  Function.prototype._bind = bind

  test('change the direction of this, return a function, excute success', () => {
    const foo = {
      value: 1
    }

    function bar(age1, age2) {
      age1 = age1 || 0
      age2 = age2 || 0
      return this.value + age1 + age2
    }

    const newBar = bar._bind(foo, 3)
    expect(typeof newBar).toBe('function')
    expect(newBar(2)).toBe(bar.bind(foo, 3)(2));
  })
})
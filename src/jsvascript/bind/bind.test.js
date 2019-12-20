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

  test('use return function as constructor, \'this\' points to the instance object ', () => {
    const foo = { value: 1 }
    function bar(name, age) {
      this.name = name
      this.age = age
    }
    // 原函数的远行对象的属性
    bar.prototype.friend = 'revan'

    const bindFoo = bar.bind(foo);  // 
    const bindFoo2 = bar._bind(foo);
    bindFoo2.prototype.address = 1;   // 修改返回函数的原型对象，增加属性

    // 验证返回函数作为构造函数，实例对象会从原函数的原型对象上继承属性
    expect(new bindFoo2().friend).toBe(new bindFoo().friend);

    // 验证返回函数作为构造函数，之前绑定的 this 对象会失效， this 会指向
    // 实例对象
    expect(new bindFoo2().value).toBe(undefined);
    expect(new bindFoo2().value).toBe(new bindFoo().value);

    // 验证修改返回函数的原型对象，不会引起原始函数 bar 原型对象的修改
    expect(bar.prototype.address).toBe(undefined)
  })

  test('when \'this\' argument is null or undefined, \'this\' points to window', () => {
    window.value = 2;

    function bar(age1, age2) {
      age1 = age1 || 0;
      age2 = age2 || 0;
      return this.value + age1 + age2;
    }

    expect(bar._bind(null, 3)(1)).toBe(6)
    expect(bar._bind(undefined, 3)(1)).toBe(6)
  })

})
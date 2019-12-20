import apply from './apply';

describe('Function.prototype.apply', () => {
  Function.prototype._apply = apply;

  test('change the direction of this', () => {
    const foo = {
      value: 1
    };
    function bar() {
      return this.value;
    }

    // 和原生的 apply 进行校验
    expect(bar._apply(foo)).toBe(bar.apply(foo));
  });

  test('when \'this\' argument is null or undefined', () => {
    window.value = 1;

    function bar() {
      return this.value;
    }

    expect(bar._apply(null)).toBe(1);
    expect(bar._apply(undefined)).toBe(1);
  });

  test('should return value if function has return value', () => {
    var obj = {
      value: 1
    };

    function bar(name, age) {
      return {
        value: this.value,
        name: name,
        age: age
      };
    }

    expect(bar._apply(obj, ['revan', 18])).toStrictEqual(bar.apply(obj, ['revan', 18]));
  });

  test('when \'this\' is other primitive value, excute success', () => {
    function bar() {
      return this.length;
    }

    // 和原生的 apply 操作进行比较验证
    expect(bar._apply('123')).toBe(bar.apply('123'));
  });

  test('when \'runArg\' is not array like object, will throw an error', () => {
    const foo = {
      value: 1,
    };
    function bar(name, age) {
      return `${name}: ${age}`;
    }
    const excute = function () {
      // 后面传入的参数不是一个类数组
      bar._apply(foo, 'revan', 18);
    };

    expect(excute).toThrowError('CreateListFromArrayLike called on non-object');
  });

  test('when assign multiple arguments, only the first one will be get', () => {
    const numbers = [5, 6, 2, 3, 7];

    const max = Math.max.apply(null, numbers, [10, 11, 12]);
    const max2 = Math.max._apply(null, numbers, [10, 11, 12]);

    expect(max2).toBe(7);
    expect(max2).toBe(max);
  })

})
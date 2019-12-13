import call from './call';

describe('Function.prototype.call', () => {
  
  Function.prototype._call = call;

  test('change the direction of this', () => {
    const foo = {
      value: 1
    };
    function bar() {
      return this.value;
    }

    // 和原生的call对比
    expect(bar._call(foo)).toBe(bar.call(foo));
  });

  test('when \'this\' argument is null or undefined', () => {
    window.value = 1;

    function bar() {
      return this.value;
    }

    expect(bar._call(null)).toBe(1);
    expect(bar._call(undefined)).toBe(1);
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

    expect(bar._call(obj, 'revan', 18)).toStrictEqual(bar.call(obj, 'revan', 18));
  });
});
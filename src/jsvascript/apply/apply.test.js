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

  // test('should return value if function has return value', () => {
  //   var obj = {
  //     value: 1
  //   };

  //   function bar(name, age) {
  //     return {
  //       value: this.value,
  //       name: name,
  //       age: age
  //     };
  //   }

  //   expect(bar._call(obj, 'revan', 18)).toStrictEqual(bar.call(obj, 'revan', 18));
  // });


})
export default function (context, arr) {
  var context = context ? Object(context) : window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    if (!Array.isArray(arr)) {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}
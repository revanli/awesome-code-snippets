define(function (require) {
  var request = require('request');
  request.getTypeInfo().then(function (resp) {
    console.log(resp)
  })
})
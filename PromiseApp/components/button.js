define(function (require) {
  var Dialog = require('dialog');

  $('button.aspect').on('click', function () {
    Dialog({
      title: '友情提示',
      content: '出门逛逛吧出门逛逛吧'
    }).show().then(function () {
      console.log('点击了确认按钮');
    }).catch(function () {
      console.log('点击了取消按钮');
    })
  })
})
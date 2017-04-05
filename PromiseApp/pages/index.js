requirejs.config({
  baseUrl: './',
  paths: {
    jquery: './libs/jquery-3.2.0',
    API: './libs/API',
    request: './libs/request',
    calendar: './components/calendar',
    imageCenter: './components/imageCenter',
    dialog: './components/Dialog'
  }
})

define(function (require) {
  var $ = require('jquery');
  var imageCenter = require('imageCenter');
  var imageWrapList = document.querySelectorAll('.img-center');

  require('calendar');
  require('./components/button');
  imageCenter(imageWrapList, 'wspectFill');
})
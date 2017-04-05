define(function(require) {
  var API = require('API');
  var $ = require('jquery');

  getDayInfo = function () {
    return $.get(API.dayInfo);
  }

  getTypeInfo = function () {
    return $.get(API.typeInfo);
  }

  return {
    getDayInfo: getDayInfo,
    getTypeInfo: getTypeInfo
  }
});
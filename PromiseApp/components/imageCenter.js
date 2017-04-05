define(function (require) {

  var imageLoad = function (img) {
    return new Promise(function (resolve, reject) {
      // img complete is true , image load complete and save in cache
      if (img.complete) {
        resolve()
      } else {
        img.onload = function (event) {
          resolve(event);
        }

        img.onerror = function (err) {
          reject(err);
        }
      }
    })
  }

  var imageCenter = function (domList, mode) {
    domList.forEach(function (item) {
      var img = item.children[0];
      var itemW = item.offsetWidth;
      var itemH = item.offsetHeight;
      var itemR = itemW /itemH;

      imageLoad(img).then(function () {
        var imgW = img.naturalWidth;
        var imgH = img.naturalHeight;
        var imgR = imgW / imgH;

        switch (mode) {
          case 'aspectFill':
            resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
            break;
          case 'wspectFill':
            resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y';
            break;
          default:
        }

        $(img).addClass(resultMode);
      })
    })
  }

  return imageCenter;
})
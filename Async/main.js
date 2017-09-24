/**
 * @Date 2017-09-24
 */

// Promise approach
function getJSON () {
  return new Promise( function (resolve) {
    axios.get('https://tutorialzine.com/misc/files/example.json')
      .then(function (json) {
        resolve(json);
      })
  })
}

async function getJSONAsync () {
  let json = await axios.get('https://tutorialzine.com/misc/files/example.json');
  return json;
}

getJSONAsync().then(function (result) {
  // Do something 
  console.log(result);
})

async function getABC () {
  let A = await getValueA();
  let B = await getValueB();
  let C = await getValueC();

  return A * B * C;
}
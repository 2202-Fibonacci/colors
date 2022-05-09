const APIkey = require("../.env");
const Mta = require("mta-gtfs");
const mta = new Mta({
  key: APIkey,
});

// gets ids, name, lat/long for all subway stops
mta
  .stop()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });


// gets info for a specific stop from id or array of ids
// mta.stop("S16").then(function (result) {
//   console.log(result);
// });
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {
  
  //set it so it only outputs more infrequently
  accel.setOutputRate(2, function (err) {
    console.error(err);
  });

  //printing out the z value
  accel.on('data', function (xyz) {
    console.log('xyz', xyz)
    var zArray=[];
    var counter = 0;

    while (counter <= 100){
      if(counter === 100){

        var z=xyz[2]; 
        console.log('just z ' + z);
        zArray.push(z);
        counter = 0;
      }

      console.log(counter);
      counter++;
    }
     
  });


  //'x:', xyz[0].toFixed(2),
  //   'y:', xyz[1].toFixed(2),
  //   'z:', xyz[2].toFixed(2));

});



accel.on('error', function (err) {
  console.log('Error:', err);
});

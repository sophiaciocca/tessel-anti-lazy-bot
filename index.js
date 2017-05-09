var av = require('tessel-av');
var sound = new av.Speaker(mp3);
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var path = require('path');
var mp3 = path.join(__dirname, 'motivation.mp3');
console.log('This is MP3', mp3);
var sound = new av.Speaker(mp3);

//AUDIO PART--------------------
//sound.play();


//ACCELEROMETER PART------------------

var z = 0;

let isPlaying = false;

// Initialize the accelerometer.
accel.on('ready', function () {
  
  //listening for when track ends (when it does, set isPlaying to false)
  sound.on('ended', function() {
    console.log('It is playing!');
    isPlaying = false;
  })

  //set it so it only outputs more infrequently
  accel.setOutputRate(2, function (err) {
    console.error(err);
  });

  //get the z values from each call
  accel.on('data', function (xyz) {
    console.log('xyz', xyz)

    var counter = 0;

    while (counter <= 100){
      if(counter === 100){

        z=xyz[2]; 
        console.log('just z ' + z);

        //if it's >1:
        if (z > .9 || z < -.9) {

          //check if it's already playing. if not, play it and set "is playing" to true:
          if (!isPlaying) {
            sound.play();
            isPlaying = true;
          }

        }

      }
      counter++;
    }//end of while loop
     
  });

/*
  
  //if it's >1:
-------check if is already playing (isPlaying===true)? 
              if it is, do nothing
              if it isn't:
                  start audio track
                  set bool isPlaying to true
                  
    listen for ".stop" (make listener -- so that when track ends, it stops)



  */



});



accel.on('error', function (err) {
  console.log('Error:', err);
});
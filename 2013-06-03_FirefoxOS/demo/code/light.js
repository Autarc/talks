(function(){

  var rumble   = document.getElementById('rumble'),
      feedback = document.getElementById('feedback'),
      counter  = document.getElementById('counter');

  win.addEventListener( 'devicelight', function ( e ) {

    var lux = e.value;

    counter.textContent = lux;

    console.log(lux);


    if ( lux < 10 ) {

      // start vibration
      navigator.vibrate( config.duration );

    } else {

      // stop vibration
      navigator.vibrate(0);
    }

  });

})();

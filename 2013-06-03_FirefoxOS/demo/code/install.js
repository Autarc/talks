(function(){

  /** keep install button hidden **/
  if ( !win.apps ) return;

  var addr = location.protocol + '//' + location.host + location.pathname + 'manifest.webapp',

      req  = apps.checkInstalled( addr );

      // req = apps.getSelf(); // same ?


  req.addEventListener( 'error', function ( err ) {

    alert('Error: Couldn\'t check for installation!', err );
  });



  req.addEventListener( 'success', function(){

    if ( req.result ) return; // already installed

    var button = document.getElementById('install-button');

    button.classList.remove('hidden');

    button.addEventListener( select, function(){

      /** receives the current application installed for this domain **/

      // req = apps.getSelf();

      // req.addEventListener( 'success', function(){

      //   console.log(this.result);

      //   if ( this.result ) return;

        req = apps.install( addr );

        req.addEventListener( 'success', function(){

          console.log('Installed on the system!');
        });

        req.addEventListener( 'error', function(){

          console.log('Install failed: ', this.error );
        });
      // });

    });

  });

})();

(function(){


  fillNumbers();

  referLinks();

  openLinks();


  // -- //

  function fillNumbers(){

    var slides = document.querySelectorAll('.js-slide-no');

    for ( var i = 0, l = slides.length; i < l; i++ ) slides[i].textContent = i;
  }


  // -- //

  function referLinks(){

    var links = document.querySelectorAll('a');

    for ( var i = 0, l = links.length; i < l; i++ ) links[i].target = '_blank';
  }


  // -- //

  function openLinks(){

    document.body.addEventListener( 'click', function ( e ) {

      var el   = e.target,
          type = el.tagName.toLowerCase();

      if ( el.classList.contains('no-popup') ) return;

      e.preventDefault();
      e.stopPropagation();

      if ( type === 'img' && !el.classList.contains('no-border')                  ) openImage( el );
      if ( type === 'a'   || ( el = el.parentNode ).tagName.toLowerCase() === 'a' ) openPopup( el );
    });


    function openPopup ( el ) {

      var winWidth  = window.innerWidth,
          winHeight = window.innerHeight,

          src    = el.href,

          width  = window.outerWidth/4 * 3,
          height = window.outerHeight/4 * 3,

          centerX = winWidth /2 - width /2,
          centerY = winHeight/2 - height/2;

      open( src, width, height, centerX, centerY );
    }


    function openImage ( el ) {

      var winWidth  = window.innerWidth,
          winHeight = window.innerHeight,

          src    = el.src,

          ratio  = el.naturalWidth / el.naturalHeight,

          width  = el.getAttribute('width')  ? winWidth  : ratio * winHeight,
          height = el.getAttribute('height') ? winHeight : ratio * winWidth,

          centerX = winWidth /2 - width /2,
          centerY = winHeight/2 - height/2;

      open( src, width, height, centerX, centerY );
    }


    function open ( src, width, height, centerX, centerY ) {

      window.open( src, 'image_' + Date.now(),
                  'status=no, toolbar=no, location=no, menubar=no,\
                   scroolbars=no,resizeable=no, personalbar=no, chrome=yes\
                   height=' + height + ', width=' + width + ',\
                   top=' + centerY + ', left=' + centerX
                  );
    }

  }

  // -- //

})();

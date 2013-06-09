/** global **/

var win    = window,

    select = ( 'ontouchstart' in win.document ) ? 'touchend' : 'click';



/** adapter **/

if ( !win.apps ) {

  win.apps = win.navigator.mozApps;
}




/** detect **/



/** specific **/

win.config = {

  duration: 5000//1000000
};

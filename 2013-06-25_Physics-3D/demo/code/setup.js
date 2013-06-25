(function(){

  // define default values
  ph.setup.init();


  // update process
  ph.render();

})();


 var world, mass, body, shape, ,
         camera, scene, renderer, geometry, material, mesh;



pg.setup = (function(){

  function init(){

    initializeCannon();
    initializeThree();
  }


  function initializeCannon(){

    var world = new CANNON.World();
    world.gravity.set( 0, 0, 0 );
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    var shape = new CANNON.Box( new CANNON.Vec3( 1, 1, 1 ) ),
        body  = new CANNON.RigidBody( 1, shape ); // 1 = mass

    body.angularVelocity.set( 0, 10, 0);
    body.angularDamping = 0.5;
    world.add( body );
  }

  function initializeThree(){

    var scene  = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

    camera.position.z = 5;
    scene.add( camera );

    var geometry = new THREE.CubeGeometry( 2, 2, 2 ),
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } ),
        mesh     = new THREE.Mesh( geometry, material );

    // enabled to use Querternions
    mesh.useQuaternion = true;
    scene.add( mesh );

    var renderer = new THREE.CanvasRenderer();

    var panel = getElementById('panel');

    console.log( panel.offsetLeft );
    console.log( panel.offsetTop );
    renderer.setSize( window.innerWidth, window.innerHeight );

    panel.appendChild( renderer.domElement );
  }

  return { init: init };

})();

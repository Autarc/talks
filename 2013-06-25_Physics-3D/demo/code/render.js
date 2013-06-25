ph.render = (function(){

  var diff = 1/60;

  function loop(){


    render();
  }

  function render(){

    update();
    draw();

    requestAnimationFrame( render );
  }


  function update(){

    // Step in the physical world
    world.step( diff ); // timestep

    // Copy coordinates from Cannon.js to Three.js
    body.position.copy(mesh.position);
    body.quaternion.copy(mesh.quaternion);
  }
//world, body, mesh, scene, camera, renderer


  function draw(){

    renderer.render( scene, camera );
  }


  return loop;

})();

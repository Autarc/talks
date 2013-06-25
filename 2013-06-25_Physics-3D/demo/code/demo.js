var world = new CANNON.World();
world.gravity.set(0,0, -9.82); // m/s²
world.broadphase = new CANNON.NaiveBroadphase();

var mass = 1, radius = 1;   // mass: 5kg
var sphereShape = new CANNON.Sphere(radius); // Step 1
var sphereBody = new CANNON.RigidBody(mass,sphereShape); // Step 2
sphereBody.position.set(0,0,10);

world.add(sphereBody); // Step 3

var groundShape = new CANNON.Plane();
var groundBody  = new CANNON.RigidBody( 0, groundShape );
world.add( groundBody );

var groundShape = new CANNON.Plane();
var groundBody = new CANNON.RigidBody(0,groundShape);
world.add(groundBody);

world.solver.iterations = 2;


var timeStep = 1.0 / 60.0; // seconds

for (var i = 0; i < 60; ++i){
  world.step(timeStep);
  console.log(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
}


/**
* Demonstrates how to make several materials with different friction properties.
*/

var demo = new CANNON.Demo(), size = 1.0;

demo.addScene("Friction",function(){
var shape = new CANNON.Box(new CANNON.Vec3(size,size,size));

// Create world
var world = demo.getWorld();
world.broadphase = new CANNON.NaiveBroadphase();
world.iterations = 10;

// Materials
var groundMaterial = new CANNON.Material("groundMaterial");


var ground_ground_cm = new CANNON.ContactMaterial(groundMaterial,
                                                  groundMaterial,
                                                  0.4, // friction coefficient
                                                  0.3  // restitution
                                                  );
// Adjust constraint equation parameters for ground/ground contact
ground_ground_cm.contactEquationStiffness = 1e8;
ground_ground_cm.contactEquationRegularizationTime = 3;
ground_ground_cm.frictionEquationStiffness = 1e8;
ground_ground_cm.frictionEquationRegularizationTime = 3;

// Add contact material to the world
world.addContactMaterial(ground_ground_cm);

// ground plane
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.RigidBody(0,groundShape,groundMaterial);
world.add(groundBody);
demo.addVisual(groundBody);

// Create a slippery material (friction coefficient = 0.0)
var slipperyMaterial = new CANNON.Material("slipperyMaterial");

// The ContactMaterial defines what happens when two materials meet.
// In this case we want friction coefficient = 0.0 when the slippery material touches ground.
var slippery_ground_cm = new CANNON.ContactMaterial(groundMaterial,
                                                    slipperyMaterial,
                                                    0.0, // friction coefficient
                                                    0.3  // restitution
                                                    );
// Adjust constraint equation parameters
slippery_ground_cm.contactEquationStiffness = 1e8;
slippery_ground_cm.contactEquationRegularizationTime = 3;

// We must add the contact materials to the world
world.addContactMaterial(slippery_ground_cm);

// Create slippery box
var boxBody = new CANNON.RigidBody(1,shape,slipperyMaterial);
boxBody.position.set(0,0,5);
world.add(boxBody);
demo.addVisual(boxBody);

// Create box made of groundMaterial
var boxBody2 = new CANNON.RigidBody(10,shape,groundMaterial);
boxBody2.position.set(size*4,0,5);
world.add(boxBody2);
demo.addVisual(boxBody2);

// Change gravity so the boxes will slide along x axis
world.gravity.set(-3,0,-60);
});

demo.start();

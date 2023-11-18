import * as CANNON from 'cannon-es';

// Create a Cannon.js world
const world = new CANNON.World();
world.gravity.set(0, -9.81, 0); // Set gravity

// Set up a fixed time step for physics calculations
const timeStep = 1 / 60;

// Allow sleeping of objects for better performance
world.allowSleep = true;

// Set the default contact material (how objects respond to contact)
const defaultMaterial = new CANNON.Material();
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.3, // Friction between materials
    restitution: 0.3, // Restitution (bounciness)
  }
);
world.addContactMaterial(defaultContactMaterial);

// Example: Adding a ground plane
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // Make it horizontal
world.addBody(groundBody);

// Example: Adding a box
const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
const boxBody = new CANNON.Body({ mass: 1, shape: boxShape });
boxBody.position.set(0, 5, 0); // Set initial position
world.addBody(boxBody);

// Update the world in your animation loop
function updatePhysics() {
  world.step(timeStep);
}

// Call updatePhysics in your animation loop to advance the physics simulation

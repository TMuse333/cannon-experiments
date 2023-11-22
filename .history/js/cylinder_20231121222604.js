import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function cylinder(scene, world) {
  // Cannon.js parameters
  const cylinderRadiusTop = 5;
  const cylinderRadiusBottom = 0.1;
  const cylinderHeight = 3;
  const cylinderNumSegments = 8;

  const cannonShape = new CANNON.Cylinder(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderNumSegments
  );

  // Cannon.js body
  const cylinderMat = new CANNON.Material();
  const cylinderBody = new CANNON.Body({
    mass: 4,
    shape: cannonShape,
    position: new CANNON.Vec3(0, 10, 0), // Adjust position as needed
    material: cylinderMat,
  });

  world.addBody(cylinderBody);

  // Three.js visualization
  const threeGeometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderNumSegments
  );

  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Adjust color as needed
  const cylinderMesh = new THREE.Mesh(threeGeometry, material);

  // Add the Three.js mesh to your scene
  scene.add(cylinderMesh);

  // Add userData to make the cylinder clickable
  cylinderMesh.userData.clickable = true;

  // Set up the raycaster for the cylinder
  const objectsToInteract = [cylinderMesh];
  const cleanupRaycaster = createRaycaster(camera, scene, renderer, objectsToInteract, onCylinderClick);

  function onCylinderClick(clickedObject) {
    console.log('Cylinder clicked!');

    if (clickedObject === cylinderMesh) {
      // Apply an impulse to the cylinder in the y-direction
      cylinderBody.applyImpulse(new CANNON.Vec3(0, 5, 0), cylinderBody.position);
    }
  }

  function animateCylinder() {
    // Update the cylinder's position and rotation
    cylinderMesh.position.copy(cylinderBody.position);
    cylinderMesh.quaternion.copy(cylinderBody.quaternion);
  }

  return {
    mesh: cylinderMesh,
    body: cylinderBody,
    animateCylinder,
  };
}

// Function to create a raycaster (you may already have this in your raycaster.js file)
function createRaycaster(camera, scene, renderer, objects, onClick) {
  // Implementation of your raycaster setup
  // ...

  // Return a cleanup function
  return function cleanupRaycaster() {
    // Cleanup logic, such as removing event listeners
    // ...
  };
}

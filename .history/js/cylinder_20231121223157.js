import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function cylinder(scene, world) {
  // Cannon.js parameters
  const cylinderRadiusTop = 0.01;
  const cylinderRadiusBottom = 3;
  const cylinderHeight = 4;
  const cylinderNumSegments = 16;

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
function createRaycaster() {
  // Implementation of your raycaster setup
  // ...

  // Return a cleanup function
  return function cleanupRaycaster() {
    // Cleanup logic, such as removing event listeners
    // ...
  };
}

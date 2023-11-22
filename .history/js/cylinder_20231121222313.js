import * as THREE from 'three';
import * as CANNON from 'cannon-es';


export function cylinder(scene){



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

// Three.js visualization
const threeGeometry = new THREE.CylinderGeometry(
  cylinderRadiusTop,
  cylinderRadiusBottom,
  cylinderHeight,
  cylinderNumSegments
);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff0f }); // Adjust color as needed
const threeMesh = new THREE.Mesh(threeGeometry, material);

// Add the Three.js mesh to your scene
scene.add(threeMesh);

}

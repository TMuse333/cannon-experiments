// Import necessary libraries
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Function to convert a Cannon.js shape to a Three.js mesh
export const cannonShapeToThreeMesh = (cannonShape) => {
  const geometry = cannonShapeToThreeGeometry(cannonShape);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

// Function to convert a Cannon.js shape to a Three.js geometry
const cannonShapeToThreeGeometry = (cannonShape) => {
  if (cannonShape instanceof CANNON.Box) {
    const halfExtents = cannonShape.halfExtents;
    return new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
  } else if (cannonShape instanceof CANNON.Sphere) {
    const radius = cannonShape.radius;
    return new THREE.SphereGeometry(radius, 32, 32);
  } else if (cannonShape instanceof CANNON.ConvexPolyhedron) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cannonShape.vertices), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(cannonShape.faces), 1));
    return geometry;
  } else {
    console.warn('Unsupported Cannon.js shape type:', cannonShape.constructor.name);
    return new THREE.BoxGeometry(); // Default to a box geometry
  }
};

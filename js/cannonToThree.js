// Import necessary libraries
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Function to convert a Cannon.js shape to a Three.js mesh
export const cannonShapeToThreeMesh = (cannonShape) => {
  const geometry = cannonShapeToThreeGeometry(cannonShape);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000, flatShading: true });
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

    // Convert vertices to Three.js BufferAttribute
    const vertices = new Float32Array(cannonShape.vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    return geometry;
  } else {
    console.warn('Unsupported Cannon.js shape type:', cannonShape);
    return new THREE.BoxGeometry(); // Default to a box geometry
  }
};

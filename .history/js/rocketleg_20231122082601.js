import * as THREE from 'three';

// Function to create a bent cylinder geometry
export function createBentCylinderGeometry(radius, height, bendRadius, segments,scene) {
  const geometry = new THREE.Geometry();

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI; // Angle in radians

    const x = bendRadius * Math.sin(theta);
    const y = height / 2 + bendRadius * (1 - Math.cos(theta));
    const z = radius * Math.cos(theta);

    geometry.vertices.push(new THREE.Vector3(x, y, z));
  }

  return geometry;
}

// Create a material for the bent cylinder
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });

// Set parameters for the bent cylinder
const radius = 1;
const height = 4;
const bendRadius = 2;
const segments = 32;

// Create the bent cylinder geometry
const bentCylinderGeometry = createBentCylinderGeometry(radius, height, bendRadius, segments);

// Create a mesh using the geometry and material
const bentCylinderMesh = new THREE.Mesh(bentCylinderGeometry, material);

// Add the mesh to the scene
scene.add(bentCylinderMesh);

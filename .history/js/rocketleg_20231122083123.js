import * as THREE from 'three';

// Function to create a bent cylinder geometry
export function createBentCylinderGeometry(radius, height, bendRadius, segments) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI; // Angle in radians

    const x = bendRadius * Math.sin(theta);
    const y = height / 2 + bendRadius * (1 - Math.cos(theta));
    const z = radius * Math.cos(theta);

    positions.push(x, y, z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  return geometry;
}

// Function to create a leg
export function createLeg(scene) {
  const legGeometry = createBentCylinderGeometry(0.1, 1, 0.5, 32);
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff0f }); // Green color
  const legMesh = new THREE.Mesh(legGeometry, legMaterial);
  
  // Adjust the leg position as needed
  legMesh.position.set(0, 0, 0);
  
  scene.add(legMesh);
}

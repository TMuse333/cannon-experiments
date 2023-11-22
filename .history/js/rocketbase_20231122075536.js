import * as THREE from 'three';

export function createBase(scene) {
  // Create a group to hold the cylinder and cone
  const group = new THREE.Group();

  // Create a cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Set color to blue
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  group.add(cylinder);

  // Create a cone
  const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Set color to blue
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.y = 2 + cone.geometry.parameters.height / 2; // Increase y-position
  group.add(cone);

  group.position.y 

  // Add the group to the scene
  scene.add(group);
}

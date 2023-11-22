import * as THREE from 'three';

export function createBase(){

// Create a group to hold the cylinder and cone
const group = new THREE.Group();

// Create a cylinder
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
group.add(cylinder);

// Create a cone
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = 1 + cone.geometry.parameters.height / 2;
group.add(cone);

// Add the group to the scene
scene.add(group);

}
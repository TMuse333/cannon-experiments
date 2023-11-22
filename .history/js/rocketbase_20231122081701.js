import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createBase(scene, world) {
  // Create a group to hold the cylinder and cone
  const group = new THREE.Group();

  // Create a taller cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 4, 32); // Set height to 4
  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Set color to blue
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  group.add(cylinder);

  // Create a cone
  const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Set color to blue
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  
  // Position the cone at the very top of the cylinder
  cone.position.y = cylinder.geometry.parameters.height / 2 + cone.geometry.parameters.height / 2;
  
group.position.y +=5

  group.add(cone);

  const combinedBody = new CANNON.Body({ mass: 1 });

  const cylinderShape = new CANNON.Cylinder(1, 1, 4, 32);
  const coneShape = new CANNON.Cylinder(0, 1, 2, 32);
  
  // Position the cone on top of the cylinder
  const coneOffset = new CANNON.Vec3(0, cylinderShape.height / 2 + coneShape.height / 2, 0);
  
  // Add shapes to the body with their respective offsets and orientations
  combinedBody.addShape(cylinderShape, new CANNON.Vec3(0, 0, 0)); // Cylinder shape at the center
  combinedBody.addShape(coneShape, coneOffset); // Cone shape with the calculated offset
  
  world.addBody(combinedBody);
  scene.add(group);
  
  function animateRocket(){

    group.position.copy(combinedBody.position);
    group.quaternion.copy(combinedBody.quaternion);


  }

  return {animateRocket}
  // Add the group to the scene
  
}

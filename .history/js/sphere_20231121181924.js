// sphere.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { createRaycaster } from './raycaster.js';

export function createSphere(world, scene, camera, renderer, ground) {
  const spherePhysMat = new CANNON.Material();

  const shape = new CANNON.Sphere(2)


  const sphereBody = new CANNON.Body({
    mass: 4,
    shape: shape,
    position: new CANNON.Vec3(10, 10, 0),
    material: spherePhysMat,
  });

  console.log(shape)

  world.addBody(sphereBody);
  sphereBody.linearDamping = 0.21;

  const sphereMesh = createSphereMesh();
  scene.add(sphereMesh);

  const groundSphereContactMat = new CANNON.ContactMaterial(
    ground.material,
    sphereBody.material, // Fix: Use sphereBody.material instead of sphere.body.material
    { restitution: 1 }
  );
  world.addContactMaterial(groundSphereContactMat);
  console.log(groundSphereContactMat)

  // Add userData to make the sphere clickable
  sphereMesh.userData.clickable = true;

  // Set up the raycaster for the sphere
  const objectsToInteract = [sphereMesh];
  const cleanupRaycaster = createRaycaster(camera, scene, renderer, objectsToInteract, onSphereClick);

  function createSphereMesh() {
    const sphereGeo = new THREE.SphereGeometry(2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    return sphereMesh;
  }

  function onSphereClick(clickedObject) {
    console.log('Sphere clicked!');

    if (clickedObject === sphereMesh) {
      // Apply an impulse to the sphere in the y-direction
      sphereBody.applyImpulse(new CANNON.Vec3(0, 5, 0), sphereBody.position);
    }
  }

  function animateSphere() {
    // Update the sphere's position and rotation
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
  }

  return {
    mesh: sphereMesh,
    body: sphereBody,
    animateSphere,
  };
}

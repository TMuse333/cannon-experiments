import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(scene, world) {
  const loader = new GLTFLoader();

  // Create a Cannon.js material for the rocket
  const rocketPhysMat = new CANNON.Material();

  loader.load('../blender/rocketship2.gltf', function (gltf) {
    // Set the initial position and scale
    gltf.scene.position.set(-5, 4, -5);
    gltf.scene.scale.set(1, 1, 1);

    // Set up the Cannon.js body for the rocket
    const rocketBody = new CANNON.Body({
      mass: 1, // Adjust the mass according to your requirements
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)), // Assuming a box-shaped rocket, adjust as needed
      position: new CANNON.Vec3(-5, 4, -5),
      material: rocketPhysMat,
    });

    world.addBody(rocketBody);
    rocketBody.linearDamping = 0.21;

    // Rotate the Cannon.js body based on the loaded model's rotation
    const euler = new THREE.Euler();
    euler.setFromQuaternion(gltf.scene.quaternion, 'XYZ');
    rocketBody.quaternion.copy(new CANNON.Quaternion(euler.x, euler.y, euler.z, euler.order));

    // Add the loaded model to the scene
    scene.add(gltf.scene);

    // Update the position and rotation of the model based on the physics simulation
    function animateRocket() {
      gltf.scene.position.copy(rocketBody.position);
      gltf.scene.quaternion.copy(rocketBody.quaternion);
    }

    // Return the rocket body and animation function
    return {
      body: rocketBody,
      animateRocket,
    };
  });
}

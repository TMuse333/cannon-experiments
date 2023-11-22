import { gtlfToCannon } from './gltfToCannon'; // Adjust the path as needed
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function createRocket(world, scene, camera, renderer, ground) {
  let rocketGeo;

  // Call gtlfToCannon to get Cannon.js shapes
  const cannonShapes = await gtlfToCannon('../blender/rocketship2.gltf');

  try {
    const gltf = await loadModel('../blender/rocketship2.gltf');

    gltf.scene.position.set(0, 5, 0);

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        rocketGeo = createCannonShape(child.geometry);
      }
    });

    const rocketMat = new CANNON.Material();

    const rocketBody = new CANNON.Body({
      mass: 4,
      shape: cannonShapes[0], // Use the Cannon.js shape obtained from gtlfToCannon
      position: new CANNON.Vec3(0, 5, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    console.log(gltf.scene);

    function animateRocket() {
      if (rocketBody) {
        const rocketMesh = gltf.scene.children[0];
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);
      }
    }

    return { animateRocket, rocketBody, rocketGeo };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}

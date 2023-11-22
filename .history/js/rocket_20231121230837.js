// rocket.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
import loadAndExportModel from './gltfToCannon';



export async function createRocket(world, scene, camera, renderer, ground) {
  const cylinderRadiusTop = 0.01;
  const cylinderRadiusBottom = 3;
  const cylinderHeight = 5;
  const cylinderNumSegments = 16;

  const temp = new CANNON.Cylinder(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderNumSegments
  );

  try {
    const gltf = await loadModel('../blender/scene-2.gltf');

    console.log(gltf)

 

    const rocketMat = new CANNON.Material();

    const rocketBody = new CANNON.Body({
      mass: 4,
      material: rocketMat,
    });

    // Add each shape to the rocketBody with its position and orientation
    cannonShapes.forEach((shapeInfo) => {
      rocketBody.addShape(shapeInfo.shape, shapeInfo.position, shapeInfo.quaternion);
    });

    rocketBody.position.set(0, 10, 0);

    world.addBody(rocketBody);

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      {
        friction: 0.0,
        restitution: 0.5,
      }
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    function animateRocket() {
      if (rocketBody) {
        const rocketMesh = gltf.scene.children[0];
        rocketMesh.position.copy(rocketBody.position.vadd(new CANNON.Vec3(0, -2.75, 0)));
        rocketMesh.quaternion.copy(rocketBody.quaternion);
      }
    }

    return { animateRocket, rocketBody };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}

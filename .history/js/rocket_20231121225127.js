
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
import convertGLTFtoCannon from './shape';

function loadModel(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(url, function (gltf) {
      resolve(gltf);
    }, null, function (error) {
      reject(error);
    });
  });
}



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

    const cannonShapes = convertGLTFtoCannon(gltf);

    console.log(cannonShapes)
    
    gltf.scene.position.set(0, 10, 0);

   

    const rocketMat = new CANNON.Material();

   const rocketBody = new CANNON.Body({
      mass: 4,
      shape: cannonShapes,
    // shape: new CANNON.Box(new CANNON.Vec3(1, 0.1, 1)),
      position: new CANNON.Vec3(0, 10, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);
    console.log(rocketGeo)

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      
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

    return { animateRocket, rocketBody, rocketGeo };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}
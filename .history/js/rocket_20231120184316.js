import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'
import { loadAndFindShape } from './shape';

export function createRocket(world, scene, camera, renderer,ground) {


const loader = new GLTFLoader();

let globalRocketShape










loader.load('../blender/rocketship2.gltf', function (gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          // Set the name for the rocket mesh
          child.name = 'RocketMesh';
        }
      });

  gltf.scene.position.set(0, 5, 0);
//   gltf.scene.scale.set(1, 1, 1);
  
//   const rotationInDegrees = -80;
// const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// gltf.scene.rotation.set(0, rotationInRadians, 0);

// console.log(rocketGeo);

  // Add the loaded model to the scene
  scene.add(gltf.scene);


 
});

function animateRocket() {
    if (rocketBody) {
      // Update the rocket's position and rotation
      const rocketMesh = scene.getObjectByName('RocketMesh');
      if (rocketMesh) {
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);
      }
    }
  }

  return { animateRocket };


}
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'
import { loadAndFindShape } from './shape';

export function createRocket(world, scene, camera, renderer,ground) {


const loader = new GLTFLoader();

loadAndFindShape('../blender/rocketship2.gltf')
.then(rocketShape => {
  const rocketMat = new CANNON.Material();

  const rocketBody = new CANNON.Body({
    mass: 4,
    shape: rocketShape,
    position: new CANNON.Vec3(0, 5, 0),
    material: rocketMat,
  });
  world.add(rocketBody)
})




loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(0, 5, 0);
//   gltf.scene.scale.set(1, 1, 1);
  
//   const rotationInDegrees = -80;
// const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// gltf.scene.rotation.set(0, rotationInRadians, 0);

// console.log(rocketGeo);

  // Add the loaded model to the scene
  scene.add(gltf.scene);


 
});


}
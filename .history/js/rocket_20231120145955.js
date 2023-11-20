import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'

export function createRocket(scene,world) {


const loader = new GLTFLoader();

loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(-5, 4, -5);
  gltf.scene.scale.set(1, 1, 1);
  
  const rotationInDegrees = -80;
const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// Rotate the scene
gltf.scene.rotation.set(0, rotationInRadians, 0);

const rocketGeometry = gltf.scene.children[0].geometry;

console.log(rocketGeometry)
// const cannonShape = createCannonShape(rocketGeometry);

  // Add the loaded model to the scene
  scene.add(gltf.scene);
  

});

}
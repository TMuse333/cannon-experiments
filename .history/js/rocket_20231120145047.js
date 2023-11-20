import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

export function createRocket(scene) {


const loader = new GLTFLoader();

loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(0, 4, 0);
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.rotation.set(0, 0, 0.5);

  // Add the loaded model to the scene
  scene.add(gltf.scene);
  

});

}
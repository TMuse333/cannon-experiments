// main.js

import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import { createSphere } from './sphere.js';
import { createGround } from './ground.js';
import {createTree} from './tree'
// import rocket from '../blender/scene.gltf'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

loader.load('../blender/rocketship2.gltf', function (gltf) {
  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load('../blender/rocket-base.png'), function (texture) {
    texture.wrapS = THREE.re
  }


 


  gltf.scene.position.set(0, 6, 0);
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.rotation.set(0, 0, 0);

  // Add the loaded model to the scene
  scene.add(gltf.scene);
  

});



const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, -30);
orbit.update();

// Create Cannon world
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0),
});

const ground = createGround(world, scene);

const box = createBox(world, scene,camera,renderer,ground);
scene.add(box.mesh);

const sphere = createSphere(world, scene,camera,renderer,ground);
scene.add(sphere.mesh);

const tree = createTree(world,scene)


const positionOffset = new THREE.Vector3(-10, 2.5, 0);


const timeStep = 1 / 60;

function animate() {
  world.step(timeStep);

  ground.mesh.position.copy(ground.body.position);
  ground.mesh.quaternion.copy(ground.body.quaternion);

    box.animateBox()

    sphere.animateSphere()

    tree.updateTree(positionOffset)

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



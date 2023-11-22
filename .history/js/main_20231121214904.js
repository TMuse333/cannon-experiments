// main.js

import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import { createSphere } from './sphere.js';
import { createGround } from './ground.js';
import {createTree} from './tree'
import { createRocket } from './rocket.js';



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
directionalLight.position.set(-1, 1, -1).normalize(); // Adjusted direction
scene.add(directionalLight);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);



const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// main.js or another module

// import { loadAndFindShape } from './shape.js';

// const url = '../blender/rocketship2.gltf';
// loadAndFindShape(url)
//   .then(geometry => {
//     console.log(geometry);
//     // Do something with the geometry
//   })
//   .catch(error => {
//     console.error(error);
//   });






const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, -30);
orbit.update();

// Create Cannon world
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -19.81, 0),
});

const ground = createGround(world, scene);

// const box = createBox(world, scene,camera,renderer,ground);
// scene.add(box.mesh);

const sphere = createSphere(world, scene,camera,renderer,ground);



const tree = createTree(world,scene)

// const rocket = createRocket(world, scene,camera,renderer,ground)

const { animateRocket, rocketBody, rocketGeo } = await createRocket(world, scene, camera, renderer, ground);



// const rocket = createRocket(scene,world)










// const groundRocketContactMat = new CANNON.ContactMaterial(
//   ground.material,
//   rocketBody.material,
  
// );
// console.log(ground.material)
// console.log(rocketBody.material)

// world.addContactMaterial(groundRocketContactMat);


const positionOffset = new THREE.Vector3(-10, 2.5, 0);


const timeStep = 1 / 60;

function animate() {
  world.step(timeStep);

 

 

    // box.animateBox()

    // sphere.animateSphere()

    // tree.updateTree(positionOffset)

    animateRocket()

    
    // console.log(rocketBody.position)

  // rocket.animateRocket()
    

  renderer.render(scene, camera);
}



renderer.setAnimationLoop(animate);

// function logRocketPosition() {
//   console.log(rocketBody.position);
// }


// const intervalId = setInterval(logRocketPosition, 100);


// setTimeout(() => {
//   clearInterval(intervalId);
// }, 10000);



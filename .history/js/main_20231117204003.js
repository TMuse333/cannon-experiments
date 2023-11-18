// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import { createSphere } from './sphere.js';
import { createGround } from './ground.js';
import { createRaycaster } from './raycaster.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, -30);
orbit.update();

// Create Cannon world
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0),
});

const ground = createGround(world, scene);

const box = createBox(world, scene);
scene.add(box.mesh);

const sphere = createSphere(world, scene, camera, renderer);
scene.add(sphere.mesh);

const objectsToInteract = [sphere.mesh];
const cleanupRaycaster = createRaycaster(camera, scene, renderer, objectsToInteract, (clickedObject) => {
  // The click handling logic is now in sphere.js, so you can leave this callback empty
});

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

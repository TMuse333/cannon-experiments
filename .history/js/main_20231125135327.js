// main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createGround } from './ground.js';
import { createRocket } from './rocket.js';
import { RocketPhysics } from './rocketPhysics.js';
import { createDashboard } from './dashboard.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// createDashboard(document)

const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-1, 5, -1).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 0.5; 
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

let isCameraLocked = true

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, -30);
const targetPosition = new THREE.Vector3(); 
orbit.update();

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0),
});


document.addEventListener('keydown', (event) => {
  if (event.key === 't') {
    // Toggle camera mode
    isCameraLocked = !isCameraLocked;
  }
});

function updateCamera(rocket) {
  const offset = new THREE.Vector3(0, 5, -25);

  if (isCameraLocked && rocket && rocket.object3D) {
    // Follow the rocket
    targetPosition.copy(rocket.object3D.position).add(offset);
    camera.position.lerp(targetPosition, 0.1);
    camera.lookAt(rocket.object3D.position);
  } else {
    // Free-roaming mode
    orbit.update();
  }
}

const ground = createGround(world, scene);







// Function to update the dashboard




// Use a promise to ensure the rocket is fully loaded
createRocket(scene, world,ground,renderer,camera).then((rocket) => {

console.log("test")

  const rocketPhysics = new RocketPhysics(rocket.object3D, rocket.cannonBody, scene, world,ground);



  const timeStep = 1 / 60;

  function animate() {
    world.step(timeStep);

    ground.mesh.position.copy(ground.body.position);
    ground.mesh.quaternion.copy(ground.body.quaternion);

    // Check if the rocket object is defined before accessing its properties
    if (rocket && rocket.object3D && rocket.cannonBody) {
      rocket.object3D.position.copy(rocket.cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
      rocket.object3D.quaternion.copy(rocket.cannonBody.quaternion);
    }

    updateCamera(rocket)

    rocketPhysics.continuousUpdate();



    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
});


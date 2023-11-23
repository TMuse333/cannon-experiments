// main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createGround } from './ground.js';
import { createRocket } from './rocket.js';
import { RocketPhysics } from './rocketPhysics.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-1, 1, -1).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, -30);
const targetPosition = new THREE.Vector3(); 
orbit.update();

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0),
});

const ground = createGround(world, scene);



// Use a promise to ensure the rocket is fully loaded
createRocket(scene, world,ground,renderer,camera).then((rocket) => {

console.log("test",cannonBody)

  const rocketPhysics = new RocketPhysics(rocket.object3D, rocket.cannonBody, scene, world);

console.log(rocketPhysics)

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

    const offset = new THREE.Vector3(0, 5, -25); // Adjust the offset as needed
    targetPosition.copy(rocket.object3D.position).add(offset);
    camera.position.lerp(targetPosition, 0.1); // Adjust the lerp factor as needed
    camera.lookAt(rocket.object3D.position);

    rocketPhysics.continuousUpdate();

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
});


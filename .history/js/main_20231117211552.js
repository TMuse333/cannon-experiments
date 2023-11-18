// main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import { createSphere } from './sphere.js';
import { createGround } from './ground.js';


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

const sphere = createSphere(world, scene,camera,renderer);
scene.add(sphere.mesh);

const groundBoxContactMat = new CANNON.ContactMaterial(
  ground.material,
  box.body.material,
  { friction: 0.04 }
);
world.addContactMaterial(groundBoxContactMat);

const groundSphereContactMat = new CANNON.ContactMaterial(
  ground.material,
  sphere.body.material,
  { restitution: 0.9 }
);
world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

function animate() {
  world.step(timeStep);

  ground.mesh.position.copy(ground.body.position);
  ground.mesh.quaternion.copy(ground.body.quaternion);

  box.mesh.position.copy(box.body.position);
  box.mesh.quaternion.copy(box.body.quaternion);

    sphere.animateSphere()

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



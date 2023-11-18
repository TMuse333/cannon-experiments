// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import { createSphere } from './sphere.js';

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

// Create ground
const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// Create Cannon world
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

const groundPhysMat = new CANNON.Material();
const groundBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

const box = createBox(world, scene);
scene.add(box.mesh);

const sphere = createSphere(world, scene);
scene.add(sphere.mesh);

const groundBoxContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box.body.material,
    { friction: 0.04 }
);
world.addContactMaterial(groundBoxContactMat);

const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    sphere.body.material,
    { restitution: 0.9 }
);
world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

function animate() {
    world.step(timeStep);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    box.mesh.position.copy(box.body.position);
    box.mesh.quaternion.copy(box.body.quaternion);

    sphere.mesh.position.copy(sphere.body.position);
    sphere.mesh.quaternion.copy(sphere.body.quaternion);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

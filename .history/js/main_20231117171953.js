// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { createBox } from './box.js';
import 





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

const box = createBox(world,scene);
scene.add(box.mesh);

// Create sphere
// const sphereGeo = new THREE.SphereGeometry(2);
// const sphereMat = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     wireframe: true,
// });
// const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
// scene.add(sphereMesh);

// const spherePhysMat = new CANNON.Material();
// const sphereBody = new CANNON.Body({
//     mass: 4,
//     shape: new CANNON.Sphere(2),
//     position: new CANNON.Vec3(0, 10, 0),
//     material: spherePhysMat
// });
// world.addBody(sphereBody);
// sphereBody.linearDamping = 0.21;

// Create contact material for ground and sphere
const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhysMat,
    { restitution: 0.9 }
);
world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

function animate() {
    world.step(timeStep);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    // box.mesh.position.copy(box.body.position);
    // box.mesh.quaternion.copy(box.body.quaternion);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

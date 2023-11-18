import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

const sphereGeo = new THREE.SphereGeometry(2);
const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphereMesh);

const spherePhysMat = new CANNON.Material();
const sphereBody = new CANNON.Body({
    mass: 4,
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0, 10, 0),
    material: spherePhysMat
});
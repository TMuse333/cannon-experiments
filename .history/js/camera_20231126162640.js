// camera.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let isCameraLocked = true;
const targetPosition = new THREE.Vector3();
const offset = new THREE.Vector3(0, 5, -25);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, -30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

document.addEventListener('keydown', (event) => {
  if (event.key === 't') {
    // Toggle camera mode
    isCameraLocked = !isCameraLocked;
  }

  if (event.key === 'v') {
    // Rotate camera by 90 degrees
    rotateCameraBy90Degrees();
  }
});

function rotateCameraBy90Degrees() {
  const currentRotation = camera.rotation.y;
  const newRotation = currentRotation + Math.PI / 2;

  const distance = camera.position.distanceTo(targetPosition);
  const newX = targetPosition.x + distance * Math.sin(newRotation);
  const newZ = targetPosition.z + distance * Math.cos(newRotation);

  camera.position.set(newX, camera.position.y, newZ);
  camera.rotation.y = newRotation;

  camera.lookAt(targetPosition);
}

function updateCamera(rocket) {
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

export { camera, updateCamera };

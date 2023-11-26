// camera.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export var isCameraLocked = true;
const targetPosition = new THREE.Vector3();
const offset = new THREE.Vector3(0, 5, -25);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, -30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Add a flag to indicate whether to use side view
let isSideView = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 't') {
    // Toggle camera mode
    isCameraLocked = !isCameraLocked;
    isSideView = false; // Reset to default view when toggling camera mode
  }

  if (event.key === 'b') {
    // Toggle side view
    isSideView = !isSideView;
  }
});

function updateCamera(rocket) {
  if (isCameraLocked && rocket && rocket.object3D) {
    if (isSideView) {
      // Set the camera to a side view
      const sideViewOffset = new THREE.Vector3(10, 0, -10); // Adjust the offset as needed
      const sideViewPosition = rocket.object3D.position.clone().add(sideViewOffset);
      const sideViewLookAt = rocket.object3D.position.clone();

      camera.position.lerp(sideViewPosition, 0.1);
      camera.lookAt(sideViewLookAt);
    } else {
      // Follow the rocket from behind
      targetPosition.copy(rocket.object3D.position).add(offset);
      camera.position.lerp(targetPosition, 0.1);
      camera.lookAt(rocket.object3D.position);
    }
  } else {
    // Free-roaming mode
    orbit.update();
  }
}

export { camera, updateCamera };

// camera.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export let isCameraLocked = true;
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

    console.log('rotation nation')
    
      const currentQuaternion = camera.quaternion.clone();
      const rotationAxis = new THREE.Vector3(0, 1, 0);
      const rotationAngle = Math.PI / 2;
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, rotationAngle);
    
      // Combine current quaternion with rotation quaternion
      currentQuaternion.multiply(rotationQuaternion);
      camera.quaternion.copy(currentQuaternion);
    
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

export { camera, updateCamera,rotateCameraBy90Degrees };

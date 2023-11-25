// rocketControls.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three'

export const O_KEY_DOWN_EVENT = 'oKeyDown';
export const P_KEY_DOWN_EVENT = 'pKeyDown';
export const A_KEY_DOWN_EVENT = 'aKeyDown';
export const D_KEY_DOWN_EVENT = 'dKeyDown';
export const W_KEY_DOWN_EVENT = 'wKeyDown';
export const S_KEY_DOWN_EVENT = 'sKeyDown';

let throttle = 70; // Initial throttle setting (50%)

let pitchAngle = 50;
let yawAngle = 0;
let rollAngle = 0;

export let isWKeyDown = false;
export let isAKeyDown = false;
export let isDKeyDown = false;
export let isSKeyDown = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    isAKeyDown = true;
  } else if (event.key === 'd') {
    isDKeyDown = true;
  } else if (event.key === 'w') {
    isWKeyDown = true;
  } else if (event.key === 's') {
    isSKeyDown = true;
  } else if (event.key === 'p' || event.key === 'o') {
    handleThrottleControl(event);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    isAKeyDown = false;
  } else if (event.key === 'd') {
    isDKeyDown = false;
  } else if (event.key === 'w') {
    isWKeyDown = false;
  } else if (event.key === 's') {
    isSKeyDown = false;
  }
});

function handleThrottleControl(event) {
  if (event.key === 'p') {
    // Increase throttle
    if (throttle < 100) {
      throttle += 10; // Increase by 10%
      console.log(`Throttle increased to ${throttle}%`);
    }
  } else if (event.key === 'o') {
    // Decrease throttle
    if (throttle > 0) {
      throttle -= 10; // Decrease by 10%
      console.log(`Throttle decreased to ${throttle}%`);
    }
  }
}

export function controlRocketThrottle() {
  console.log(throttle);
  return throttle / 100;
}

export function getThrustVector(rocketQuaternion) {
  // rocketQuaternion is the quaternion representing the orientation of the rocket
  const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(rocketQuaternion);
  rocketQuaternion.vmult(forwardDirection, forwardDirection);
  console.log('forward directionforwardDirection)

  // Use the forwardDirection to calculate the thrust force
  const takeoffImpulse = new CANNON.Vec3(
    0,  // X component (adjust as needed)
    10 * (throttle / 100),  // Y component, adjusted by throttle
    0   // Z component (adjust as needed)
  );



  // Apply the forwardDirection to the thrust force
  takeoffImpulse.x = forwardDirection.x * takeoffImpulse.y;
  takeoffImpulse.y = forwardDirection.y * takeoffImpulse.y;
  takeoffImpulse.z = forwardDirection.z * takeoffImpulse.y;

  console.log(takeoffImpulse)

  return takeoffImpulse;
}






// rocketControls.js
import * as CANNON from 'cannon-es';

export const O_KEY_DOWN_EVENT = 'oKeyDown';
export const P_KEY_DOWN_EVENT = 'pKeyDown';
export const A_KEY_DOWN_EVENT = 'aKeyDown';
export const D_KEY_DOWN_EVENT = 'dKeyDown';
export const W_KEY_DOWN_EVENT = 'wKeyDown';
export const S_KEY_DOWN_EVENT = 'sKeyDown';

let throttle = 40; // Initial throttle setting (50%)

let pitchAngle = 0;
let yawAngle = 0;
let rollAngle = 0;

let isWKeyDown = false;
let isAKeyDown = false;
let isDKeyDown = false;
let isSKeyDown = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'A') {
    isAKeyDown = true;
  } else if (event.key === 'D') {
    isDKeyDown = true;
  } else if (event.key === 'W') {
    isWKeyDown = true;
  } else if (event.key === 'S') {
    isSKeyDown = true;
  } else if (event.key === 'p' || event.key === 'o') {
    handleThrottleControl(event);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'A') {
    isAKeyDown = false;
  } else if (event.key === 'D') {
    isDKeyDown = false;
  } else if (event.key === 'W') {
    isWKeyDown = false;
  } else if (event.key === 'S') {
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

export function getThrustVector() {
  if (isWKeyDown) {
    return new CANNON.Vec3(0, 10 * (throttle / 100), 0);
  }
  return new CANNON.Vec3(0,10, 0);w
}

export function getGimbalAngles() {
  return { pitch: pitchAngle, yaw: yawAngle, roll: rollAngle };
}

export function getRotationVectors() {
  const pitchRad = pitchAngle;
  const yawRad = yawAngle;
  const rollRad = rollAngle;

  const rotationX = new CANNON.Vec3(Math.sin(rollRad), Math.cos(rollRad) * Math.sin(pitchRad), Math.cos(rollRad) * Math.cos(pitchRad));
  const rotationY = new CANNON.Vec3(-Math.cos(rollRad), Math.sin(rollRad) * Math.sin(pitchRad), Math.sin(rollRad) * Math.cos(pitchRad));
  const rotationZ = new CANNON.Vec3(0, Math.cos(pitchRad), -Math.sin(pitchRad));

  return { rotationX, rotationY, rotationZ };
}

export function getStrafeVector() {
  if (isSKeyDown) {
    return new CANNON.Vec3(0, -10, 0); // Adjust values as needed
  }
  return new CANNON.Vec3(0, 0, 0);
}
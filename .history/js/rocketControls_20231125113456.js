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

document.addEventListener('keydown', (event) => {
  if (event.key === 'A') {
    // Rotate left (yaw)
    yawAngle += 0.1; // Adjust the rotation speed as needed
    console.log(`Yaw angle: ${yawAngle}`);
  } else if (event.key === 'D') {
    // Rotate right (yaw)
    yawAngle -= 0.1;
    console.log(`Yaw angle: ${yawAngle}`);
  } else if (event.key === 'W') {
    // Pitch up
    pitchAngle += 0.1;
    console.log(`Pitch angle: ${pitchAngle}`);
  } else if (event.key === 'S') {
    // Pitch down
    pitchAngle -= 0.1;
    console.log(`Pitch angle: ${pitchAngle}`);
  } else if (event.key === 'p' || event.key === 'o') {
    // Handle throttle control
    handleThrottleControl(event);
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

export function rocketBoost() {
  const takeoffImpulse = new CANNON.Vec3(0, 10 * (throttle / 100), 0);
  return takeoffImpulse;
}

export function getGimbalAngles() {
  // Return the current pitch, yaw, and roll angles
  return { pitch: pitchAngle, yaw: yawAngle, roll: rollAngle };
}

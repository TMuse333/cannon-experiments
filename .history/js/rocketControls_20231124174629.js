// rocketControls.js

import * as CANNON from 'cannon-es';

export const W_KEY_DOWN_EVENT = 'wKeyDown';
export const W_KEY_UP_EVENT = 'wKeyUp';
export const O_KEY_DOWN_EVENT = 'oKeyDown';
export const P_KEY_DOWN_EVENT = 'pKeyDown';

export let isWKeyDown = false;
let throttle = 50; // Initial throttle setting (50%)

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    // Increase throttle
    if (throttle < 100) {
      throttle += 10; // Increase by 10%
      console.log(`Throttle increased to ${throttle}%`);
    }
  } else if (event.key === 'ArrowDown') {
    // Decrease throttle
    if (throttle > 0) {
      throttle -= 10; // Decrease by 10%
      console.log(`Throttle decreased to ${throttle}%`);
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'w') {
    // Key is released
    console.log('w key released!');
    isWKeyDown = false;
  }
});

export function controlRocketThrottle() {
  // Use the current throttle setting
  return throttle / 100;
}

export function launchRocket(cannonBody) {
  // Apply the initial takeoff impulse
  const takeoffImpulse = new CANNON.Vec3(0, 10, 0);
  const impulsePoint = new CANNON.Vec3();
  cannonBody.applyImpulse(takeoffImpulse, impulsePoint);
}

document.addEventListener(W_KEY_DOWN_EVENT, () => {
  // Handle the "w" key down event
  isWKeyDown = true;
});

document.addEventListener(W_KEY_UP_EVENT, () => {
  // Handle the "w" key up event
  isWKeyDown = false;
});

// rocketControls.js

export const O_KEY_DOWN_EVENT = 'oKeyDown';
export const P_KEY_DOWN_EVENT = 'pKeyDown';

let throttle = 40; // Initial throttle setting (50%)

document.addEventListener('keydown', (event) => {
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
});

export function controlRocketThrottle() {
  console.log(throttle)

  return throttle / 100;
}

export function rocketBoost () {
  const takeoffImpulse = new CANNON.Vec3(0, 10 * (thrust), 0);
  return takeoffImpulse
}

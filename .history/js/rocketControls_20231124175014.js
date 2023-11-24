// rocketControls.js

export const O_KEY_DOWN_EVENT = 'oKeyDown';
export const P_KEY_DOWN_EVENT = 'pKeyDown';

let throttle = 50; // Initial throttle setting (50%)

document.addEventListener('keydown', (event) => {
  if (event.key === 'O') {
    // Increase throttle
    if (throttle < 100) {
      throttle += 10; // Increase by 10%
      console.log(`Throttle increased to ${throttle}%`);
    }
  } else if (event.key === 'P') {
    // Decrease throttle
    if (throttle > 0) {
      throttle -= 10; // Decrease by 10%
      console.log(`Throttle decreased to ${throttle}%`);
    }
  }
});

export function controlRocketThrottle() {
  // Use the current throttle setting
  return throttle / 100;
}

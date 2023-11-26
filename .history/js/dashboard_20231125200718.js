import { K_KEY_DOWN_EVENT, K_KEY_UP_EVENT } from './rocketPhysics';
import { controlRocketThrottle } from './rocketControls';

export function createDashboard(document) {
    const dashboardContainer = document.createElement('div');
    dashboardContainer.classList.add('dashboard-container');

    document.body.appendChild(dashboardContainer);

    let throttle = controlRocketThrottle();

    updateDashboard(throttle);

    document.addEventListener('keydown', (event) => {
        // Check if the pressed key is 'w'
        if (event.key === 'w') {
            throttle = controlRocketThrottle();
            updateDashboard(throttle, true);
        } else {
            // Handle other key presses (e.g., 'o' or 'p')
            throttle = controlRocketThrottle();
            updateDashboard(throttle);
        }
    });

    document.addEventListener(W_KEY_UP_EVENT, () => {
        throttle = controlRocketThrottle();
        updateDashboard(throttle);
    });

    function updateDashboard(throttle, isMoving = false) {
        if (isMoving) {
            dashboardContainer.innerHTML = `Rocket is moving with a throttle of ${throttle}`;
        } else {
            dashboardContainer.innerHTML = `Rocket is stationary with a throttle of ${throttle}`;
        }
    }
}

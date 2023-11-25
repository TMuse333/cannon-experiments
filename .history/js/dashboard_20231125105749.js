import { W_KEY_DOWN_EVENT, W_KEY_UP_EVENT } from './rocketPhysics';
import { controlRocketThrottle } from './rocketControls';
import { P_KEY_DOWN_EVENT,O_KEY_DOWN_EVENT } from './rocketControls';

export function createDashboard(document) {
    const dashboardContainer = document.createElement('div');
    dashboardContainer.classList.add('dashboard-container');

    document.body.appendChild(dashboardContainer);

    let throttle = controlRocketThrottle();

    dashboardContainer.innerHTML = `Rocket is stationary with a throttle of ${throttle}`;

    document.addEventListener()

    document.addEventListener(W_KEY_DOWN_EVENT, () => {
        throttle = controlRocketThrottle();
        // Handle the "w" key down event
        // Update the dashboard based on this event
        dashboardContainer.innerHTML = `Rocket is moving with a throttle of ${throttle}`;
    });

    document.addEventListener(W_KEY_UP_EVENT, () => {
        throttle = controlRocketThrottle();
        // Handle the "w" key up event
        // Update the dashboard based on this event
        dashboardContainer.innerHTML = `Rocket is stationary with a throttle of ${throttle}`;
    });
}

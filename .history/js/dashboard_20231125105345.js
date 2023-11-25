import { W_KEY_DOWN_EVENT, W_KEY_UP_EVENT } from './rocketPhysics';
import { controlRocketThrottle } from './rocketControls';

export function createDashboard(document) {
    const dashboardContainer = document.createElement('div');
    dashboardContainer.classList.add('dashboard-container');

    document.body.appendChild(dashboardContainer);

    let throttle = controlRocketThrottle()

    dashboardContainer.innerHTML = `throttle: ${throttle}`

    let s

    document.addEventListener(W_KEY_DOWN_EVENT, () => {
        throttle = controlRocketThrottle()
        // Handle the "w" key down event
        // You can update the dashboard based on this event
        dashboardContainer.innerHTML = 'W key is being held down!';
        dashboardContainer.innerHTML = `throttle: ${throttle}`
    });

    document.addEventListener(W_KEY_UP_EVENT, () => {
        throttle = controlRocketThrottle()
        dashboardContainer.innerHTML = '';
        dashboardContainer.innerHTML = `throttle: ${throttle}` // Clear the content
    });
}

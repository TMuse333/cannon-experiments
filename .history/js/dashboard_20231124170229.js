import { W_KEY_DOWN_EVENT, W_KEY_UP_EVENT } from './rocketPhysics';

export function createDashboard(document) {
    const dashboardContainer = document.createElement('div');
    dashboardContainer.classList.add('dashboard-container');

    document.body.appendChild(dashboardContainer);

    let ke

    document.addEventListener(W_KEY_DOWN_EVENT, () => {
        // Handle the "w" key down event
        // You can update the dashboard based on this event
        dashboardContainer.innerHTML = 'W key is being held down!';
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'w') {
            // Key is released
            console.log('w key released!');
            isWKeyDown = false;
            const wKeyUpEvent = new Event(W_KEY_UP_EVENT);
            document.dispatchEvent(wKeyUpEvent);
        }
    });
}

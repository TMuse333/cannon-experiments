// dashboard.js

// Function to update the dashboard content
function updateDashboard(throttleValue, thrustValue, altitudeValue) {
    const dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = `
        <p>Throttle: ${throttleValue}</p>
        <p>Thrust: ${thrustValue}</p>
        <p>Altitude: ${altitudeValue}</p>
        <!-- Add more parameters as needed -->
    `;
}

// Example usage (replace with your actual values)
updateDashboard(0.75, 5000, 10000);

// You can call this function whenever you need to update the dashboard
// For example, during the animation loop of your Three.js scene

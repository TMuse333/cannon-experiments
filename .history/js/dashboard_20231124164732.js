import { W_KEY_DOWN_EVENT } from './rocketPhysics';


export function createDashboard(document) {
    const dashboardContainer = document.createElement('div');
    dashboardContainer.classList.add('dashboard-container');



    document.body.appendChild(dashboardContainer);
  }
  

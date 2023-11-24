


export function createDashboard(document){

  const  dashboardContainer = document.createElement('div');
    dashboardContainer.style.position = 'absolute';
    dashboardContainer.style.bottom = '10px';
    dashboardContainer.style.left = '50%';
    dashboardContainer.style.color = 'yellow';
    dashboardContainer.innerHTML = 'slat'
    dashboardContainer.width = '100px'
    dashboardContainer.backgroundcolor = 'red'
    document.body.appendChild(dashboardContainer);

}

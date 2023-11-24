


export function createDashboard(document){

  const  dashboardContainer = document.createElement('div');
    dashboardContainer.style.position = 'absolute';
    dashboardContainer.style.bottom = '10px';
    dashboardContainer.style.left = '25%';
    dashboardContainer.style.color = 'yellow';
    dashboardContainer.innerHTML = 'slat'
    dashboardContainer.style.width = '500px'
    dashboardContainer.style.backgroundColor = 'red'
    document.body.appendChild(dashboardContainer);

}

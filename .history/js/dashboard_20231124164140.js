


export function createDashboard(document){

  const  dashboardContainer = document.createElement('div');
    dashboardContainer.style.position = 'absolute';
    dashboardContainer.style.bottom = '10px';
    dashboardContainer.style.left = '25%';
    dashboardContainer.style.color = 'yellow';
    // w
    dashboardContainer.style.width = '500px'
    dashboardContainer.style.height = '200px'
    dashboardContainer.style.backgroundColor = 'red'
    document.body.appendChild(dashboardContainer);

}

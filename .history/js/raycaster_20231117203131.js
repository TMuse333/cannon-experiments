// raycaster.js

import * as THREE from 'three';

export const createRaycaster = (camera, scene, renderer, objects, onClick) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleMouseClick = (event) => {
    // Calculate mouse coordinates in normalized device coordinates (NDC)
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Set the raycaster origin and direction based on the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with objects
    const intersects = raycaster.intersectObjects(objects, true);

    // Call the onClick callback with the first intersected object
    if (intersects.length > 0) {
      onClick(intersects[0].object);
    }
  };

  // Add the click event listener to the renderer
  renderer.domElement.addEventListener('click', handleMouseClick, false);

  // Return a function to clean up the event listener when needed
  return () => {
    renderer.domElement.removeEventListener('click', handleMouseClick, false);
  };
};




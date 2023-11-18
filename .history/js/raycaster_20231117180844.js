// raycaster.js
import * as THREE from 'three';

export function setupRaycaster(camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleMouseClick(event, clickableObjects, onClick) {
        // Calculate normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Set up the raycaster
        raycaster.setFromCamera(mouse, camera);

        // Find intersected objects
        const intersects = raycaster.intersectObjects(clickableObjects, true);

        // Check if the clicked object is clickable
        const clickedObjects = intersects.filter(obj => obj.object.userData.clickable);

        if (clickedObjects.length > 0) {
            const clickedObject = clickedObjects[0].object;
            onClick(clickedObject);
        }
    }

    // Add window event listener for click
    window.addEventListener('click', (event) => {
        handleMouseClick(event, clickableObjects, onClick);
    });

    return {
        handleMouseClick,
    };
}

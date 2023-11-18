// box.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { createRaycaster } from './raycaster.js';

export function createBox(world, scene, camera, renderer,ground) {
    const boxPhysMat = new CANNON.Material();

    const boxBody = new CANNON.Body({
        mass: 4,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        position: new CANNON.Vec3(2, 20, 0),
        material: boxPhysMat
    });

    world.addBody(boxBody);

    boxBody.angularVelocity.set(0, 10, 0);
    boxBody.angularDamping = 0.3;

    const boxMesh = createBoxMesh();
    scene.add(boxMesh);

    const groundBoxContactMat = new CANNON.ContactMaterial(
        ground.material,
        boxBody.material,
        { friction: 0.04 }
    );
    world.addContactMaterial(groundBoxContactMat);

    // Add userData to make the box clickable
    boxMesh.userData.clickable = true;

    // Set up the raycaster for the box
    const objectsToInteract = [boxMesh];
    const cleanupRaycaster = createRaycaster(camera, scene, renderer, objectsToInteract, onBoxClick);

    function createBoxMesh() {
        const boxGeo = new THREE.BoxGeometry(2, 2, 2);
        const boxMat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        return boxMesh;
    }

    function onBoxClick(clickedObject) {
        console.log('Box clicked!');

        if (clickedObject === boxMesh) {
            // Apply an impulse to the box in the y-direction
            boxBody.applyImpulse(new CANNON.Vec3(5, 5, 0), boxBody.position);
        }
    }

    function animateBox() {
        // Update the box's position and rotation
        boxMesh.position.copy(boxBody.position);
        boxMesh.quaternion.copy(boxBody.quaternion);
    }

    return {
        mesh: boxMesh,
        body: boxBody,
        animateBox,
    };
}

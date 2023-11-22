import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(scene, world) {
    const loader = new GLTFLoader();

    // Declare cannonCylinderBody outside the loader scope
    let cannonCylinderBody;

    loader.load('../blender/scene-2.gltf', (gltf) => {
        const rocket = gltf.scene;

        // Customize the position, rotation, and scale of the rocket as needed
        rocket.position.set(0, 5, -15);
        rocket.rotation.set(0, 0, 0);
        rocket.scale.set(1, 1, 1);

        // Assuming that the rocket has a cylinder shape in Blender, extract its geometry
        const cylinderRadius = 3.9 / 2;
        const cylinderHeight = 7.27;

        // Create a Cannon.js cylinder shape
        const cannonCylinderShape = new CANNON.Cylinder(cylinderRadius, cylinderRadius, cylinderHeight, 32);

        // Create a Cannon.js body
        cannonCylinderBody = new CANNON.Body({ mass: 1 });
        cannonCylinderBody.addShape(cannonCylinderShape);

        world.addBody(cannonCylinderBody);

        // Add the rocket to the scene
        scene.add(rocket);

        console.log(cannonCylinderBody);
    });

    // Return the cannonCylinderBody
    return cannonCylinderBody;
}

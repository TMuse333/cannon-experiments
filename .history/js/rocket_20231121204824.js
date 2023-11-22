import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(scene,world) {
    const loader = new GLTFLoader();

    loader.load('../blender/scene-2.gltf', (gltf) => {
        const rocket = gltf.scene;
        // Customize the position, rotation, and scale of the rocket as needed
        rocket.position.set(0, 5, -15);
        rocket.rotation.set(0, 0, 0);
        rocket.scale.set(1, 1, 1);

       

       
        // const cannonShape = convertGeometryToCannonShape(rocketGeometry);

        // Add the rocket to the scene
        scene.add(rocket);

        console.log(rocket)


return 
        
    });
}




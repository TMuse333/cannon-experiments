import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

let rocket; // Declare the rocket variable globally

export async function loadRocket() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load('../blender/scene-2.gltf', (gltf) => {
            rocket = gltf.scene;
            // Customize the position, rotation, and scale of the rocket as needed
            rocket.position.set(0, 5, -15);
            rocket.rotation.set(0, 0, 0);
            rocket.scale.set(1, 1, 1);

            resolve(); // Resolve the promise once the model is loaded and configured
        }, undefined, reject);
    });
}

export function createRocket(scene, world) {
    // Call the asynchronous loader function
    loadRocket().then(() => {
        // Add the loaded rocket to the scene
        scene.add(rocket);

        // You can perform other actions here after the model is loaded
        console.log('Rocket loaded:', rocket);
    });
}

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(scene) {
    const loader = new GLTFLoader();

    loader.load('../blender/scene-2.gltf', (gltf) => {
        const rocket = gltf.scene;
        // Customize the position, rotation, and scale of the rocket as needed
        rocket.position.set(0, 5, -15);
        rocket.rotation.set(0, 0, 0);
        rocket.scale.set(1, 1, 1);

        const rocketObject = rocket.getObjectByName('Scene');

        // Get the geometry directly
        const rocketGeometry = rocketObject.geometry;

        console.log(rocketGeometry)

  console.log("lol")

       
        // const cannonShape = convertGeometryToCannonShape(rocketGeometry);

        // Add the rocket to the scene
        scene.add(rocket);

        console.log(rocket.child)

        
    });
}

function convertGeometryToCannonShape(geometry) {
    if (geometry.isBufferGeometry) {
        const positions = geometry.attributes.position.array;
        const vertices = [];

        // Extract vertices from the BufferGeometry
        for (let i = 0; i < positions.length; i += 3) {
            vertices.push(new CANNON.Vec3(positions[i], positions[i + 1], positions[i + 2]));
        }

        return new CANNON.ConvexPolyhedron({
            vertices: vertices,
            faces: [] // Assuming no custom faces; you might need to adjust this based on your model
        });
    } else {
        console.error('Unsupported geometry type. Please adapt the code for your specific case.');
        return null;
    }
}

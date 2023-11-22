import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(scene, world) {
    const loader = new GLTFLoader();

    loader.load('../blender/scene-2.gltf', (gltf) => {
        const rocket = gltf.scene;
        // Customize the position, rotation, and scale of the rocket as needed
        rocket.position.set(0, 5, -15);
        rocket.rotation.set(0, 0, 0);
        rocket.scale.set(1, 1, 1);

        // Assuming that the rocket has a cylinder shape in Blender, extract its geometry
        const rocketGeometry = new THREE.CylinderGeometry(3.9 / 2, 3.9 / 2, 7.27, 32);

        // Create Cannon.js shape from Three.js geometry
        const cannonShape = new CANNON.Trimesh(
            rocketGeometry.vertices.map(v => new CANNON.Vec3(v.x, v.y, v.z)),
            rocketGeometry.faces.map(f => [f.a, f.b, f.c])
        );

        // Create Cannon.js body
        const cannonBody = new CANNON.Body({ mass: 1 });
        cannonBody.addShape(cannonShape);
        cannonBody.position.set(0, 5, -15); // Set initial position

        // Add the Cannon.js body to the Cannon.js world
        world.addBody(cannonBody);

        // Add the rocket to the scene
        scene.add(rocket);

        console.log(rocket);
    });

   
return {cannonBody}

}

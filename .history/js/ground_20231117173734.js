// ground.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createGround(world, scene) {
    // Create Cannon material for the ground
    const groundPhysMat = new CANNON.Material();

    // Create Cannon body for the ground
    const groundBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
        type: CANNON.Body.STATIC,
        material: groundPhysMat
    });

    // Add the ground body to the Cannon world
    world.addBody(groundBody);

    // Set orientation of the ground
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    // Create THREE.js material for the ground (basic green color)
    const groundMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00, // Green color
        side: THREE.DoubleSide,
        wireframe: true
    });

    // Create THREE.js geometry for the ground
    const groundGeo = new THREE.PlaneGeometry(30, 30);

    // Create THREE.js mesh for the ground
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);

    // Add the ground mesh to the scene
    scene.add(groundMesh);

    return {
        mesh: groundMesh,
        body: groundBody
    };
}

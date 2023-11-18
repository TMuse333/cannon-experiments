// ground.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createGround(world, scene) {
    const groundPhysMat = new CANNON.Material();

    const groundBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
        type: CANNON.Body.STATIC,
        material: groundPhysMat
    });

    world.addBody(groundBody);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.8, // Adjust the roughness to control the reflection
        metalness: 0.2, // Adjust the metalness to control the reflection
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    return {
        mesh: groundMesh,
        body: groundBody,
        material: groundPhysMat
    };
}

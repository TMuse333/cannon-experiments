import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createGround(world, scene) {
    const groundPhysMat = new CANNON.Material();

    const groundBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
        type: CANNON.Body.STATIC,
        material: groundPhysMat
    });

    // Set the rotation to make the ground face down
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    world.addBody(groundBody);

    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    return {
        mesh: groundMesh,
        body: groundBody,
        material: groundPhysMat
    };
}


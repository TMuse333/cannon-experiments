// sphere.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createSphere(world, scene) {
    // Create three.js sphere
    const sphereGeo = new THREE.SphereGeometry(2);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Create cannon sphere
    const spherePhysMat = new CANNON.Material();
    const sphereBody = new CANNON.Body({
        mass: 4,
        shape: new CANNON.Sphere(2),
        position: new CANNON.Vec3(0, 10, 0),
        material: spherePhysMat
    });

    world.addBody(sphereBody);

    return {
        mesh: sphereMesh,
        body: sphereBody
    };
}

// sphere.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createSphere(world, scene) {
    const spherePhysMat = new CANNON.Material();

    const sphereBody = new CANNON.Body({
        mass: 4,
        shape: new CANNON.Sphere(2),
        position: new CANNON.Vec3(0, 10, 0),
        material: spherePhysMat
    });

    world.addBody(sphereBody);
    sphereBody.linearDamping = 0.21;

    const sphereMesh = createSphereMesh();
    scene.add(sphereMesh);

    // Add click event listener to apply impulse
    sphereMesh.addEventListener('click', () => {
        const impulse = new CANNON.Vec3(10, 0, 0); // Adjust impulse values
        sphereBody.applyImpulse(impulse, sphereBody.position);
    });

    return {
        mesh: sphereMesh,
        body: sphereBody
    };
}

function createSphereMesh() {
    const sphereGeo = new THREE.SphereGeometry(2);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    return sphereMesh;
}

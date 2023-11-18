// box.js
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export function createBox(world, scene) {
    const boxPhysMat = new CANNON.Material();

    const boxBody = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        position: new CANNON.Vec3(2, 20, 0),
        material: boxPhysMat
    });

    world.addBody(boxBody);

    boxBody.angularVelocity.set(0, 10, 0);
    boxBody.angularDamping = 0.3;

    const boxMesh = createBoxMesh();
    scene.add(boxMesh);

    function animateBox ()
{
    boxMesh.mesh.position.copy(box.body.position);
    boxMesh.mesh.quaternion.copy(box.body.quaternion);
}
    return {
        mesh: boxMesh,
        body: boxBody,
        animateBox
    };
}

function createBoxMesh() {
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    return boxMesh;
}

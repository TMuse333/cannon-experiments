// box.js
import * as CANNON from 'cannon-es';
impo

export function createBox(world) {
    const boxPhysMat = new CANNON.Material();

    const boxBody = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        position: new CANNON.Vec3(1, 20, 0),
        material: boxPhysMat
    });

    world.addBody(boxBody);

    boxBody.angularVelocity.set(0, 10, 0);
    boxBody.angularDamping = 0.3;

    return {
        mesh: createBoxMesh(),
        body: boxBody
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

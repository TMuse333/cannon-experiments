

export function createGround(world, scene) {
    const groundPhysMat = new CANNON.Material();

    const groundBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
        type: CANNON.Body.STATIC,
        material: groundPhysMat
    });

    world.addBody(groundBody);

    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    // Position the ground mesh at the origin
    groundMesh.position.set(0, 0, 0);

    return {
        mesh: groundMesh,
        body: groundBody,
        material: groundPhysMat
    };
}

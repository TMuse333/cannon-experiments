
export function createRocket(scene)

const loader = new THREE.GLTFLoader();

loader.load('path/to/your/model.gltf', (gltf) => {
    const rocket = gltf.scene;
    // Customize the position, rotation, and scale of the rocket as needed
    rocket.position.set(0, 0, 0);
    rocket.rotation.set(0, 0, 0);
    rocket.scale.set(1, 1, 1);

    // Add the rocket to the scene
    scene.add(rocket);
});

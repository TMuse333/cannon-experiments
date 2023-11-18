import * as THREE from 'three';

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 -1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 +1;

    raycaster.setFromCamera(pointer, test.camera)
    const intersects = raycaster.intersectObject
}


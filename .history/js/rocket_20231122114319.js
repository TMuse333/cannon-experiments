import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';
import * as CANNON from 'cannon-es';

export function createRocket(scene, world) {
  const gltfPath = '../blender/scene-2.gltf';
  const gltfLoader = new GLTFLoader();

  return new Promise((resolve) => {
    gltfLoader.load(gltfPath, (gltf) => {
      const object3D = gltf.scene;
      const result = threeToCannon(object3D, { type: ShapeType.BOX });

      const { shape, offset, quaternion } = result;

      scene.add(object3D);

      const cannonBody = new CANNON.Body({
        mass: 5,
        shape: shape,
        position: new CANNON.Vec3(offset.x, offset.y + 25, offset.z),
      });

      world.addBody(cannonBody);

      function animateRocket() {
        object3D.position.copy(cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
        object3D.quaternion.copy(cannonBody.quaternion);
      }

      // Resolve the Promise with an object containing the animateRocket function
      resolve({ animateRocket });
    });
  });
}
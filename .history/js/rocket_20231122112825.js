import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';

export function createRocket(scene, world) {





const gltfPath = '../blender/scene-2.gltf';
const gltfLoader = new GLTFLoader();
gltfLoader.load(gltfPath, (gltf) => {
  
  const object3D = gltf.scene;

  const result = threeToCannon(object3D, { type: ShapeType.BOX }); // Change the shape type as needed


  const { shape, offset, quaternion } = result;


  const scene = new THREE.Scene();
  scene.add(object3D);

  // Create Cannon.js body
  const cannonBody = new CANNON.Body({
    mass: 5, // Adjust the mass as needed
    shape: shape,
    position: new CANNON.Vec3(offset.x, offset.y + 25, offset.z),
    // quaternion: new CANNON.Quaternion().copy(quaternion),
  });
  
  // Add the body to the world
  world.addBody(cannonBody);

  function animateRocket() {

    object3D.position.copy(cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
    object3D.quaternion.copy(cannonBody.quaternion);

  }
  
});


}
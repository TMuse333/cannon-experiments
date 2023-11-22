// gltfToCannon.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

function convertGLTFtoCannon(gltf) {
  const cannonShapes = [];

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const geometry = child.geometry;

      // Convert THREE.js geometry to Cannon.js geometry
      const cannonShape = new CANNON.Trimesh(
        new Float32Array(geometry.attributes.position.array),
        new Uint16Array(geometry.index.array)
      );

      // Save the position and orientation of the shape
      const position = new CANNON.Vec3();
      const quaternion = new CANNON.Quaternion();
      child.getWorldPosition(position);
      child.getWorldQuaternion(quaternion);

      cannonShapes.push({
        shape: cannonShape,
        position,
        quaternion,
      });
    }
  });

  return cannonShapes;
}

export default convertGLTFtoCannon;

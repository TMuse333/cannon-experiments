// gltfToCannon.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Import setFromRotationMatrix explicitly
const setFromRotationMatrix = require('three').Quaternion.prototype.setFromRotationMatrix;

function convertGLTFtoCannon(gltf) {
  const cannonShapes = [];

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const geometry = child.geometry;

      // Ensure the geometry is valid
      if (!geometry || !geometry.isBufferGeometry) {
        return;
      }

      // Convert THREE.js geometry to Cannon.js geometry
      const cannonShape = new CANNON.Trimesh(
        new Float32Array(geometry.attributes.position.array),
        new Uint16Array(geometry.index.array)
      );

      // Use the child's matrix to get position and quaternion
      const matrix = new THREE.Matrix4();
      matrix.compose(child.position, child.quaternion, child.scale);

      const position = new CANNON.Vec3();
      const quaternion = new CANNON.Quaternion();

      // Use setFromRotationMatrix explicitly
      setFromRotationMatrix.call(quaternion, matrix);

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

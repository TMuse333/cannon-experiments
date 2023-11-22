// gltfToCannon.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

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

      // Extract rotation matrix
      const rotationMatrix = new THREE.Matrix4();
      matrix.extractRotation(rotationMatrix);

      // Use setFromRotationMatrixColumnMajor
      quaternion.setFromRotationMatrixColumnMajor(
        rotationMatrix.elements[0],
        rotationMatrix.elements[1],
        rotationMatrix.elements[2],
        rotationMatrix.elements[4],
        rotationMatrix.elements[5],
        rotationMatrix.elements[6],
        rotationMatrix.elements[8],
        rotationMatrix.elements[9],
        rotationMatrix.elements[10]
      );

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

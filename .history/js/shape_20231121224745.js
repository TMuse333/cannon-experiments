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

      cannonShapes.push(cannonShape);
    }
  });

  return cannonShapes;
}

export default convertGLTFtoCannon;

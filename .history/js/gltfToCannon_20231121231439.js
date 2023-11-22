import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Load GLTF model
const loader = new GLTFLoader();
const modelPath = '../blender/scene-2.gltf'; // Replace with the actual path to your GLTF file

const loadAndExportModel = async () => {
  return new Promise((resolve, reject) => {
    loader.load(modelPath, (gltf) => {
      // Assuming there's a single mesh in the loaded GLTF scene
      const mesh = gltf.scene.children[0];

      // Extract geometry and position
      const geometry = mesh.geometry;

      // Check if the geometry has attributes
      if (!geometry.isBufferGeometry || !geometry.index || !geometry.attributes.position) {
        reject(new Error('Invalid geometry. Unable to find position attribute or index.'));
        return;
      }

      const position = mesh.position.clone();

      // Create a Cannon.js body
      const cannonBody = new CANNON.Body({
        mass: 0, // Set the mass according to your requirements
        position: new CANNON.Vec3(position.x, position.y, position.z),
      });

      // Convert the THREE.js geometry to Cannon.js shape
      const vertexArray = geometry.attributes.position.array;
      const indexArray = geometry.index.array;

      const cannonShape = new CANNON.Trimesh(
        new Float32Array(vertexArray),
        new Uint16Array(indexArray)
      );

      // Add the shape to the Cannon.js body
      cannonBody.addShape(cannonShape);

      // Export the Cannon.js body for later use
      const exportedData = {
        body: cannonBody,
        // Add any other relevant information you may need
      };

      console.log(exportedData);

      resolve(exportedData);
    }, undefined, reject);
  });
};

export default loadAndExportModel;
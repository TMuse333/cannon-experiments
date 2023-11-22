import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Load GLTF model
const loader = new THREE.GLTFLoader();
const modelPath = '../blender/scene-2.gltf'; // Replace with the actual path to your GLTF file

const loadAndExportModel = async () => {
  return new Promise((resolve, reject) => {
    loader.load(modelPath, (gltf) => {
      // Assuming there's a single mesh in the loaded GLTF scene
      const mesh = gltf.scene.children[0];

      // Extract geometry and position
      const geometry = mesh.geometry;
      const position = mesh.position.clone();

      // Create a Cannon.js body
      const cannonBody = new CANNON.Body({
        mass: 0, // Set the mass according to your requirements
        position: new CANNON.Vec3(position.x, position.y, position.z),
      });

      // Convert the THREE.js geometry to Cannon.js shape
      const cannonShape = new CANNON.Trimesh(
        geometry.attributes.position.array, // Provide the vertex positions
        geometry.index.array, // Provide the face indices
      );

      // Add the shape to the Cannon.js body
      cannonBody.addShape(cannonShape);

      // Export the Cannon.js body for later use
      const exportedData = {
        body: cannonBody,
        // Add any other relevant information you may need
      };

      console.log(exportedData)

      resolve(exportedData);
    }, undefined, reject);
  });
};

export default loadAndExportModel;

// Import necessary libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as CANNON from 'cannon-es';

// Function to load glTF and convert to Cannon.js objects
export const gtlfToCannon = async (filePath) => {
  // Create a scene to hold the loaded objects
  const scene = new THREE.Scene();

  // Load the glTF file
  const loader = new GLTFLoader();
  const gltf = await new Promise((resolve) => loader.load(filePath, resolve));

  // Convert Three.js objects to Cannon.js objects
  const cannonShapes = [];
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const cannonShape = createCannonShape(child);
      const body = new CANNON.Body({ mass: 1 });
      body.addShape(cannonShape);
      body.position.copy(child.position);
      body.quaternion.copy(child.quaternion);
      cannonShapes.push(body);
    }
  });

  // Return the Cannon.js shapes
  return cannonShapes;
};

// Function to create a Cannon.js shape from Three.js mesh
const createCannonShape = (mesh) => {
  const geometry = mesh.geometry;

  if (geometry.isBufferGeometry) {
    // Extract vertices and indices from the BufferGeometry
    const vertices = geometry.attributes.position.array;
    const indices = [];
    for (let i = 0; i < vertices.length / 3; i++) {
      indices.push(i);
    }
    return new blender/scene-2.gltf.ConvexPolyhedron(vertices, indices);
  } else {
    // Default to a box shape if the geometry type is not recognized
    console.warn(`Unsupported geometry type: ${geometry.type}. Using BoxGeometry as default.`);
    const halfExtents = new CANNON.Vec3(1, 1, 1); // Adjust the default size as needed
    return new CANNON.Box(halfExtents);
  }
};

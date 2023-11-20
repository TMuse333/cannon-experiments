// shape.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Function to traverse the model and find the first mesh
function findMesh(object) {
  if (object.isMesh) {
    return object; // Found a mesh
  }

  // If it's a group or another object, recurse through its children
  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      const result = findMesh(child);
      if (result) {
        return result; // Found a mesh in the children
      }
    }
  }

  return null; // No mesh found in this branch
}

// Function to load the GLTF model and find its shape
export function loadAndFindShape(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(url, function (gltf) {
      const model = gltf.scene;

      // Use the function to find the first mesh
      const mesh = findMesh(model);

      if (mesh && mesh.geometry) {
        // Access the geometry of the mesh
        resolve(mesh.geometry);
      } else {
        reject("No mesh or geometry found in the GLTF model.");
      }
    }, null, function (error) {
      reject(error);
    });
  });
}

function createCannonShape(geometry) {
    const vertices = geometry.attributes.position.array;
    const indices = geometry.index ? geometry.index.array : undefined;
  
    if (indices) {
      return new CANNON.Trimesh(vertices, indices);
    } else {
      const hull = new CANNON.ConvexPolyhedron({ vertices });
      hull.updateNormals();
      hull.updateBoundingSphereRadius();
      return hull;
    }
  }

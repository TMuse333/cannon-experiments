import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadAndFindShape(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(url, function (gltf) {
      const model = gltf.scene;

      // Use the function to find the first mesh
      const mesh = findMesh(model);

      if (mesh) {
        // Access the geometry of the mesh
        const geometry = mesh.geometry;

        // Now you can use the 'geometry' to access properties like vertices, faces, etc.
        resolve(geometry);
      } else {
        reject("No mesh found in the GLTF model.");
      }
    }, null, function (error) {
      reject(error);
    });
  });
}

// Helper function to find the first mesh in the scene
function findMesh(object) {
  if (object.isMesh) {
    return object;
  }

  for (const child of object.children) {
    const foundMesh = findMesh(child);
    if (foundMesh) {
      return foundMesh;
    }
  }

  return null;
}

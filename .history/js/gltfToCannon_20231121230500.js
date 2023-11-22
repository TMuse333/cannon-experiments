const Cannon = require('cannon');
const THREE = require('three');

// Load GLTF model
const loader = new THREE.GLTFLoader();
const modelPath = '../blender/s'; // Replace with the actual path to your GLTF file

loader.load(modelPath, (gltf) => {
  // Assuming there's a single mesh in the loaded GLTF scene
  const mesh = gltf.scene.children[0];

  // Extract geometry and position
  const geometry = mesh.geometry;
  const position = mesh.position.clone();

  // Create a Cannon.js body
  const cannonBody = new Cannon.Body({
    mass: 0, // Set the mass according to your requirements
    position: new Cannon.Vec3(position.x, position.y, position.z),
  });

  // Convert the THREE.js geometry to Cannon.js shape
  const cannonShape = new Cannon.Trimesh(
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

 

});

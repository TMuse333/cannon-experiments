const fs = require('fs');
const { GLTFLoader } = require('three/addons/loaders/GLTFLoader');
const { threeToCannon, ShapeType } = require('three-to-cannon');
const { WebGLRenderer, PerspectiveCamera, Scene } = require('three');

// Load GLTF file
const gltfPath = '../blender/scene-2.gltf';
const gltfData = fs.readFileSync(gltfPath);
const gltfLoader = new GLTFLoader();
const gltf = gltfLoader.parse(gltfData.toString(), '');

// Assuming the main object is the first scene in the GLTF file
const object3D = gltf.scene;

// Convert to Cannon shape
const result = threeToCannon(object3D, { type: ShapeType.BOX }); // Change the shape type as needed

// Using the result
const { shape, offset, quaternion } = result;

// Set up three.js scene for visualization
const scene = new Scene();
scene.add(object3D);

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Render loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the object for visualization purposes
  object3D.rotation.x += 0.01;
  object3D.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

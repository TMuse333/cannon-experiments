import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';
import * as Cannon from 'cannon-es';

// Load GLTF file
const gltfPath = '../blender/scene-2.gltf';
const gltfLoader = new GLTFLoader();
gltfLoader.load(gltfPath, (gltf) => {
  // Assuming the main object is the first scene in the GLTF file
  const object3D = gltf.scene;

  // Convert to Cannon shape
  const result = threeToCannon(object3D, { type: ShapeType.BOX }); // Change the shape type as needed

  // Using the result
  const { shape, offset, quaternion } = result;

  // Set up three.js scene for visualization
  const scene = new THREE.Scene();
  scene.add(object3D);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create Cannon.js body
  const cannonBody = new Cannon.Body({
    mass: 5, // Adjust the mass as needed
    shape: shape,
    position: new Cannon.Vec3(offset.x, offset.y, offset.z),
    // quaternion: new Cannon.Quaternion().copy(quaternion),
  });

  // Render loop
  const animate = function () {
    requestAnimationFrame(animate);

    // Update Cannon.js physics
    cannonBody.position.copy(object3D.position);
    cannonBody.quaternion.copy(object3D.quaternion);
    console.log(object3D)

    // Rotate the object for visualization purposes
    // object3D.rotation.x += 0.01;
    // object3D.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
});

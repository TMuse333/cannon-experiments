import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';
import * as CANNON from 'cannon-es';
import { createGround } from './ground';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1); // Bright white light
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1); // Bright white light
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 20, -30);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create Cannon.js world
  const world = new CANNON.World();
  world.gravity.set(0, -9.8, 0); // Set your desired gravity

  // Create Cannon.js body
  const cannonBody = new CANNON.Body({
    mass: 5, // Adjust the mass as needed
    shape: shape,
    position: new CANNON.Vec3(offset.x, offset.y + 8, offset.z),
    // quaternion: new CANNON.Quaternion().copy(quaternion),
  });
  
  // Add the body to the world
  world.addBody(cannonBody);

  const ground = createGround(world,scene)

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;



  // Render loop
  const animate = function () {
    requestAnimationFrame(animate);

    // Step the Cannon.js physics world forward in time
    world.step(1 / 60);

    // Update the three.js object position and rotation based on the Cannon.js body
    object3D.position.copy(cannonBody.position).add(new THREE.Vector3(0, -2, 0));
    object3D.quaternion.copy(cannonBody.quaternion);

    ground.mesh.position.copy(ground.body.position);
    ground.mesh.quaternion.copy(ground.body.quaternion);



    renderer.render(scene, camera);
  };

  animate();
});

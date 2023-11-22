import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';

export function createRocket(scene, world) {

  import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';
import * as CANNON from 'cannon-es';
import { createGround } from './ground';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const gltfPath = '../blender/scene-2.gltf';
const gltfLoader = new GLTFLoader();
gltfLoader.load(gltfPath, (gltf) => {
  
  const object3D = gltf.scene;

  const result = threeToCannon(object3D, { type: ShapeType.BOX }); // Change the shape type as needed


  const { shape, offset, quaternion } = result;


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


  // Create Cannon.js body
  const cannonBody = new CANNON.Body({
    mass: 5, // Adjust the mass as needed
    shape: shape,
    position: new CANNON.Vec3(offset.x, offset.y + 25, offset.z),
    // quaternion: new CANNON.Quaternion().copy(quaternion),
  });
  
  // Add the body to the world
  world.addBody(cannonBody);


 



  // Render loop
  
});


}
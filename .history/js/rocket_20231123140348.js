// rocket.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { threeToCannon, ShapeType } from 'three-to-cannon';
import * as CANNON from 'cannon-es';
import {createRaycaster} from './raycaster'
import { rocketLaunch } from './rocketPhysics';

export function createRocket(scene, world,ground,renderer,camera) {
  const gltfPath = '../blender/scene-2.gltf';
  const gltfLoader = new GLTFLoader();

  return new Promise((resolve) => {
    gltfLoader.load(gltfPath, (gltf) => {
      const object3D = gltf.scene;
      const result = threeToCannon(object3D, { type: ShapeType.BOX });

      const { shape, offset, quaternion } = result;

     

      scene.add(object3D);

      const cannonBody = new CANNON.Body({
        mass: 5,
        shape: shape,
        position: new CANNON.Vec3(offset.x, offset.y + 25, offset.z),
      });

      world.addBody(cannonBody);
      

      const cannonMaterial = new CANNON.Material();
      cannonBody.material = cannonMaterial;

     const groundRocketContact = new CANNON.ContactMaterial(
      ground.material,
      cannonMaterial,
      {
        friction: 0.5,
        restitution: 0.3,
       
      }
    );
      
        world.addContactMaterial(groundRocketContact);
   


      object3D.userData.clickable = true;

  // Set up the raycaster for the sphere
  const objectsToInteract = [object3D];
  const cleanupRaycaster = createRaycaster(camera, scene, renderer, objectsToInteract, onRocketClick);

  function onRocketClick(clickedObject) {
    console.log('rocket clicked!', clickedObject.name);
  
    // Traverse up the hierarchy to find the top-level object3D
    let topObject = clickedObject;
    while (topObject.parent !== null && topObject.parent !== scene) {
      topObject = topObject.parent;
    }
  
    if (topObject === object3D) {
      console.log('Applying impulse to rocket');
    rocketLaunch(cannonBody)
    }
  }
  

      function animateRocket() {
        object3D.position.copy(cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
        object3D.quaternion.copy(cannonBody.quaternion);
        
        
       

      }

      // Resolve the Promise with the object containing object3D and cannonBody
      resolve({ object3D, cannonBody, animateRocket });
    });
  });
}

import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'

export function createRocket(world, scene, camera, renderer,ground) {

    let rocketBody
    let rocketMesh
   

const loader = new GLTFLoader();






loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(0, 5, 0);
//   gltf.scene.scale.set(1, 1, 1);
  
//   const rotationInDegrees = -80;
// const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// gltf.scene.rotation.set(0, rotationInRadians, 0);



// console.log(rocketGeo);








const groundRocketContactMat = new CANNON.ContactMaterial(
    ground.material,
    rocketBody.material,
    { friction: 0.04 }
);
world.addContactMaterial(groundRocketContactMat);

  // Add the loaded model to the scene
  scene.add(gltf.scene);


 
});


function animateRocket() {


if(rocketMesh){

    
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);

}
    
  }

  return { animateRocket}

}
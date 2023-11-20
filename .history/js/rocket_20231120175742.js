import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
import { loadAndFindShape } from './shape.js';

function loadModel(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(url, function (gltf) {
      resolve(gltf);
    }, null, function (error) {
      reject(error);
    });
  });
}


const url = '../blender/rocketship2.gltf';
const rocketMat = new CANNON.Material();

const rocketBody = new CANNON.Body({
  mass: 4,
  position: new CANNON.Vec3(0, 5, 0),
  material: rocketMat,
});

loadAndFindShape(url, rocketBody.shape)
  .then(cannonShape => {
    rocketBody.shape = cannonShape;
    // Continue with other setup or use the rocket body as needed
  })
  .catch(error => {
    console.error(error);
  });

world.addBody(rocketBody);



export async function createRocket(world, scene, camera, renderer, ground) {
  
  let rocketGeo;

  const cylinderRadiusTop = 1;
  const cylinderRadiusBottom = 0.1;
  const cylinderHeight = 0.000001;
  const cylinderNumSegments = 8;

  const temp = new CANNON.Cylinder(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderNumSegments
  );
 

  try {
    const gltf = await loadModel('../blender/rocketship2.gltf');
    
    gltf.scene.position.set(0, 5, 0);

    console.log(gltf)



   


    // console.log(rocketBody.material)

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    function animateRocket() {
      if (rocketBody) {
        const rocketMesh = gltf.scene.children[0];
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);
      }
    }

    return { animateRocket, rocketBody, rocketGeo };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}

// Example usage:


// Now you can use animateRocket, rocketBody, and rocketGeo directly.

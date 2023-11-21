
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

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

export async function createRocket(world, scene, camera, renderer, ground) {
  
  let rocketGeo;

  const cylinderRadiusTop = 1;
  const cylinderRadiusBottom = 0.1;
  const cylinderHeight = 0.01;
  const cylinderNumSegments = 16;

  const temp = new CANNON.Cylinder(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderNumSegments
  );
 

  try {
    const gltf = await loadModel('../blender/rocketship2.gltf');
    
    gltf.scene.position.set(0, 100, 0);

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        rocketGeo = createCannonShape(child.geometry);
        // console.log(rocketGeo)
      }
    });

    const rocketMat = new CANNON.Material();
rocketMat.friction = 0.5; // Adjust friction to a reasonable value (0 to 1)
rocketMat.restitution = 0.1
    console.log('the geometry',rocketGeo)

   const rocketBody = new CANNON.Body({
      mass: 4,
      shape: rocketGeo,
      position: new CANNON.Vec3(0, 100, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);
    // console.log(rocketBody)

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    function animateRocket() {
      if (rocketBody) {
      
        // const rocketMesh = gltf.scene.children[0];
        // rocketMesh.position.copy(rocketBody.position);
  
        // rocketMesh.quaternion.copy(rocketBody.quaternion);

     
   
      }
    }

    return { animateRocket, rocketBody, rocketGeo };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}
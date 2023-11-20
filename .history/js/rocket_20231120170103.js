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

 

  try {
    const gltf = await loadModel('../blender/rocketship2.gltf');
    
    gltf.scene.position.set(0, 5, 0);

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        rocketGeo = createCannonShape(child.geometry);
      }
    });

    const rocketMat = new CANNON.Material();

   const rocketBody = new CANNON.Body({
      mass: 4,
      shape: rocketGeo,
      position: new CANNON.Vec3(0, 5, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);
    console.log(rocketBody.material)

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      { friction: 0.04 }
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

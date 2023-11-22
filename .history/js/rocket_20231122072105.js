
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
    
    gltf.scene.position.set(0, 5, 0);

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        rocketGeo = createCannonShape(child.geometry);
      }
    });

    const rocketMat = new CANNON.Material();

    async function loadAndConvertModel() {
        // Replace 'path/to/your/model.gltf' with the actual path to your glTF file
        const filePath = '../blender/scene-2.gltf';
      
        try {
          // Call the gtlfToCannon function
          const cannonShapes = await gtlfToCannon(filePath);
      
          // Print out the Cannon.js shapes
          console.log('Cannon.js Shapes:', cannonShapes);
      
        } catch (error) {
          console.error('Error loading and converting model:', error);
        }
      }
      
      // Call the function
      loadAndConvertModel();

   const rocketBody = new CANNON.Body({
      mass: 4,
      shape: temp,
      position: new CANNON.Vec3(0, 5, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);
    console.log(rocketBody.material)

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    console.log(gltf.scene)

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
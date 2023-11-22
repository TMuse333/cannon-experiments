import * as THREE from 'three';
import * as CANNON from 'cannon-es';

function createCannonShapeAndMesh(geometry) {
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index ? geometry.index.array : undefined;

  // Create Cannon.js shape
  let cannonShape;
  if (indices) {
    cannonShape = new CANNON.Trimesh(vertices, indices);
  } else {
    const hull = new CANNON.ConvexPolyhedron({ vertices });
    hull.updateNormals();
    hull.updateBoundingSphereRadius();
    cannonShape = hull;
  }

  // Create Three.js mesh for visualization
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const threeMesh = new THREE.Mesh(geometry, material);
  threeMesh.castShadow = true;
  threeMesh.receiveShadow = true;

  return { cannonShape, threeMesh };
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
        const { cannonShape, threeMesh } = createCannonShapeAndMesh(child.geometry);
        rocketGeo = cannonShape; // Set rocketGeo to the Cannon.js shape for physics
        scene.add(threeMesh); // Add the Three.js mesh to the scene for visualization
      }
    });

    const rocketMat = new CANNON.Material();

    const rocketBody = new CANNON.Body({
      mass: 4,
      shape: temp,
      position: new CANNON.Vec3(0, 5, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);
    console.log(rocketBody.material);

    // const groundRocketContactMat = new CANNON.ContactMaterial(
    //   ground.material,
    //   rocketBody.material,
    // );
    // world.addContactMaterial(groundRocketContactMat);

    function animateRocket() {
      if (rocketBody) {
        const rocketMesh = scene.getObjectByName('RocketMesh'); // Adjust this based on your naming convention
        if (rocketMesh) {
          rocketMesh.position.copy(rocketBody.position);
          rocketMesh.quaternion.copy(rocketBody.quaternion);
        }
      }
    }

    return { animateRocket, rocketBody, rocketGeo };
  } catch (error) {
    console.error('Error loading rocket model:', error);
    throw error;
  }
}

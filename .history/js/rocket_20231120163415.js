import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export function createRocket(world, scene, camera, renderer, ground) {
  let rocketBody;

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

  const loader = new GLTFLoader();

  loader.load('../blender/rocketship2.gltf', function (gltf) {
    gltf.scene.position.set(0, 5, 0);

    let rocketGeo;

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        rocketGeo = createCannonShape(child.geometry);
      }
    });

    const rocketMat = new CANNON.Material();

    rocketBody = new CANNON.Body({
      mass: 4,
      shape: rocketGeo,
      position: new CANNON.Vec3(0, 5, 0),
      material: rocketMat,
    });

    world.addBody(rocketBody);

    const groundRocketContactMat = new CANNON.ContactMaterial(
      ground.material,
      rocketBody.material,
      { friction: 0.04 }
    );
    world.addContactMaterial(groundRocketContactMat);

    scene.add(gltf.scene);

    console.log("lol",rocketBody)

    function animateRocket() {
      if (rocketBody) {
        const rocketMesh = gltf.scene.children[0];
        console.log(rocketBody.position);
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);
      }
    }

    // Return the animateRocket function
    return { animateRocket };
  });
}

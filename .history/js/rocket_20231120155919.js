import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'

export function createRocket(world, scene, camera, renderer,ground) {

    let rocketBody
    function createCannonShape(geometry) {
        const vertices = geometry.attributes.position.array;
        const indices = geometry.index ? geometry.index.array : undefined;
      
        if (indices) {
          return new CANNON.Trimesh(vertices, indices);
        } else {
          // If indices are not present, create a convex hull
          const hull = new CANNON.ConvexPolyhedron({ vertices });
          hull.updateNormals();
          hull.updateBoundingSphereRadius();
          return hull;
        }
      }

const loader = new GLTFLoader();

loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(0, 5, 0);
//   gltf.scene.scale.set(1, 1, 1);
  
//   const rotationInDegrees = -80;
// const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// gltf.scene.rotation.set(0, rotationInRadians, 0);

let rocketGeo

gltf.scene.traverse( function ( child ) {

    if ( child.isMesh ) {

        // console.log(child.geometry)
        rocketGeo = createCannonShape(child.geometry);

    //    rocketGeo = child.geometry
    }

} );

// console.log(rocketGeo);


const rocketMat = new CANNON.Material

const rocketBody = new CANNON.Body({
    mass: 4,
    shape: rocketGeo,
    position: new CANNON.Vec3(0, 5, 0),
    material: rocketMat
});

world.addBody(rocketBody);

const groundRocketContactMat = new CANNON.ContactMaterial(
    ground.material,
    rocketBody.material,
    { friction: 0.04 }
);
world.addContactMaterial(groundRocketContactMat);

  // Add the loaded model to the scene
  scene.add(gltf.scene);

  function animateRocket() {
    if (rocketBody) {

        const rocketMesh = gltf.scene.children[0];
      console.log(rocketBody.position)
        // Update the rocket's position and rotation
        rocketMesh.position.copy(rocketBody.position);
        rocketMesh.quaternion.copy(rocketBody.quaternion);


    }
  }

 
});











}
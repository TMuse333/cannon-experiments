import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import * as CANNON from 'cannon-es'

export function createRocket(scene,world) {

    function createCannonShape(geometry) {
        const vertices = geometry.attributes.position.array;
        const indices = [];
      
        for (let i = 0; i < vertices.length / 3; i++) {
          indices.push(i);
        }
      
        return new CANNON.ConvexPolyhedron({ vertices, indices });
      }

const loader = new GLTFLoader();

loader.load('../blender/rocketship2.gltf', function (gltf) {

  gltf.scene.position.set(0, 4, 0);
//   gltf.scene.scale.set(1, 1, 1);
  
//   const rotationInDegrees = -80;
// const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);

// gltf.scene.rotation.set(0, rotationInRadians, 0);

let rocketGeo

gltf.scene.traverse( function ( child ) {

    if ( child.isMesh ) {

        console.log(child.geometry)
        rocketShape = createCannonShape(child.geometry);

    //    rocketGeo = child.geometry
    }

} );

console.log(rocketGeo);


const rocketMat = new CANNON.Material

const boxBody = new CANNON.Body({
    mass: 4,
    shape: rocketGeo,
    position: new CANNON.Vec3(0, 4, 0),
    material: rocketMat
});

world.addBody(boxBody);

  // Add the loaded model to the scene
  scene.add(gltf.scene);
  

});

}
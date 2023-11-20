export async function createRocket(world, scene, camera, renderer, ground) {
    let rocketBody;
    let rocketGeo;
  
    try {
      const gltf = await loadModel('../blender/rocketship2.gltf');
      gltf.scene.position.set(0, 10, 0); // Adjusted initial position
  
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          rocketGeo = createCannonShape(child.geometry);
        }
      });
  
      const rocketMat = new CANNON.Material();
  
      rocketBody = new CANNON.Body({
        mass: 4,
        shape: rocketGeo,
        position: new CANNON.Vec3(0, 10, 0), // Adjusted initial position
        material: rocketMat,
      });
  
      world.addBody(rocketBody);
  
      const groundRocketContactMat = new CANNON.ContactMaterial(
        ground.body.material,
        rocketBody.material,
        { friction: 0.04 }
      );
      world.addContactMaterial(groundRocketContactMat);
  
      scene.add(gltf.scene);
  
      function animateRocket() {
        if (rocketBody) {
          const rocketMesh = gltf.scene.children[0];
          console.log('Rocket Position:', rocketBody.position.y);
          console.log('Ground Position:', ground.body.position.y);
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
  
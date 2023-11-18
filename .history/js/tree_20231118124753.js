import * as CANNON from 'cannon-es';

export function createTree(world, scene) {
  // Trunk
  const trunkShape = new CANNON.Cylinder(1, 1, 5, 8);
  const trunkBody = new CANNON.Body({ mass: 0, shape: trunkShape });
  world.addBody(trunkBody);

  const trunkGeometry = new THREE.CylinderGeometry(1, 1, 5, 8);
  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color
  const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);
  scene.add(trunkMesh);

  // Branches
  const branchShape = new CANNON.Box(new CANNON.Vec3(1, 0.2, 1));
  const branchBodies = [];

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;

    const branchBody = new CANNON.Body({ mass: 0, shape: branchShape });
    branchBody.position.set(x, 2.5, z);
    world.addBody(branchBody);
    branchBodies.push(branchBody);

    const branchGeometry = new THREE.BoxGeometry(2, 0.4, 2);
    const branchMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Green color
    const branchMesh = new THREE.Mesh(branchGeometry, branchMaterial);
    branchMesh.position.set(x, 2.5, z);
    branchMesh.rotation.set(0, angle, 0);
    scene.add(branchMesh);
  }

  function updateTree() {
    trunkMesh.position.copy(trunkBody.position);
    trunkMesh.quaternion.copy(trunkBody.quaternion);

    branchBodies.forEach((branchBody, index) => {
      const branchMesh = scene.children.find(mesh => mesh.name === `branch${index}`);
      branchMesh.position.copy(branchBody.position);
      branchMesh.quaternion.copy(branchBody.quaternion);
    });
  }

  return {
    updateTree,
  };
}

// Example usage in main.js


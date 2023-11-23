// contactMaterials.js

import * as CANNON from 'cannon-es';

function createGroundContactMaterial(ground,cannonMaterial)

// Create a material for the cannon body
const cannonMaterial = new CANNON.Material();

// Create the contact material using the ground material and the cannon material
const groundRocketContactMaterial = new CANNON.ContactMaterial(
  ground.material,
  cannonMaterial,
  {
    friction: 0.5,
    restitution: 0.3,
    // contactEquationRelaxation: 3, // Adjust as needed
    // contactEquationStiffness: 1e6 // Adjust as needed
  }
);

// Export the contact material
export { groundRocketContactMaterial };

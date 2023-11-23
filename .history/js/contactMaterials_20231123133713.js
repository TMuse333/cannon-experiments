// contactMaterials.js

import * as CANNON from 'cannon-es';

export const createGroundRocketContactMaterial = (groundMaterial, rocketMaterial) => {
  return new CANNON.ContactMaterial(
    groundMaterial,
    rocketMaterial,
    {
      friction: 0.5,
      restitution: 0.3,
      // contactEquationRelaxation: 3, // Adjust as needed
      // contactEquationStiffness: 1e6 // Adjust as needed
    }
  );
};

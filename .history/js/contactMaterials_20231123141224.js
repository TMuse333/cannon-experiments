import * as CANNON from 'cannon-es'


export function createGroundRocketContact(ground,cannonBody) {

    const cannonMaterial = new CANNON.Material();
    cannonBody.material = cannonMaterial;

   const groundRocketContact = new CANNON.ContactMaterial(
    ground.material,
    cannonMaterial,
    {
      friction: 0.5,
      restitution: 0.4,
     
    }
  );

}

export const 
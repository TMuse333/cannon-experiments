// rocketPhysics.js

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class RocketPhysics {
  constructor(object3D, cannonBody, scene, world,ground) {
    this.object3D = object3D;
    this.cannonBody = cannonBody;
    this.scene = scene;
    this.world = world;
    this.targetPosition = new THREE.Vector3();
    this.offset = new THREE.Vector3(0, 5, -10);
    this.initPositionDisplay();
    this.isOnGround = false;
    this.timeInAir = 0;
    this.initFlightTimeDisplay();
    this.setupGroundRocketContact(ground);

  }

  setupGroundRocketContact(ground) {
    // Create a material for the cannon body
    const cannonMaterial = new CANNON.Material();
    this.cannonBody.material = cannonMaterial;

    // Create the contact material using the ground material and the cannon material
    const groundRocketContact = new CANNON.ContactMaterial(
      ground.material,
      cannonMaterial,
      {
        friction: 0.5,
        restitution: 0.4,
      }
    );

    // Add the contact material to the world
    this.world.addContactMaterial(groundRocketContact);
  }
  
  initFlightTimeDisplay() {
    // Create a DOM element for flight time display
    this.flightTimeContainer = document.createElement('div');
    this.flightTimeContainer.style.position = 'absolute';
    this.flightTimeContainer.style.bottom = '10px';
    this.flightTimeContainer.style.right = '10px';
    this.flightTimeContainer.style.color = 'white';
    this.flightTimeContainer.style.backgroundColor = 'blue';
    this.flightTimeContainer.style.padding = '10px';
    this.flightTimeContainer.style.width = '200px';
    document.body.appendChild(this.flightTimeContainer);

    // Create an element for displaying flight time
    this.flightTimeDisplay = document.createElement('div');
    this.flightTimeContainer.appendChild(this.flightTimeDisplay);
  }


  initPositionDisplay() {
    // Create a DOM element for position display
    this.positionContainer = document.createElement('div');
    
  this.positionContainer.style.position = 'absolute';
  this.positionContainer.style.bottom = '100px';
  this.positionContainer.style.right = '10px';

  this.positionContainer.style.color = 'white';
  this.positionContainer.style.backgroundColor = 'red';

  this.positionContainer.style.padding = '10px';
  this.positionContainer.style.width = '200px';
  document.body.appendChild(this.positionContainer);

  // Create separate elements for position and velocity
  this.positionDisplay = document.createElement('div');
  this.velocityDisplay = document.createElement('div');
  this.positionContainer.appendChild(this.positionDisplay);
  this.positionContainer.appendChild(this.velocityDisplay);
  }

  updateRocket() {
    // Update the rocket's physics, position, etc.
    if (this.object3D && this.cannonBody) {
      this.object3D.position.copy(this.cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
      this.object3D.quaternion.copy(this.cannonBody.quaternion);

      // Update the camera position to follow the rocket
      this.targetPosition.copy(this.object3D.position).add(this.offset);
    }
  }

  updateCamera(camera) {
    // Update the camera to follow the rocket
    if (this.object3D) {
      camera.position.lerp(this.targetPosition, 0.1); // Adjust the lerp factor as needed
      camera.lookAt(this.object3D.position);
    }
  }


  continuousUpdate() {

    const deltaTime = 1/60;
    // Continuously update the position of the rocket in the x, y, and z planes
    if (this.object3D && this.cannonBody) {
      const deltaTime = 1 / 60; // Assuming 60 frames per second, adjust as needed

      this.positionDisplay.textContent = `Rocket Position (x, y, z): ${this.cannonBody.position.x.toFixed(2)}, ${this.cannonBody.position.y.toFixed(2)}, ${this.cannonBody.position.z.toFixed(2)}`;

      this.velocityDisplay.textContent = `Rocket Velocity (x, y, z): ${this.cannonBody.velocity.x.toFixed(2)}, ${this.cannonBody.velocity.y.toFixed(2)}, ${this.cannonBody.velocity.z.toFixed(2)}`;


      if (this.cannonBody.position.y < 4) {
        if (!this.isOnGround) {
          this.isOnGround = true;
          console.log('Rocket is on the ground.');
        }
      } else {
        // Rocket is in the air
        if (this.isOnGround) {
          this.isOnGround = false;
          console.log('Rocket has taken off.');
        }

        // Track the time in the air
        this.timeInAir += deltaTime;
      }

      // Display flight time
      this.flightTimeDisplay.textContent = `Flight Time: ${this.timeInAir.toFixed(2)} seconds`;
    
    }
  }

 

  // Add more methods as needed for rocket physics, controls, etc.
  // ...
}


export function  rocketLaunch(cannonBody) {
  const impulse = new CANNON.Vec3(0, 100, 0);
  const impulsePoint = new CANNON.Vec3();
  cannonBody.applyImpulse(impulse, impulsePoint);
}

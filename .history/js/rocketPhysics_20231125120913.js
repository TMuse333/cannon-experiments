// rocketPhysics.js

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export const W_KEY_DOWN_EVENT = 'wKeyDown';
export const W_KEY_UP_EVENT = 'wKeyup'

import { O_KEY_DOWN_EVENT,P_KEY_DOWN_EVENT } from './rocketControls';

import { isAKeyDown,isWKeyDown,
isDKeyDown,isSKeyDown } from './rocketControls';


import { getThrustVector } from './rocketControls';
import { getRotationVectors } from './rocketControls';

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

    this.previousFlights = []; // Initialize the array for storing previous flights
    this.initFlightTimeDisplay();

   



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
        restitution: 0,
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
    const deltaTime = 1 / 60;
  
    if (this.object3D && this.cannonBody) {
      this.positionDisplay.textContent = `Rocket Position (x, y, z): ${this.cannonBody.position.x.toFixed(2)}, ${this.cannonBody.position.y.toFixed(2)}, ${this.cannonBody.position.z.toFixed(2)}`;
      this.velocityDisplay.textContent = `Rocket Velocity (x, y, z): ${this.cannonBody.velocity.x.toFixed(2)}, ${this.cannonBody.velocity.y.toFixed(2)}, ${this.cannonBody.velocity.z.toFixed(2)}`;

      
  
      if (this.cannonBody.position.y < 4) {
        if (!this.isOnGround) {
          this.isOnGround = true;
          console.log('Rocket is on the ground.');
  
          // Store the previous flight data and reset the timer
          if (this.timeInAir > 0) {
            this.previousFlights.push({
              flightTime: this.timeInAir,
              // Add any other relevant data you want to store
            });
          }
          this.timeInAir = 0;
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
  
      // Display previous flight data (for demonstration purposes)
     
    }
  }
  

 

  // Add more methods as needed for rocket physics, controls, etc.
  // ...
}

export function controlRocket(event,cannonBody) {

let isWKeyDown2 = false

  if(isWKeyDown){
    console.log("going up!")
    const wKeyDownEvent = new Event(W_KEY_DOWN_EVENT);
    document.dispatchEvent(wKeyDownEvent);
    const takeoffImpulse = getThrustVector()
    console.log(takeoffImpulse)
    const impulsePoint = new CANNON.Vec3();
    cannonBody.applyImpulse(takeoffImpulse, impulsePoint);
  }

  if(isDKeyDown){
    const rotation = getRotationVectors()
    console.log(rotation)
  }

  // else if (key.event === '?') {

  // }

  document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        // Key is released
        console.log('w key released!');
        isWKeyDown2 = false;
        const wKeyUpEvent = new Event(W_KEY_UP_EVENT);
        document.dispatchEvent(wKeyUpEvent);
    }
});
}